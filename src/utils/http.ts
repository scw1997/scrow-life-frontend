import Axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig, type   AxiosResponse } from 'axios';

const CancelToken = Axios.CancelToken;

type CustomConfig = {
    isControl?: boolean; //为true则在服务端成功返回响应数据时，不进行code报错判断提示，由开发自行控制
};

export const notifyError = async (code: string | number, message: string, onClose?: () => void) => {

    let type, textPrefix;
    switch (true) {
        case String(code) === '401':
            // type = 'info';
            // textPrefix = '系统提示';
            // break;
            onClose?.();
            return;
        default:
            type = 'error';
            textPrefix = '请求失败';
    }
    notification[type]({
        key: Date.now(),
        message: `${textPrefix} ${code || 'Error'}`,
        description: message,
        placement: 'topLeft',
        duration: 3,
        onClose: onClose
    });
};

export type HttpMethod = (
    url: string,
    params?: any,
    config?: AxiosRequestConfig & CustomConfig
) => Promise<any>;

const instance: AxiosInstance = Axios.create({
    timeout: 30000
});

export const deviceIdKey = 'robot-pc-device-id';
let storageDeviceId = localStorage.getItem(deviceIdKey);
/**
 * 拦截器
 */
instance.interceptors.request.use(
    async (config) => {
        const token = useGlobalStore.getState().token;
        if (config.method === 'post' && !config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'application/json';
        }
        config.headers.authorization = `Bearer ${token}`;
        // 当前浏览器唯一设备标识ID，限制同一浏览器设备只能登录一个账号（暂不限制一个账号可在多个设备登录）
        if (!storageDeviceId) {
            storageDeviceId = await generateDeviceID();
            localStorage.setItem(deviceIdKey, storageDeviceId);
        }

        config.headers['device-id'] = storageDeviceId;
        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);
let isNotifying = false; // 控制同时只能显示一个401登录失效的提醒
instance.interceptors.response.use(
    (res: AxiosResponse) => {
        return res;
    },
    (err: AxiosError) => {
        console.log('err', err);
        const clearUserStorage = useGlobalStore.getState().clearUserStorage;
        if (err.code === 'ERR_NETWORK') {
            return Promise.reject(new AxiosError('网络请求失败，请检查后重试', '-1'));
        }
        if (err.code === 'ECONNABORTED') {
            return Promise.reject(new AxiosError('网络请求超时，请稍后重试', '-1'));
        }

        switch (err?.response?.status) {
            case 401:
                if (isNotifying) {
                    return;
                }

                isNotifying = true;
                //登录状态失效
                clearUserStorage();
                jumpTokenInvalidPage();
                return Promise.reject(new AxiosError('登录状态已失效，请重新登录', '401'));
            case 403:
                //登录失败（例如非管理员）
                return Promise.reject(
                    new AxiosError('您当前无权限访问此资源，请联系管理员', '403')
                );
            case 404:
                return Promise.reject(new AxiosError('抱歉，您访问的接口地址貌似不存在', '404'));
            case 500:
                return Promise.reject(new AxiosError('抱歉，当前服务器异常，请稍后再试', '500'));
        }
        return Promise.reject(new AxiosError(err.message, err.response?.status.toString()));
    }
);

/**
 * 处理response数据
 * @param res
 * @param resolve
 * @param reject
 * @param config
 */
const handleRes = async (
    res: AxiosResponse,
    resolve: (data: any) => void,
    reject: (reason: any) => void,
    config?: Parameters<HttpMethod>[2]
) => {
    const clearUserStorage = useGlobalStore.getState().clearUserStorage;
    if (res?.status === 200) {
        let { code, msg, data } = res?.data || {};

        switch (code) {
            case 0:
                return config?.isControl ? resolve(res?.data) : resolve(data);
            default:
                if (config?.isControl) {
                    return resolve(res.data);
                }
                if (code === 401) {
                    isNotifying = true;
                    clearUserStorage();
                    jumpTokenInvalidPage();
                    notifyError(code, msg, () => {
                        isNotifying = false;
                    });
                    return;
                }
                if (code === 9001) {
                    Modal.open({
                        title: '提示',
                        footer: null,
                        content: (props) => <div>{msg}</div>
                    });
                    Toast.clear();
                    reject(msg);
                    return;
                }
                if (code === 9002) {
                    Toast.info(msg);
                    reject(msg);
                    return;
                }

                notifyError(code, msg);

                reject(msg);
        }
    } else {
        const { statusText = '数据请求失败' } = res || {};
        if (!config?.isControl && !isNotifying) {
            notifyError(res?.status, statusText);
        }
        reject(statusText);
    }
};

export let cancelReqFun = (msg: string) => {
    //取消当前正在执行的请求
    //
};

const createHttpMethod = (method: 'get' | 'post' | 'put' | 'delete', ...rest) => {
    const [url, data, config] = rest;
    return new Promise((resolve, reject) => {
        instance({
            method,
            url: environment.apiHost + url,
            params: method === 'get' ? data : {},
            data: method === 'get' ? {} : data,
            cancelToken: new CancelToken(function (cancel) {
                cancelReqFun = cancel;
            }),
            ...config
        })
            .then((res: AxiosResponse) => {
                handleRes(res, resolve, reject, config);
            })
            .catch((err: { code: string | number; message: string }) => {
                const { code, message } = err;

                notifyError(code, message, () => {
                    isNotifying = false;
                });
                reject(message);
            });
    });
};

const httpMethods: Record<Parameters<typeof createHttpMethod>[0], HttpMethod> = (
    ['get', 'post', 'put', 'delete'] as const
).reduce(
    (pre, cur, array) => {
        pre[cur] = (...params: any[]) => createHttpMethod(cur, ...params);
        return pre;
    },
    {
        get: null,
        post: null,
        delete: null,
        put: null
    }
);
export default httpMethods;
