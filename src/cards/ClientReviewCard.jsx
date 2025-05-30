//src/components/ClientReviewCard.jsx

const ClientReviewCard = ({text, profile, name, location, ratings}) => {
  return (
    
<div className='rounded-[20px] w-[288px] h-[205px] md:px-[35px] bg-white py-[30px] md:w-[384px] md:max-h-[273px]'>
  <div className='md:w-[300px]  p-[1rem] h-[101px] text-[13px] Inter font-medium  md:text-[15px] leading-[16px]'>
    <p>
      {text}
    </p>
  </div>
  <div className='flex flex-row items-center gap-[15px]'>
    <div className='w-[45px] h-[45px] rounded-[30px]'>
      <img src={profile} alt="profile image" srcset="" />
    </div>
    <div>
      <h1 className='text-[13px] font-bold Inter leading-[17px]'>{name}</h1>
      <p>{location}</p>
    </div>
    <div className='w-[18px] h-[18px] flex'>
      {Array.from({ length: ratings }, (_, index) => (
        <span key={index}>⭐</span>
      ))}
    </div>
  </div>
</div>
  )
}

export default ClientReviewCard
