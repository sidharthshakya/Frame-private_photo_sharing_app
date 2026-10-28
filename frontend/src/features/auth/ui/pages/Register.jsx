import { useNavigate } from "react-router";
import "../styles/auth.scss";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-card">
        <p>Register</p>

        <form>
          <input type="text" placeholder="abcd2" />
          <input type="email" placeholder="a@a.com" />
          <input type="password" placeholder="●●●●●●●●" />
          <button>Register</button>
        </form>

        <p>
          Already have an account.{" "}
          <span onClick={() => navigate("/auth/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
