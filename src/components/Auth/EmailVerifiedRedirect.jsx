// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, onAuthStateChanged } from "../../firebase";
// import { toast } from "react-toastify";

// export default function EmailVerifiedRedirect() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user && user.emailVerified) {
//         const userType = localStorage.getItem("userType");

//         if (userType === "farmer") {
//           navigate("/farmer-onboarding");
//         } else if (userType === "vet") {
//           navigate("/vet-onboarding");
//         } else {
//           toast.error("Missing user type. Please login again.");
//           navigate("/login");
//         }
//       } else {
//         toast.error("Email not verified or not logged in.");
//         navigate("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   return (
//     <div className="p-8 text-center">
//       <h2 className="text-xl font-semibold">Checking verification...</h2>
//     </div>
//   );
// }
