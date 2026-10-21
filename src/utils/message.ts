import type { MessageReactive } from 'naive-ui';

interface MessageType {
    loading: (isLoading: boolean) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}
let messageRef: MessageReactive | null = null;
const message: MessageType = {
    loading: (isLoading: boolean) => {
        messageRef?.destroy();
        if (isLoading) {
            messageRef = window.$message.loading('加载中', { duration: 0 });
        } else {
            messageRef = null;
        }
    },
    success: (message: string) => {
        messageRef?.destroy();

        messageRef = window.$message.success(message);
    },
    error: (message: string) => {
        messageRef?.destroy();
        messageRef = window.$message.error(message);
    },
    info: (message: string) => {
        messageRef?.destroy();
        messageRef = window.$message.info(message);
    }
};

export default message;
