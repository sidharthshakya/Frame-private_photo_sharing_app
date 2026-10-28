
import { useNavigate } from "react-router";

const LoginByEmail = ({ toggle }) => {
  const navigate = useNavigate();

  return (
    <>
      <p>Login</p>

      <form>
        <input type="email" placeholder="a@a.com" />
        <input type="password" placeholder="●●●●●●●●" />
        <button>Login</button>
      </form>

      <p>
        Login by{" "}
        <span onClick={() => toggle((prev) => !prev)}>
          Username
        </span>
      </p>

      <p>
        Don't have an account.{" "}
        <span onClick={() => navigate("/auth/register")}>
          Register
        </span>
      </p>
    </>
  );
};

export default LoginByEmail;
