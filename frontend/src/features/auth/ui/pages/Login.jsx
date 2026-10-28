
import { useState } from "react";
import LoginByEmail from "../components/LoginByEmail";
import LoginByUsername from "../components/LoginByUsername";
import "../styles/auth.scss";

const Login = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-card">
        {toggle ? (
          <LoginByUsername toggle={setToggle} />
        ) : (
          <LoginByEmail toggle={setToggle} />
        )}
      </div>
    </div>
  );
};

export default Login;
