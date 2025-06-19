import { useEffect, useState } from "react";
import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import { usePage, router } from "@inertiajs/react";

export default function Notifications() {
  const { notifications: pageNotifications, flash } = usePage().props;
  const [notifications, setNotifications] = useState(pageNotifications);
  const [highlightId, setHighlightId] = useState(
    new URLSearchParams(window.location.search).get("highlight")
  );

  // Sync local state with page props
  useEffect(() => {
    setNotifications(pageNotifications);
  }, [pageNotifications]);

  // Poll every 1.5 seconds for updates
  useEffect(() => {
    const interval = setInterval(() => {
      router.reload({ only: ["notifications"], preserveState: true });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Remove highlight after 2.5 seconds
  useEffect(() => {
    if (highlightId) {
      const timeout = setTimeout(() => setHighlightId(null), 2500);
      return () => clearTimeout(timeout);
    }
  }, [highlightId]);

  const handleMark = (notificationId, isRead) => {
    const url = isRead
      ? `/notifications/${notificationId}/mark-unread`
      : `/notifications/${notificationId}/mark-read`;

    router.patch(url, {
      preserveState: true,
      onSuccess: () => {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === notificationId ? { ...notif, is_read: !isRead } : notif
          )
        );
      },
    });
  };

  const handleNavigate = (notification) => {
    if (notification.task) {
      const task = notification.task;
      const project = task.project;
      const category = project.category;
      router.visit(`/categories/${category.id}/projects/${project.id}/tasks/${task.id}`);
    } else if (notification.project) {
      const project = notification.project;
      const category = project.category;
      router.visit(`/categories/${category.id}/projects/${project.id}`);
    }
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="piji-green h-screen">
      <div className="flex flex-row w-full h-screen">
        <NavbarMinimalColored />
        <div className="flex flex-col w-full overflow-y-auto">
          <PijiHeader />
          <PijiHeader2 title="Notifications" />

          <div className="max-w-4xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Notifications</h1>

            {flash.status && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded shadow">
                {flash.status}
              </div>
            )}

            {notifications.length === 0 ? (
              <div className="text-gray-500 text-center py-8">
                You have no notifications.
              </div>
            ) : (
              <ul className="space-y-3">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    onClick={() => handleNavigate(notification)}
                    className={`cursor-pointer flex justify-between items-center p-4 border rounded-lg shadow-sm transform transition-all duration-200 ${
                      notification.is_read
                        ? "bg-gray-50 opacity-30 grayscale"
                        : "bg-white"
                    } hover:bg-yellow-100 ${
                      notification.id.toString() === highlightId
                        ? "border-2 border-yellow-600 bg-yellow-100"
                        : ""
                    }`}
                  >
                    <div className="flex-1 pr-4">
                      <p className="text-sm text-gray-400 mb-1">
                        {notification.created_at_human} ·{" "}
                        <span
                          className={
                            notification.is_read ? "text-green-600" : "text-red-600"
                          }
                        >
                          {notification.is_read ? "Read" : "Unread"}
                        </span>
                      </p>
                      <p
                        className={`text-base ${
                          notification.is_read ? "text-gray-600" : "text-black"
                        }`}
                        title={notification.message}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDateTime(notification.created_at)}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMark(notification.id, notification.is_read);
                        }}
                        className={`px-3 py-1 rounded border transform transition-all duration-200 cursor-pointer hover:scale-105 hover:ring-2 hover:ring-offset-1 ${
                          notification.is_read
                            ? "border-yellow-500 text-yellow-700 bg-yellow-100 hover:bg-yellow-200 font-semibold"
                            : "border-blue-500 text-blue-700 bg-blue-100 hover:bg-blue-200 font-semibold"
                        }`}
                      >
                        {notification.is_read ? "Mark Unread" : "Mark Read"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Notifications.layout = (page) => page;
