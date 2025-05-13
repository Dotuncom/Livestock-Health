//src/components/SignUpForm.jsx
import CustomInputField from "../modals/CustomInputField";
import envelop from "../assets/envelop.svg";
import user from "../assets/user.svg";
import password from "../assets/password.svg";
import { Link } from "react-router-dom";
// import { useState } from "react";
import FormButton from "../utils/FormButton";

function SignUpForm() {
  const xml = (
    <form className='w-full  h-full flex flex-col items-center justify-center [>]:flex-none ss'>
      <h1 className='font-[Poppins] max-lg:text-[30px] max-md:text-[24px] not-italic font-semibold text-[5rem] leading-[7.5rem] text-[#121212] w-[53.8rem] max-w-[90%] lg:whitespace-nowrap'>
        Welcome back
      </h1>
      <small className='font-[Inter] max-md:text-[15px] not-italic block font-medium text-left text-[2rem] leading-[2.4rem] w-[53.8rem] max-w-[90%] text-[#121212] mb-[3rem] custom-h-mb'>
        Register your account
      </small>
      <CustomInputField
        type='email'
        label='Enter Email'
        img={envelop}
        id='email'
        name='email'
      />
      <div className=' max-md:mb-0 mb-[1.5rem] custom-mb'></div>
      <CustomInputField
        type='text'
        label='Enter Name'
        img={user}
        id='name'
        name='name'
      />
      <div className=' max-md:mb-0 mb-[1.5rem] custom-mb'></div>
      <CustomInputField
        type='password'
        label='Enter Password'
        img={password}
        id='password'
        name='password'
      />
      <div className=' max-md:mb-0 mb-[1.5rem] custom-mb'></div>
      <button className='text-[#A6B0C9] align-bottom font-[Inter] font-medium max-lg:text-[1.4rem] text-[2rem] leading-[2.4rem]  lg:ml-[30rem] mb-[2.2rem] custom-b-mb'>
        <Link to='/forgotpassword'>Forgot Password?</Link>
      </button>

      <FormButton onClick={null}>Sign In</FormButton>
      <div className='w-[53.7rem] max-w-[90%] font-[Inter] font-medium max-md:text-[1.4rem] text-[2.4rem] leading-[2.9rem] text-[#121212] text-center'>
        Don't Have An Account?
        <Link to='/signup' className='ml-2.5'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </form>
  );
  return xml;
}

export default SignUpForm;
