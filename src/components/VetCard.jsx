import { useNavigate } from 'react-router-dom';

export default function VetCard({ vet }) {
  const navigate = useNavigate();
  const { id, name, image, specialty, address } = vet;

  return (
    <div className="flex flex-col md:flex-row md:w-[1100px] items-center gap-[1rem] bg-[#EFEEEE] px-[34px] justify-between rounded shadow py-[34px] w-full">
      <div className="flex items-center flex-col md:flex-row gap-[1rem] w-full md:w-auto">
        <img
          src={image}
          alt={name}
          className="w-[71px] h-[71px] rounded-full border border-black object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-bold text-2xl Nunito">
            {name}<br/>
            {specialty && <span className="text-gray-500">. {specialty}</span>}
          </h2>
          <p className="text-[18px] text-gray-600">{address}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-[1rem] mt-4 md:mt-0 w-full md:w-auto">
        <button
          onClick={() => navigate(`/vet-profile/${id}?book=true`)}
          className="bg-[#1d4719] text-[18px] text-white w-full md:w-[200px] h-[40px] px-4 py-1 rounded"
        >
          Book Appointment
        </button>
        <button
          onClick={() => navigate(`/vet-profile/${id}`)}
          className="border border-green-700 w-full md:w-[200px] h-[40px] text-[18px] text-green-700 px-4 py-1 rounded"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
