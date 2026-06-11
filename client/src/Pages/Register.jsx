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
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (name.trim().length < 3) {
      toast.error("نام باید حداقل 3 حرف باشد");
      return;
    }

    if (!email.includes("@")) {
      toast.error("ایمیل معتبر نیست");
      return;
    }

    if (password.length < 8) {
      toast.error("رمز عبور باید حداقل 8 کاراکتر باشد");
      return;
    }
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("ثبت نام موفق ✅");

      navigate("/login");
    } catch (error) {
      alert("خطا در ثبت نام");
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

        <input
          className="auth-input"
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="auth-btn" onClick={handleRegister}>
          ثبت نام
        </button>

        <Link to="/login" className="auth-link">
          حساب داری؟ وارد شو
        </Link>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Register;
