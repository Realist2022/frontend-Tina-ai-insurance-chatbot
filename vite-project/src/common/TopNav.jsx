import React, { useState } from "react";
import styles from "./TopNav.module.css";
import logo from "../images/TurnersCarLogo.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  // OPEN MENU FUNCTION
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // CLOSE MENU FUNCTION
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <img src={logo} className={styles.logo} alt="Company Logo" />

      {/* HAMBURGER/XMARK MENU ICON */}
      <div className={styles["menu-icon"]} onClick={toggleMenu}>
        {" "}
        {/* Had to use [] for menu-icon because of hyphen */}
        {isOpen ? (
          // Show Xmark when menu is open
          <FontAwesomeIcon icon={faXmark} />
        ) : (
          // Show Bars when menu is closed
          <FontAwesomeIcon icon={faBars} />
        )}
      </div>

      {/* TOP NAV CONTENT AND LOGIN */}

      <div className={`${styles.loginAndNav} ${isOpen ? styles.open : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>
        <a href="#news" onClick={closeMenu}>
          News
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        {/* LOGIN BUTTON */}
        <button className={styles.loginButton}>Login</button>
      </div>
    </div>
  );
}

export default TopNav;
