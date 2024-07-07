import React, { Component } from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";

class ButtonDisabled extends Component {
    render() {
        const { name } = this.props;
        return (
            <>
                <button className={styles.large} disabled={true}>{name}</button>
            </>
        );
    }
}

ButtonDisabled.propTypes = {
    name: PropTypes.string
};

export default ButtonDisabled;
