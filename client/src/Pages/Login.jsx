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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email.includes("@")) {
      toast.error("ایمیل معتبر وارد کنید");
      return;
    }

    if (password.length < 8) {
      toast.error("رمز عبور باید حداقل 8 کاراکتر باشد");
      return;
    }
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

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

        <input
          className="auth-input"
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-box">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className="password-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="auth-btn" onClick={handleLogin}>
          ورود
        </button>

        <Link to="/register" className="auth-link">
          حساب نداری؟ ثبت نام کن
        </Link>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
