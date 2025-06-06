import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../firebase";
import { onAuthStateChanged, sendEmailVerification, reload } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, uid } = location.state || {};

  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);

  // Periodically check if the email is verified
  useEffect(() => {
    if (!email || !uid) {
      toast.error("Invalid access");
      navigate("/signup");
      return;
    }

    const interval = setInterval(async () => {
      setChecking(true);
      await reload(auth.currentUser);
      const user = auth.currentUser;

      if (user && user.emailVerified) {
        clearInterval(interval);
        setVerified(true);

        try {
          const userDoc = await getDoc(doc(db, "users", uid));
          const role = userDoc.exists() ? userDoc.data().role : null;

          toast.success("Email verified successfully!");
          if (role === "farmer") {
            navigate("/farmer-onboarding");
          } else if (role === "vet") {
            navigate("/vet-onboarding");
          } else {
            navigate("/login");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          toast.error("Failed to fetch user info. Please log in.");
          navigate("/login");
        }
      }

      setChecking(false);
    }, 4000); // check every 4 seconds

    return () => clearInterval(interval);
  }, [email, uid, navigate]);

  const handleResend = async () => {
    if (!auth.currentUser) return;

    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email resent!");
    } catch (error) {
      console.error("Error resending email:", error);
      toast.error("Failed to resend verification email.");
    }
    setResending(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Verify Your Email</h1>
      <p className="text-gray-600 text-sm md:text-lg mb-6">
        We sent a verification link to <strong>{email}</strong>.
        <br />
        Please check your inbox or spam folder.
      </p>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleResend}
          disabled={resending}
          className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 disabled:opacity-50"
        >
          {resending ? <ClipLoader size={18} color="#fff" /> : "Resend Verification Email"}
        </button>

        {checking ? (
          <p className="text-sm text-green-700 flex items-center gap-2">
            <ClipLoader size={16} color="green" />
            Checking for verification...
          </p>
        ) : (
          <p className="text-sm text-gray-500">We’ll check automatically once verified.</p>
        )}
      </div>
    </div>
  );
}
