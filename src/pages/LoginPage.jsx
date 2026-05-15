import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import useAuthStore from "../store/useAuthStore";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

import { useThemeStore } from "../store/useThemeStore";
import Hero2 from "../components/Hero2";
import Hero from "../components/Hero";

//? =========================== LOGIN COMPONENT =========================== LOGIN COMPONENT
const LoginPage = () => {
  const { theme } = useThemeStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  //? =========================== JSX =========================== JSX
  return (
    <div className=" min-h-screen grid lg:grid-cols-2">
      {/*==========================  LEFT SIDE  ==========================   LEFT SIDE   */}
      <div className=" flex flex-col justify-center items-center p-6 sm:p-12 order-2 md:order-0">
        <div className=" w-full max-w-md space-y-8">
          {/*========================== LOGO */}
          <div className=" text-center mb-8">
            <div className=" flex flex-col items-center gap-2 group">
              <div className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className=" size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className=" text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className=" space-y-6 ">
            {/*========================== EMAIL */}
            <div className=" form-control">
              <label className="label">
                <span className=" label-text font-medium">Email</span>
              </label>

              <div className=" relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-3 ">
                  <Mail className=" size-5 text-base-content/40" />
                </div>

                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="Mahmoud@rayg.com"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/*========================== PASSWORD */}
            <div className=" form-control">
              <label className="label">
                <span className=" label-text font-medium">Password</span>
              </label>

              <div className=" relative">
                <div className=" absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-3 ">
                  <Lock className=" size-5 text-base-content/40" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className=" absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <Eye className=" size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className=" size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            {/*========================== SUBMIT */}
            <button
              type="submit"
              className=" btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className=" size-5 animate-spin" />
                  Loading •••
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className=" text-center">
            <p className=" text-base-content/60">
              Don't have an account ?{" "}
              <Link to={"/signup"} className=" link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/*==========================  RIGHT SIDE  ==========================   RIGHT SIDE   */}

      {theme === "synthwave" || theme === "dark" || theme === "light" ? (
        <Hero />
      ) : theme === "cupcake" ? (
        <Hero2 />
      ) : (
        <AuthImagePattern
          title={"Join our community"}
          subtitle={
            "Connect with friends, share moments, and stay in touch with your loved ones"
          }
        />
      )}
    </div>
  );
};

export default LoginPage;
