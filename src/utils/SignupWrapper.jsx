//src/Pages.jsx/Signup/SignupWrapper.jsx
import Logoo from "../assets/logoo.png";
function SignupWrapper({ children }) {
  const xml = (
    <div className='lg:flex sm:m-auto max-md:py-20 max-lg:bg-[url("./assets/background.png")] bg-cover bg-center max-sm:h-full max-lg:h-screen lg:h-dvh'>
      <div className="lg:flex-[1_0_50%] lg:relative hidden  lg:flex lg:bg-[url('./assets/signupbg.svg')] bg-center bg-cover"></div>
      <img
        src={Logoo}
        className='max-lg:flex w-60 lg:hidden place-self-center mb-20'
        alt=''
      />
      <div className='lg:flex-[1_0_50%] max-lg:bg-white max-lg:p-[30px] max-md:p-0 max-lg:rounded-2xl max-lg:w-3/4 max-lg:h-fit max-lg:m-auto lg:overflow-hidden'>
        {children}
      </div>
    </div>
  );
  return xml;
}

export default SignupWrapper;
