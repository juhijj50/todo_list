import React, { useState } from "react";
import styles from "./Register.module.css";
import RegisterImage from "../../assets/login.png"; // Renamed for clarity
import { Input, Button, message } from "antd"; // Import Button from antd
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { getErrorMessage } from "../../util/GetError"; // Ensure this utility function is properly defined
import AuthServices from "../../services/authServices"; // Ensure AuthServices is imported correctly

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(""); // Corrected the function name
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async () => {
    try {
      setLoading(true); // Set loading to true when starting the submission
      const data = {
        firstName,
        lastName,
        username,
        password,
      };

      const response = await AuthServices.registerUser(data);
      console.log(response.data); // You might want to log the response for debugging
      message.success("You're registered successfully!");
      navigate('/login'); // Navigate to login after successful registration
    } catch (err) {
      console.error(err); // Use console.error for errors
      message.error(getErrorMessage(err)); // Display error message
    } finally {
      setLoading(false); // Always set loading to false in finally block
    }
  };

  return (
    <div>
      <div className={styles.Register_card}>
        <img src={RegisterImage} alt="Register" /> {/* Renamed variable for clarity */}
        <h4>Register</h4>
        <div className={styles.input__inline__wrapper}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} // Corrected setter
          />
          <Input
            placeholder="Username" // Fixed the casing
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Corrected setter
          />
        </div>
        <div className={styles.input_wrapper}>
          <Input.Password
            placeholder="Password" // No need for type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input__info}>
          Existing User? <Link to="/login">Login</Link>
        </div>
        <Button
          loading={loading} // Show loading state
          type="primary"
          disabled={!username || !password || loading} // Ensure loading is also considered for disabling
          onClick={handleSubmit}
        >
          Register {/* Updated button text */}
        </Button>
      </div>
    </div>
  );
}

export default Register;
