import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./MiniCartOrderList.module.css";
import CartProduct from "../CartProduct/CartProduct";

class MiniCartOrderList extends Component {
    render() {
        const { totalPrice, cartProductList, totalQuantity } = this.props;

        return (
            <>
                <p className={styles.items}>My Bag,
                    <span className={styles.light} data-testid='cart-total'> {totalQuantity} items</span>
                </p>

                <div className={styles.container}>
                    {cartProductList.map((product, index) => <CartProduct key={index} product={product} isMini={true} />)}
                </div>

                <p className={`${styles.items} ${styles.flex}`}>Total:
                    <span className={styles.light}>{totalPrice.symbol} {totalPrice.totalAmount.toFixed(2)}</span>
                </p>
            </>
        );
    }
}

MiniCartOrderList.propTypes = {
    totalPrice: PropTypes.object.isRequired,
    totalQuantity: PropTypes.number.isRequired,
    cartProductList: PropTypes.array.isRequired
};

export default MiniCartOrderList;
