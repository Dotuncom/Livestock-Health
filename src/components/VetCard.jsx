// import { useNavigate } from 'react-router-dom';

// export default function VetCard({ vet }) {
//   const navigate = useNavigate();
//   const { id, name, image, specialty, address } = vet;

//   return (
//     <div className="flex flex-col md:flex-row md:w-[1100px] items-center gap-[1rem] bg-[#EFEEEE] px-[34px] justify-between rounded shadow py-[34px] w-full">
//       <div className="flex items-center flex-col md:flex-row gap-[1rem] w-full md:w-auto">
//         <img
//           src={image}
//           alt={name}
//           className="w-[71px] h-[71px] rounded-full border border-black object-cover"
//         />
//         <div className="flex-1 text-center md:text-left">
//           <h2 className="font-bold text-2xl Nunito">
//             {name}<br/>
//             {specialty && <span className="text-gray-500">. {specialty}</span>}
//           </h2>
//           <p className="text-[18px] text-gray-600">{address}</p>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row items-center gap-[1rem] mt-4 md:mt-0 w-full md:w-auto">
//         <button
//           onClick={() => navigate(`/vet-profile/${id}?book=true`)}
//           className="bg-[#1d4719] text-[18px] text-white w-full md:w-[200px] h-[40px] px-4 py-1 rounded"
//         >
//           Book Appointment
//         </button>
//         <button
//           onClick={() => navigate(`/vet-profile/${id}`)}
//           className="border border-green-700 w-full md:w-[200px] h-[40px] text-[18px] text-green-700 px-4 py-1 rounded"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// }
import { useNavigate } from "react-router-dom";

export default function VetCard({ vet }) {
  const navigate = useNavigate();
  const { id, name, image, specialty, address } = vet;

  return (
    <div
      className="flex flex-row w-full items-center gap-2 bg-[#EFEEEE] px-3 py-3 rounded shadow
                    md:px-8 md:py-8 md:gap-4"
    >
      {/* Image and info */}
      <div className="flex items-center gap-2 w-full md:gap-4">
        <img
          src={image}
          alt={name}
          className="w-[40px] h-[40px] rounded-full border border-black object-cover md:w-[71px] md:h-[71px]"
        />
        <div className="flex-1">
          <h2 className="font-bold text-sm md:text-2xl Nunito leading-tight">
            {name}
            <br />
            {specialty && (
              <span className="text-gray-500 text-xs md:text-base">
                . {specialty}
              </span>
            )}
          </h2>
          <p className="text-xs md:text-[18px] text-gray-600">{address}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 md:gap-4">
        <button
          className="bg-[#3A7D34] text-white text-xs md:text-[18px] w-[90px] h-[30px] md:w-[200px] md:h-[40px] rounded px-2 py-1"
          onClick={() => navigate(`/vet-profile/${id}/book`)}
        >
          Book Appointment
        </button>

        <button
          onClick={() => navigate(`/vet-profile/${id}?book=true`)}
          className="border border-green-700 text-green-700 text-xs md:text-[18px] w-[90px] h-[30px] md:w-[200px] md:h-[40px] rounded px-2 py-1"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
