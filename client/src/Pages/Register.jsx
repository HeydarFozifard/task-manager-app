import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../Auth.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { TypeAnimation } from "react-type-animation";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchema";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (data) => {
    try {
      await api.post("/auth/register", data);

      toast.success("ثبت نام موفق ✅");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "خطا در ثبت نام");
    }
  };
  const navigate = useNavigate();
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
        <h1 className="auth-title">ثبت نام</h1>
        <form onSubmit={handleSubmit(handleRegister)} className="form">
          <input
            className="auth-input"
            type="text"
            placeholder="نام"
            {...register("name")}
          />

          {errors.name && <p className="error-text">{errors.name.message}</p>}

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

            <span
              className="password-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}

          <button type="submit" className="auth-btn">
            ثبت نام
          </button>

          <Link to="/login" className="auth-link">
            حساب داری؟ وارد شو
          </Link>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Register;
