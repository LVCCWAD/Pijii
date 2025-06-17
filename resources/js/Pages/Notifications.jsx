import { NavbarMinimalColored } from "../layouts/mantine/sidebar.jsx";
import PijiHeader from "../layouts/components/Header.jsx";
import PijiHeader2 from "../layouts/components/Header2.jsx";
import { usePage, router } from '@inertiajs/react';

export default function Notifications() {
  const { notifications, flash } = usePage().props;

  const handleMark = (notificationId, isRead) => {
    const url = isRead
      ? `/notifications/${notificationId}/mark-unread`
      : `/notifications/${notificationId}/mark-read`;

    router.patch(url);
  };

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
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
                    className={`flex justify-between items-center p-4 border rounded-lg shadow-sm ${
                      notification.is_read ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-gray-100 transition`}
                  >
                    <div className="flex-1 pr-4">
                      <p className="text-sm text-gray-400 mb-1">
                        {notification.created_at_human} ·{' '}
                        <span className={notification.is_read ? 'text-green-600' : 'text-red-600'}>
                          {notification.is_read ? 'Read' : 'Unread'}
                        </span>
                      </p>
                      <p className={`text-base ${notification.is_read ? 'text-gray-600' : 'text-black'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDateTime(notification.created_at)}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleMark(notification.id, notification.is_read)}
                        className={`px-3 py-1 rounded border ${
                          notification.is_read
                            ? 'border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                            : 'border-blue-400 text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {notification.is_read ? 'Mark Unread' : 'Mark Read'}
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
