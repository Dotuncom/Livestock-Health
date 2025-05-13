function FormButton({ onClick = () => {}, children }) {
  const xml = (
    <button className='w-[53.7rem] max-md:h-[5rem] max-lg:h-[6rem] max-w-[90%] h-[7.8rem] bg-[#1D4719] rounded-[2rem] font-[Inter] font-medium max-md:text-[1.4rem] text-[2.4rem] text-white [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)] mb-[2rem] custom-b-mb custom-input'>
      {children}
    </button>
  );
  return xml;
}

export default FormButton;
