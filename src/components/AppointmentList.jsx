//src/components/AppointmentList.jsx
// components/AppointmentList.jsx
export default function AppointmentList() {
  const appointments = [
    { date: "April 24", name: "Emma Stocks" },
    { date: "April 23", name: "Josh Dave" },
    { date: "April 22", name: "Dan Stocks" },
  ];

  return (
    <div className="bg-white pt-[48px] px-[28px] shadow-md rounded-lg  h-[300px] p-4 ">
      <ul className="space-y-4">
        {appointments.map((item, index) => (
          <li key={index} className="flex justify-between items-center text-sm font-inter text-gray-700">
            <div>
              <div className=" text-[20px]  Nunito font-semibold">{item.date}</div>
              <div>{item.name}</div>
            </div>
            <div className="text-sm text-gray-500">Recent</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
