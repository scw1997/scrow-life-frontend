import { defineStore } from 'pinia';

const storageUser = localStorage.getItem('user');

interface StoreStatesType {
    //全局用户信息
    userInfo: Record<string, any> | null;
    //登录token
    token: string | null;
}
const useGlobalStore = defineStore('global', {
    state: (): StoreStatesType => ({
        userInfo: storageUser ? JSON.parse(storageUser) : null,
        token: localStorage.getItem('token')
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUserInfo(data: StoreStatesType['userInfo']) {
            this.userInfo = data;
            localStorage.setItem('user', JSON.stringify(data));
        },

        //重置登陆状态和用户信息
        clearUserStorage() {
            this.userInfo = null;
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
});
export default useGlobalStore;
