import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import logoo from "../../assets/logoo.png";
import signupbg from "../../assets/signupbg.svg";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function FirstLogin() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const db = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validateLogin = () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please enter both email and password.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin() || loading) return;
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        toast.error("Email not verified. Please verify your email.");
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await signOut(auth);
        toast.error("User data not found. Contact support.");
        setLoading(false);
        return;
      }

      const data = userSnap.data();
      const userType = data.userType || data.role;

      if (!userType) {
        await signOut(auth);
        toast.error("User role not set. Contact support.");
        setLoading(false);
        return;
      }

      toast.success("Login successful!");

      if (userType === "vet") {
        navigate("/vet-dashboard");
      } else if (userType === "farmer") {
        navigate("/farmer-dashboard");
      } else {
        await signOut(auth);
        toast.error("Invalid user role. Access denied.");
      }
    } catch (error) {
      setLoading(false);
      setLoginData((prev) => ({ ...prev, password: "" }));

      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed. Please try again.");
        console.error(error);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Desktop Background */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signupbg})` }}
      />

      {/* Mobile background + logo */}
      <div
        className="block md:hidden w-full h-full absolute bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${signupbg})` }}
        aria-hidden="true"
      />
      <div className="block md:hidden w-full p-4 flex justify-center">
        <img src={logoo} alt="Qiwo Farms Logo" className="w-[165px] pt-7" />
      </div>

      {/* Form Section */}
      <main className="w-full md:w-1/2 flex items-center justify-center p-6 mt-60 md:mt-0">
        <section
          className="bg-white p-8 rounded-lg shadow-md md:w-full w-[300px]"
          aria-labelledby="login-heading"
        >
          <div className="pl-[4rem]">
            <h2
              id="login-heading"
              className="text-2xl font-bold md:text-5xl mb-2 text-center md:text-left"
            >
              Login
            </h2>
            <p className="text-xl md:text-2xl md:text-gray-500 mb-6 text-center md:text-left">
              Enter your credentials
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
            aria-describedby="login-instructions"
          >
            {/* Email */}
            <div className="relative w-full max-w-[210px] md:max-w-[500px]">
              <div className="flex items-center border rounded px-3 border-none md:h-[72px] h-[44px] bg-[#EFEEEE] w-full">
                <Mail className="text-gray-400 md:w-6 md:h-6 w-4 h-4" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="flex-1 bg-transparent focus:outline-none pl-3 pr-3 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl"
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative w-full max-w-[210px] md:max-w-[500px]">
              <div className="flex items-center border rounded px-3 border-none md:h-[72px] h-[44px] bg-[#EFEEEE] w-full">
                <Lock className="text-gray-400 md:w-6 md:h-6 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="flex-1 bg-transparent focus:outline-none pl-3 pr-10 text-base md:text-2xl placeholder:text-sm md:placeholder:text-2xl"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="md:w-6 md:h-6 w-4 h-4" />
                ) : (
                  <Eye className="md:w-6 md:h-6 w-4 h-4" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:w-full  md:max-w-[500px] w-[210px] md:h-[72px] h-[44px] bg-green-800 text-white rounded hover:bg-green-900 text-base md:text-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
