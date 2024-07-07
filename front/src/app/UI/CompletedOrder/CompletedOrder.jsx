import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CompletedOrder.module.css";

class CompletedOrder extends Component {
    render() {
        const { seconds } = this.props;
        return (<div>
            <h2 className={styles.heading}>Thanks for Order</h2>
            <h4 className={styles.heading}>Redirect to main Page after: {seconds} seconds</h4>
        </div>);
    }
};

CompletedOrder.propTypes = {
    seconds: PropTypes.number.isRequired
};

export default CompletedOrder;
