import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from 'react-router-dom';

import landing from '../../assets/todo.webp';
import styles from './Landing.module.css';

function Landing() {
  return (
    <div>
      <Navbar active="home" />

      <div className={styles.landing_wrapper}>
        <div className={styles.landing_text}>
          <h1>
            Schedule Your Daily Tasks With{" "}
            <span className={styles.primaryText}>ToDo!</span>
          </h1>
          <div className={styles.btnWrapper}>
            {/* Apply styles for buttons properly */}
            <Link to="/register" className={styles.primaryBtn}>
              Register
            </Link>
            <Link to="/login" className={styles.secondaryBtn}>
              Login
            </Link>
          </div>
        </div>

        <div className={styles.landing_img}>
          <img src={landing} alt="landing" />
        </div>
      </div>
    </div>
  );
}

export default Landing;
