import type { NotificationReactive, NotificationType as NaiveNotificationType } from 'naive-ui';

type NotificationType = {
    [key in NaiveNotificationType]: (title: string, content: string) => void;
};
let notificationRef: NotificationReactive | null = null;
const notificationDuration = 2500;
const notification: NotificationType = {
    warning: (title: string, content: string) => {
        notificationRef?.destroy();

        notificationRef = window.$notification.warning({
            title,
            content,
            duration: notificationDuration
        });
    },
    success: (title: string, content: string) => {
        notificationRef?.destroy();

        notificationRef = window.$notification.success({
            title,
            content,
            duration: notificationDuration
        });
    },
    error: (title: string, content: string) => {
        notificationRef?.destroy();
        notificationRef = window.$notification.error({
            title,
            content,
            duration: notificationDuration
        });
    },
    info: (title: string, content: string) => {
        notificationRef?.destroy();
        notificationRef = window.$notification.info({
            title,
            content,
            duration: notificationDuration
        });
    }
};

export default notification;
