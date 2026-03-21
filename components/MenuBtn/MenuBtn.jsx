import React from "react";
import styles from "./MenuBtn.module.scss";

const MenuBtn = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`${styles.menu_toggle} ${isOpen ? styles.opened : styles.closed}`}
      onClick={toggleMenu}
    >
      <div className={styles.menu_toggle_icon}>
        <div className={styles.hamburger}>
          <div className={styles.menu_bar} data-position="top"></div>
          <div className={styles.menu_bar} data-position="bottom"></div>
        </div>
      </div>
      <div className={styles.menu_copy}>
        <p>Menu</p>
      </div>
    </div>
  );
};

export default MenuBtn;
