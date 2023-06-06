import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { useValue } from "../../contexts/userContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logOutHandler } = useValue();

  const navigate = useNavigate();

  const clickedOnLogOutBtn = () => {
    logOutHandler();
    navigate('/');
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            AssetManager
          </Link>
        </div>
        <div className={styles.right}>
          {user ? (
            <>
              <div className={styles.action_container}>
                <Link to="/dashboard" className={styles.link}>
                  Dashboard
                </Link>
                <button onClick={clickedOnLogOutBtn} className={styles.logout_btn}>
                  LogOut
                </button>
              </div>
            </>
          ) : (
            <Link to="/signin" className={styles.link}>
              Sign In
            </Link>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
