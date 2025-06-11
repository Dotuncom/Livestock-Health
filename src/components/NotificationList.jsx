import React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";

const NotificationList = ({ notifications }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No notifications available
      </div>
    );
  }

  const getSeverityIcon = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "mdi:alert-circle";
      case "medium":
        return "mdi:alert";
      case "low":
        return "mdi:information";
      default:
        return "mdi:bell";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-green-500 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  icon={getSeverityIcon(notification.severity)}
                  className={`w-5 h-5 ${
                    notification.severity === "high"
                      ? "text-red-600"
                      : notification.severity === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                />
                <p className="font-medium text-gray-900">
                  {notification.message}
                </p>
              </div>
              {notification.animal_name && (
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="mdi:cow" className="w-5 h-5 text-gray-600" />
                  <p className="text-sm text-gray-700">
                    Animal: {notification.animal_name}
                  </p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Icon
                  icon="mdi:clock-outline"
                  className="w-5 h-5 text-gray-600"
                />
                <p className="text-sm text-gray-600">
                  {format(
                    new Date(notification.created_at),
                    "MMM d, yyyy h:mm a"
                  )}
                </p>
              </div>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                notification.severity
              )}`}
            >
              {notification.severity.charAt(0).toUpperCase() +
                notification.severity.slice(1)}
            </span>
          </div>
          {notification.notes && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm text-gray-700">
              <p className="font-medium">Notes:</p>
              <p>{notification.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
