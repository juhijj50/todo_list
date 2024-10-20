import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Input, Button, message } from "antd"; // Import Button from antd
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { getErrorMessage } from "../../util/GetError"; // Ensure this utility function is properly defined
import AuthServices from "../../services/authServices"; // Ensure AuthServices is imported correctly

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = {
        username,
        password,
      };

      const response = await AuthServices.loginUser(data);
      console.log(response.data);
      localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
      message.success("Logged in Successfully!");
      navigate('/to-do-list');
    } catch (err) {
      console.error(err); // Use console.error for errors
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false); // Always set loading to false in finally block
    }
  };

  return (
    <div>
      <div className={styles.login_card}>
        <img src={login} alt="Login" />
        <h4>Login</h4>
        <div className={styles.input_wrapper}>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input.Password // Use Input.Password for password field
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input__info}>
          New User? <Link to="/register">Register</Link>
        </div>
        <Button
          loading={loading} // Show loading state
          type="primary"
          disabled={!username || !password || loading} // Ensure loading is also considered for disabling
          onClick={handleSubmit}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
