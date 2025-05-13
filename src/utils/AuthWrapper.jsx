import Logoo from "../assets/logoo.png";
import backgroundImage from "../assets/bbackground.png";

function SignupWrapper({ children }) {
  return (
    <div
      className='w-full h-screen bg-cover bg-center lg:flex flex items-center justify-center relative'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black opacity-70 z-0'></div>

      {/* Centered Content */}
      <div className='relative z-10 w-full lg:max-w-[60rem] max-md:flex max-md:flex-col max-md:h-full lg:h-[60rem] mx-auto lg:rounded-2xl shadow-lg'>
        {/* Logo (mobile view) */}
        <div className='flex justify-center mb-6 lg:hidden'>
          <img src={Logoo} alt='Logo' className='w-48' />
        </div>
        {children}
      </div>
    </div>
  );
}

export default SignupWrapper;
