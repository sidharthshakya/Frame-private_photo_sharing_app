
import { useNavigate } from "react-router";

const LoginByUsername = ({ toggle }) => {
  const navigate = useNavigate();

  return (
    <>
      <p>Login</p>

      <form>
        <input type="text" placeholder="abcd12" />
        <input type="password" placeholder="●●●●●●●●" />
        <button>Login</button>
      </form>

      <p>
        Login by{" "}
        <span onClick={() => toggle((prev) => !prev)}>
          Email
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

export default LoginByUsername;
