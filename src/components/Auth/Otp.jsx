//src/components/Auth/../../modals/OTPInput
import OTPInput from "../../modals/OTPInput"
import AuthWrapper from '../../utils/AuthWrapper'
function SignUp() {
  const handleOTPSubmit = (code) => {
    console.log("Entered OTP:", code);
  };

  const xml = (
    <AuthWrapper>
      <div className='bg-black/60 backdrop-blur-xl  max-md:rounded-t-[30px] md:rounded-[30px] flex flex-col items-center justify-center gap-15 text-white  p-8 w-full h-full shadow-xl text-center'>
        <h2 className='text-[4rem] font-bold mb-2'>Verify Your Account</h2>
        <p className='text-[1.7rem] mb-4'>
          We’ve sent you a 6-digit code to your email/phone. Enter it below to
          continue.
        </p>

        <OTPInput length={6} onComplete={handleOTPSubmit} />

        <button className='bg-green-900 hover:bg-green-800 text-[3rem] text-white max-md:w-full lg:w-[434px] place-self-center h-[6rem] py-2 rounded-[20px] mt-4'>
          Verify
        </button>
      </div>
    </AuthWrapper>
  );
  return xml;
}

export default SignUp;
