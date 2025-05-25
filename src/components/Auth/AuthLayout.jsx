// // components/AuthLayout.js
// import React from "react";
// import logoo from '../../assets/logoo.png'
// import signupbg from '../../assets/signupbg.svg'

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//       {/* Left panel for desktop */}
//       <div
//         className="hidden lg:flex w-1/2 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${signupbg})` }}
//       >
//         <div className="absolute " />
//         <div className="relative z-10 p-10 text-white">
//           <div className="flex items-center gap-2 text-2xl font-bold">
//             <img src="/logo.svg" alt="Qiwo Farms" className="h-10" />
//             <span>Qiwo Farms</span>
//           </div>
//         </div>
//       </div>

//       {/* Right side with form */}
//       <div
//         className="relative flex justify-center items-center w-full lg:w-1/2 px-6"
//         style={{
//           backgroundImage: `url({${logoo}})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-white/90 lg:bg-transparent" />
//         <div className="relative z-10 w-full max-w-md p-6 space-y-4">
//           <div className="flex justify-center lg:hidden">
//             <img src={logoo} alt="Qiwo Farms" className="h-12 mb-4" />
//           </div>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;
rafce