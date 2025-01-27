import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import cartIcon from "../../../assets/empty_cart.svg";
import styles from "./NavCartIcon.module.css";
import { toggleModalVisibility } from "../../../../store/slices/modalSlice";
import { selectTotalQuantity } from "../../../../store/selectors/cartSelectors";

class NavCartLogo extends Component {
    constructor() {
        super();
        this.state = {
            isAnimated: false
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.totalQuantity !== this.props.totalQuantity) {
            this.setState({ isAnimated: true });
            setTimeout(() => {
                this.setState({ isAnimated: false });
            }, 300);
        }
    }

    toggleModalHandler = () => {
        this.props.toggleModalVisibility();
    };

    render() {
        const { totalQuantity } = this.props;

        return (
            <div onClick={this.toggleModalHandler} data-testid="cart-btn"
                className={`${styles.cart} ${this.state.isAnimated ? styles.bump : ""}`}>
                <img src={cartIcon} alt="shop cart" />
                {totalQuantity > 0 && <div className={styles.number}><span data-testid="cart-count-bubble">
                    {totalQuantity}</span></div>}
            </div>
        );
    }
}

NavCartLogo.propTypes = {
    totalQuantity: PropTypes.number.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    totalQuantity: selectTotalQuantity(state)
});

export default connect(mapStateToProps, { toggleModalVisibility })(NavCartLogo);
