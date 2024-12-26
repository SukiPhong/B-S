import axios, { endpoints } from "./axios";

export const apiGetNotifications = (params) => (
  axios({
    method: "get",
    url: endpoints.notification.getNotifications,
    params
  })
);

export const apiMarkNotificationAsRead = (notificationId) => (
  axios({
    method: "patch",
    url: `${endpoints.notification.markAsRead}${notificationId}/read`,
  })
);

export const apiMarkAllNotificationsAsRead = () => (
  axios({
    method: "patch",
    url: endpoints.notification.markAllAsRead,
  })
);

export const apiGetUnreadNotificationsCount = () => (
  axios({
    method: "get",
    url: endpoints.notification.getUnreadCount,
  })
);
export const apiCreateNotification =(data) => (
  axios({
  method:'post',
   url:endpoints.notification.createNotification,
   data
}))
export const apiDeleteAllNotification =() => (
  axios({
  method:'delete',
   url:endpoints.notification.deleteAllNotification,
}))
export const apiDeleteNotification =(params) => (
  axios({
  method:'delete',
   url:endpoints.notification.deleteNotification,
   params
}))
