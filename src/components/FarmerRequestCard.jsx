export default function FarmerRequestCard({ farmer }) {
  return (
    <div
      className={`w-1000px] h-[100px] Nunito border border-none bg-white rounded-md shadow-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
      }`}
    >
      {/* Farmer info */}
      <div className="flex items-start sm:items-center gap-3">
        <img
          src={farmer.avatar}
          alt={farmer.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="md:text-[20px] md:w-[400px] text-[15px] font-inter leading-tight">
          <p className="text-gray-800 font-semibold">
            {farmer.name}
            <span className="font-normal text-gray-700">
              {' '}
              has requested Urgent veterinary assistance for Cow-001#
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{farmer.time}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-end sm:justify-start">
        <button className="bg-green-700 hover:bg-green-800 text-white w-[100px] h-[30px] text-[12px] md:text-[18px] px-4 py-1.5 md:w-[140px] md:h-[40px] rounded-md">
          Accept
        </button>
        <button className="border border-red-700   text-[#991813] w-[100px] h-[30px] text-[12] px md:w-[140px]  md:h-[40px] md:text-[18px] hover:bg-red-50 text-sm px-4 py-1.5 rounded-md">
          Decline
        </button>
      </div>
    </div>
  );
}
