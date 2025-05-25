import React from "react";
import logoo from '../../assets/logoo.png'
import signupbg from '../../assets/signupbg.svg'

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen flex flex-col
md:flex-row"
    >
      {" "}
      {/* Image Section (Desktop only) */}{" "}
      <div
        className="hidden md:block md:w-1/2
bg-cover bg-center relative"
style={{ backgroundImage: `url(${signupbg})` }}
      >
        {/* logo */}
        <div className="absolute inset-0 bg-black opacity-50 flex flex-col justify-center items-center">
          <p className="text-white text-sm">Your partner in livestock health</p>
          </div>
          </div>
          {/* Mobile background image */}
          <div
            className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
            style={{ backgroundImage: `url(${signupbg})` }}
          >
            <div className="block md:hidden w-full p-4   flex justify-center">
            <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7 " />
            </div>

          </div>
          {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60">
        <div className="bg-white p-8 rounded-lg shadow-md w-[223px]  w-full lg:w-[523px] lg:h-full">
          <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
          <p className="text-sm text-gray-600 mb-6">Register your account</p>
          <form>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 px-4 py-2 border rounded"
            />
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm">Accept terms and condition</label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded hover:bg-green-900"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <a href="#" className="text-green-800">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
