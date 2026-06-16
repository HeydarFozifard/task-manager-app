import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import "../Auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/authSchema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      localStorage.setItem("token", response.data.token);

      toast.success("با موفقیت وارد شدید ✅");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ورود");
    }
  };
  return (
    <div className="auth-page">
      <div className="welcome-section">
        <TypeAnimation
          sequence={[
            "به سامانه مدیریت وظایف خوش آمدید 👋",
            2000,
            "",
            500,
            "کارهای خود را هوشمند مدیریت کنید 🚀",
            2000,
            "",
            500,
            "بهره‌وری خود را افزایش دهید 📈",
            2000,
          ]}
          wrapper="h2"
          speed={50}
          repeat={Infinity}
        />
      </div>
      <div className="auth-card">
        <h1 className="auth-title">ورود</h1>

        <form onSubmit={handleSubmit(handleLogin)} className="form">
          <input
            className="auth-input"
            type="email"
            placeholder="ایمیل"
            {...register("email")}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
          <div className="password-box">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}

            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="auth-btn">
            ورود
          </button>

          <Link to="/register" className="auth-link">
            حساب نداری؟ ثبت نام کن
          </Link>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
