import React, { Component } from "react";
import NavCartIcon from "../NavCartIcon/NavCartIcon";
import styles from "./NavCart.module.css";

class NavCart extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <NavCartIcon />
            </div>
        );
    }
}

export default NavCart;
