import React, { Component } from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

class Button extends Component {
    render() {
        const { type, clickOnButton, isActive, testid } = this.props;
        return (
            <>
                <button data-testid={testid} type={type} className={styles.large} disabled={!isActive} onClick={clickOnButton}>ADD TO CART</button>
            </>
        );
    }
}

Button.defaultProps = {
    type: "button",
    name: "Click on me",
    isActive: true
};

Button.propTypes = {
    testid: PropTypes.string,
    type: PropTypes.string,
    styleName: PropTypes.string,
    clickOnButton: PropTypes.func,
    isActive: PropTypes.bool,
    empty: PropTypes.bool
};

export default Button;
