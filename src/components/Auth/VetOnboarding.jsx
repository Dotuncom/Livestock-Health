// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import logoo from "../../assets/logoo.png";
// import authbg from "../../assets/authbg.png";
// import { toast } from "react-toastify";

// export default function VetOnboarding() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { signupData, userType } = location.state || {};

//   useEffect(() => {
//     if (!signupData) navigate("/vet-signup");
//   }, [signupData, navigate]);

//   const [onboardingData, setOnboardingData] = useState({
//     yearsOfExperience: "",
//     clinicName: "",
//     licenseNumber: "",
//     preferredAnimals: [],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setOnboardingData((prev) => {
//         const updated = checked
//           ? [...prev.preferredAnimals, value]
//           : prev.preferredAnimals.filter((a) => a !== value);
//         return { ...prev, preferredAnimals: updated };
//       });
//     } else {
//       setOnboardingData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateOnboarding = () => {
//     const { yearsOfExperience, clinicName, licenseNumber, preferredAnimals } = onboardingData;
//     if (!yearsOfExperience || !clinicName || !licenseNumber) {
//       toast.error("Please fill in all fields");
//       return false;
//     }
//     if (preferredAnimals.length === 0) {
//       toast.error("Please select at least one preferred animal");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateOnboarding()) {
//       navigate("/otp", { state: { signupData, onboardingData, userType } });
//     }
//   };

//   const inputStyle =
//     "flex-1 bg-transparent focus:outline-none pl-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl";

//   const inputContainerStyle =
//     "flex items-center border-none  rounded px-3 bg-[#EFEEEE]  md:h-[60px] h-[28px] md:w-[538px] w-[210px]";

//   const buttonStyle =
//     "md:w-[538px] w-[210px] md:h-[60px] h-[28px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold";

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
//       {/* Desktop Background */}
//       <div
//         className="hidden md:block md:w-1/2 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${authbg})` }}
//       >
//         <div className="absolute inset-0 flex flex-col justify-center items-center"></div>
//       </div>

//       {/* Mobile background + logo */}
//       <div
//         className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
//         style={{ backgroundImage: `url(${authbg})` }}
//       />
//       <div className="block md:hidden w-full p-4 flex justify-center">
//         <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
//       </div>

//       {/* Form Section */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
//         <div className="bg-white p-8 rounded-lg shadow-md md:w-full w-[300px]">
//           <div className="md:pl-[4.5rem] md:mb-[3rem]">
//             <h2 className="text-2xl md:text-4xl md:font-bold mb-2 text-center md:text-left">
//               Onboarding Details
//             </h2>
//             <p className="text-sm md:text-lg md:text-gray-500 mb-6 text-center md:text-left">
//               Tell us about your veterinary practice
//             </p>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
//             {/* Years of Experience */}
//             <div className={inputContainerStyle}>
//               <input
//                 type="text"
//                 name="yearsOfExperience"
//                 placeholder="Years of Experience"
//                 value={onboardingData.yearsOfExperience}
//                 onChange={handleChange}
//                 className={inputStyle}
//               />
//             </div>

//             {/* Clinic Name */}
//             <div className={inputContainerStyle}>
//               <input
//                 type="text"
//                 name="clinicName"
//                 placeholder="Clinic Name"
//                 value={onboardingData.clinicName}
//                 onChange={handleChange}
//                 className={inputStyle}
//               />
//             </div>

//             {/* License Number */}
//             <div className={inputContainerStyle}>
//               <input
//                 type="text"
//                 name="licenseNumber"
//                 placeholder="License Number"
//                 value={onboardingData.licenseNumber}
//                 onChange={handleChange}
//                 className={inputStyle}
//               />
//             </div>

//             {/* Preferred Animals */}
//             <div className="text-sm md:text-xl font-semibold md:w-[538px] w-[210px]">
//               <label className="mb-2 block">Preferred Animals:</label>
//               <div className="flex space-x-4">
//                 {["Cattle", "Goats", "Sheep"].map((animal) => (
//                   <label key={animal} className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       name="preferredAnimals"
//                       value={animal}
//                       checked={onboardingData.preferredAnimals.includes(animal)}
//                       onChange={handleChange}
//                       className="mr-1"
//                     />
//                     {animal}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className={buttonStyle}>
//               Next
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";
import logoo from "../../assets/logoo.png";
import authbg from "../../assets/authbg.png";
import { toast } from "react-toastify";

export default function VetOnboarding() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [onboardingData, setOnboardingData] = useState({
    clinicName: "",
    licenseNumber: "",
    yearsOfExperience: "",
    specialty: "",
    phoneNumber: "",
    clinicAddress: "",
  });

  const [sending, setSending] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Check email verification status on mount and every 5 sec (poll)
  useEffect(() => {
    if (!user) {
      navigate("/vet-signup");
      return;
    }

    const checkVerification = () => {
      user.reload().then(() => {
        setEmailVerified(user.emailVerified);
      });
    };

    checkVerification();
    const interval = setInterval(checkVerification, 5000);

    return () => clearInterval(interval);
  }, [navigate, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOnboardingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailVerified) {
      toast.error("Please verify your email before completing onboarding.");
      return;
    }

    const { clinicName, licenseNumber, yearsOfExperience, specialty, phoneNumber, clinicAddress } = onboardingData;

    if (!clinicName || !licenseNumber || !yearsOfExperience || !specialty || !phoneNumber || !clinicAddress) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await setDoc(doc(db, "vets", user.uid), {
        ...onboardingData,
        email: user.email,
        createdAt: new Date(),
      });

      toast.success("Onboarding complete. Please login.");
      auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("Failed to save onboarding data.");
    }
  };

  const resendVerification = async () => {
    setSending(true);
    try {
      await sendEmailVerification(user);
      toast.success("Verification email resent. Please check your inbox.");
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend verification email.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle =
    "w-[210px] md:w-[538px] h-[28px] md:h-[60px] border-none px-4 rounded bg-[#EFEEEE] placeholder:text-sm md:placeholder:text-2xl text-base md:text-2xl";

  const buttonStyle =
    "w-[210px] md:w-[538px] h-[28px] md:h-[72px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold";

  return (
  <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authbg})` }}
      >
        <div className="absolute  flex flex-col justify-center items-center"></div>
      </div>

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${authbg})` }}
      />
      <div className="block md:hidden w-full p-4 flex justify-center">
        <img src={logoo} alt="Qiwo Farms" className="w-[165px] pt-7" />
      </div>

      {/* Form */}
      <div className="w-full Poppins md:w-1/2 flex flex-col items-center justify-center p-6 mt-60 md:mt-0">
        <div className="bg-white p-8 rounded-lg shadow-md md:w-full w-[300px]">
          <h2 className="text-2xl md:text-5xl md:font-bold mb-6 text-center md:text-left">Vet Onboarding</h2>

          {!emailVerified && (
            <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded text-center">
              <p>Your email is not verified yet. Please check your inbox.</p>
              <button
                onClick={resendVerification}
                disabled={sending}
                className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-900 text-white rounded"
              >
                {sending ? "Sending..." : "Resend Verification Email"}
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="text"
              name="clinicName"
              placeholder="Clinic Name"
              value={onboardingData.clinicName}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
            />
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={onboardingData.licenseNumber}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
            />
            <input
              type="number"
              name="yearsOfExperience"
              placeholder="Years of Experience"
              value={onboardingData.yearsOfExperience}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
              min="0"
            />
            <input
              type="text"
              name="specialty"
              placeholder="Specialty"
              value={onboardingData.specialty}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={onboardingData.phoneNumber}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
            />
            <input
              type="text"
              name="clinicAddress"
              placeholder="Clinic Address"
              value={onboardingData.clinicAddress}
              onChange={handleChange}
              className={inputStyle}
              disabled={!emailVerified}
            />

            <button
              type="submit"
              className={buttonStyle}
              disabled={!emailVerified}
            >
              Complete Onboarding
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
