import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { ApolloConsumer } from "@apollo/client";
import styles from "./MiniCart.module.css";
import Button from "../../UI/Button/Button";
import ButtonDisabled from "../../UI/Button/ButtonDisabled";
import { clearCart } from "../../../store/slices/cartSlice";
import { toggleModalVisibility } from "../../../store/slices/modalSlice";
import { CREATE_ORDER } from "../../GraphQL/queries";
import CompletedOrder from "../../UI/CompletedOrder/CompletedOrder";
import MiniCartOrderList from "../MiniCartOrderList/MiniCartOrderList";
import {
    selectCart,
    selectTotalPrice,
    selectTotalQuantity
} from "../../../store/selectors/cartSelectors";

class MiniCart extends Component {
    state = {
        countdown: 3,
        isVisible: true,
        loading: false,
        error: null
    };

    componentDidMount() {
        if (this.props.isVisible) {
            document.body.style.overflowY = "clip";
        }
    }

    componentWillUnmount() {
        document.body.style.overflowY = "scroll";
        clearInterval(this.interval);
    }

    placeOrderHandler = async (client) => {
        const newOrder = this.props.cart.map(order => ({
            product_id: order.id,
            options: JSON.stringify(order.input),
            quantity: order.quantity
        }));

        this.setState({ loading: true });

        try {
            const response = await client.mutate({
                mutation: CREATE_ORDER,
                variables: { options: newOrder }
            });

            console.warn("Order placed:", response.data.createOrders);
            this.redirect();
        } catch (error) {
            console.error("Error placing order:", error);
            this.setState({ error });
        } finally {
            this.setState({ loading: false });
        }
    };

    redirect = () => {
        this.setState({ isVisible: false });
        this.interval = setInterval(() => {
            this.setState(prevState => ({
                countdown: prevState.countdown - 1
            }), () => {
                if (this.state.countdown === 0) {
                    clearInterval(this.interval);
                    this.props.clearCart();
                    this.props.toggleModalVisibility();
                    this.props.history.push("/");
                }
            });
        }, 1000);
    };

    render() {
        const { totalPrice, cartProductList, totalQuantity } = this.props;
        const { isVisible, loading, error, countdown } = this.state;

        return (
            <div>
                {isVisible
                    ? <MiniCartOrderList
                        totalPrice={totalPrice}
                        cartProductList={cartProductList}
                        totalQuantity={totalQuantity}
                    />
                    : <CompletedOrder
                        seconds={countdown}
                    />
                }
                <div className={styles.buttons}>
                    {cartProductList.length !== 0
                        ? (<ApolloConsumer>
                            {client => (<> {!loading && !error && (
                                <Button
                                    name="Checkout"
                                    styleName="Medium"
                                    clickOnButton={() => this.placeOrderHandler(client)}
                                />
                            )}
                                {loading && <ButtonDisabled name="LOADING" styleName="Medium" />}
                                {error && <ButtonDisabled name="SOME ERROR" styleName="Medium" />}
                            </>
                            )}
                        </ApolloConsumer>
                        )
                        : (<ButtonDisabled name="cart is empty" styleName="Medium" />)}
                </div>
            </div>
        );
    }
}

MiniCart.propTypes = {
    clearCart: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    cart: PropTypes.array.isRequired,
    totalPrice: PropTypes.object.isRequired,
    totalQuantity: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    cartProductList: PropTypes.array.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible,
    cart: selectCart(state),
    totalPrice: selectTotalPrice(state),
    totalQuantity: selectTotalQuantity(state),
    cartProductList: state.cart.value
});

const MiniCartWithRouter = withRouter(MiniCart);
export default connect(mapStateToProps, { clearCart, toggleModalVisibility })(MiniCartWithRouter);
