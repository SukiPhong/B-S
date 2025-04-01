import React, { useState, useEffect, useCallback, memo } from "react";
import { io } from "socket.io-client";
import NotificationItem from "./NotificationItem";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import {
  apiDeleteAllNotification,
  apiGetNotifications,
  apiGetUnreadNotificationsCount,
  apiMarkAllNotificationsAsRead,
  apiMarkNotificationAsRead,
} from "@/apis/notification";
import useMeStore from "@/zustand/useMeStore";
let IO;
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const { token, me, logout } = useMeStore();

  const fetchNotifications = useCallback(async () => {
    if (!me) return;

    try {
      const response = await apiGetNotifications();
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(
          response.data.data.notifications.filter((n) => !n.isRead).length
        );
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to fetch notifications. Please try again later.");
      }
    }
  }, [me, logout]);

  const fetchUnreadCount = useCallback(async () => {
    if (!me) return;

    try {
      const response = await apiGetUnreadNotificationsCount();
      if (response.data.success) {
        setUnreadCount(response.data.data.unreadCount);
      }
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  }, [me]);

  useEffect(() => {
    if (!me || !token) return;

    const newSocket = io("http://localhost:5100", {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 1,
      reconnectionDelay: 3000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      fetchNotifications();
      fetchUnreadCount();
    });
    newSocket.on("newNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
      setUnreadCount((prev) => prev + 1);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:::", error);
      if (error.message === "jwt expired") {
        toast.error("Your session has expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to connect to notification server. Retrying...");
      }
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
      if (reason === "io server disconnect") {
        newSocket.connect();
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [me, token, logout]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      const response = await apiMarkNotificationAsRead(notificationId);
      if (response.data.success) {
        setNotifications(
          notifications.map((n) =>
            n.id === notificationId ? { ...n, isRead: true } : n
          )
        );
        setUnreadCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to mark notification as read. Please try again.");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await apiMarkAllNotificationsAsRead();
      if (response.data.success) {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error(
        "Failed to mark all notifications as read. Please try again."
      );
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "post_approval":
        return "✅";
      case "post_rating":
        return "⭐";
      case "package_purchase":
        return "💰";
      case "user_update":
        return "👤";
      case "post_edit":
        return "✏️";
      default:
        return "🔔";
    }
  };
  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await apiDeleteNotification({ id: notificationId });
      if (response.data.success) {
        setNotifications(notifications.filter((n) => n.id !== notificationId));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification. Please try again.");
    }
  };
  const handleDeleteAllNotifications = async () => {
    try {
      const response = await apiDeleteAllNotification();
      if (response.data.success) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      toast.error("Failed to delete all notifications. Please try again.");
    }
  };
  if (!me) {
    return null; // Don't render the component if the user is not authenticated
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center gap-2">
            <h3 className="text-lg font-semibold">Thông báo</h3>
            {notifications.length > 0 && (
              <span
                onClick={handleDeleteAllNotifications}
                className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
                // Disable if there are unread notifications
              >
                Xóa tất cả
              </span>
            )}
            {unreadCount > 0 && (
              <span
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 hover:cursor-pointer"
              >
                Đánh dấu đã đọc
              </span>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-2 text-center text-gray-500">
                Chưa có thông nào
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Notifications);
