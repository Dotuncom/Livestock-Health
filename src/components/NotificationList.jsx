export default function NotificationList() {
  const notifications = [
    {
      avatar: "https://images.unsplash.com/photo-1603415526960-f8f0aeecc65b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80",
      message: "Bebby farm sent you a vet help request",
      timestamp: "May 8, 10:50 AM",
    },
    {
      avatar: "https://images.unsplash.com/photo-1612874741921-3306ebf53b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80",
      message: "Ali sent you a vet help request",
      timestamp: "May 12, 12:30 PM",
    },
    {
      avatar: "https://images.unsplash.com/photo-1627844540543-7c5f8a9a8990?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&q=80",
      message: "Jana pigery sent you a vet help request",
      timestamp: "May 12, 12:30 PM",
    },
  ];

  return (
    <div className="bg-white text-[20px] Nunito shadow-md rounded-lg h-[300px] p-4 w-full">
      <ul className="space-y-4 pt-[34px]">
        {notifications.map((item, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm font-inter text-gray-700">
            <img
              src={item.avatar}
              alt="avatar"
              className="w-18 h-18 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{item.message}</p>
              <span className="text-gray-500 text-xs">{item.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
