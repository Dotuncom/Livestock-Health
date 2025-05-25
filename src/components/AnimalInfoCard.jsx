import AnimalProfile from '../assets/AboutImage.png'
const AnimalInfoCard = () => (
    <div className="flex flex-col items-center lg:items-start gap-4 p-4 w-full lg:w-1/2">
      <img
        src={AnimalProfile}
        alt="Animal"
        className="w-[232px] h-[232px] rounded-full object-cover"
      />
      <div className="text-[20px] Inter  font-medium space-x-8 space-y-1">
        <p><strong>N.0:</strong> 004</p>
        <p><strong>Age:</strong> Cow</p>
        <p><strong>Animal:</strong> 6 Years Old</p>
        <p><strong>Breed:</strong> <span className="text-red-600">Red Bororo</span></p>
        <p><strong>Device Status:</strong> <span className="text-green-600">Charged</span></p>
      </div>
    </div>
  );
  
  export default AnimalInfoCard;
  