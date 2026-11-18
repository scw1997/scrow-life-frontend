// 设备唯一ID生成器
// MD5哈希函数（降级方案）
function hashMD5(input: string) {
    const hexChars = '0123456789abcdef';
    const utf8Encode = (str: string) => new TextEncoder().encode(str);
    const md5 = (bytes: Uint8Array) => {
        // 实现MD5哈希算法（此处简化，实际需完整实现）
        return (
            'md5-' +
            Array.from(bytes)
                .map((b: any) => hexChars[b >> 4] + hexChars[b & 15])
                .join('')
        );
    };
    return md5(utf8Encode(input));
}
export const generateDeviceID = async () => {
    // 基础浏览器信息（兼容所有浏览器）

    const browserInfo = {
        userAgent: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        colorDepth: screen.colorDepth,
        hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
        // @ts-ignore
        deviceMemory: navigator.deviceMemory || 'unknown',
        platform: navigator.platform,
        plugins: Array.from(navigator.plugins)
            // @ts-ignore
            .map((p) => p.name + p.version)
            .join(';')
    };

    // Canvas指纹生成（兼容现代浏览器）
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    if (ctx) {
        ctx.fillStyle = '#FC9630';
        ctx?.fillRect(0, 0, 10, 10);
    }

    const canvasHash = btoa(canvas.toDataURL()).slice(-16);

    // WebGL指纹生成（兼容支持WebGL的浏览器）
    let webglHash = '';
    const webgl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (webgl) {
        // @ts-ignore
        const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            // @ts-ignore
            const vendor = webgl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            // @ts-ignore
            const renderer = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            webglHash = btoa(vendor + renderer).slice(-16);
        }
    }

    // 组合所有指纹信息
    const fingerprint = `${Date.now()}-${canvasHash}-${webglHash}-${JSON.stringify(browserInfo)}`;

    // 使用SHA-256哈希生成唯一ID（兼容支持crypto的浏览器）
    let uniqueID;
    if (window.crypto && window.crypto.subtle) {
        const hashBuffer = await crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(fingerprint)
        );
        uniqueID = Array.from(new Uint8Array(hashBuffer))
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
    } else {
        // 降级方案：使用MD5哈希
        uniqueID = await hashMD5(fingerprint);
    }

    return uniqueID;
};

const getEnv = () => {
    let apiOrigin, envName;

    switch (true) {
        // 本地开发环境
        default:
            apiOrigin = 'http://192.168.75.1:8080';
            envName = 'local';
            break;
    }

    return { apiOrigin, envName };
};
// 环境信息
export const environment: { apiOrigin: string; envName: string } = getEnv();

/*
    常用正则表达式整理
 */
export const Reg = {
    // 自然数（0，1，2，3，4）
    natureNo: /^(0|[1-9][0-9]*)$/,
    // 非0数量（1，2，3...）
    noZeroAmount: /^[1-9]\d*$/,
    // 手机号码
    mobileTel: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
    // 固定电话号码（带区号）
    fixedTel: /^(0\d{2,3})-?(\d{7,8})$/,
    // url地址(以http或https开头)
    url: /^(https?):\/\/[\w-]+(\.[\w-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
    // 最多两位小数的数字
    fixed2No: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/,
    // 最多四位小数的数字
    fixed4No: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,4})?$/,
    // 邮箱正则
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
};
