import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./MiniCart.module.css";
import Button from "../../UI/Button/Button";
import ButtonDisabled from "../../UI/Button/ButtonDisabled";
import { clearCart } from "../../../store/cartSlice";
import { toggleModalVisibility } from "../../../store/modalSlice";
import { Mutation } from "@apollo/client/react/components";
import { CREATE_ORDER } from "../../GraphQL/queries";
import CompletedOrder from "../../UI/CompletedOrder/CompletedOrder";
import MiniCartOrderList from "../MiniCartOrderList/MiniCartOrderList";

class MiniCart extends Component {
    constructor() {
        super();
        this.state = {
            countdown: 3,
            isVisible: true
        };
    }

    componentDidMount() {
        if (this.props.isVisible) {
            document.body.style.overflowY = "clip";
        }
    }

    componentWillUnmount() {
        document.body.style.overflowY = "scroll";
        clearInterval(this.interval);
    }

    placeOrderHandler = (createOrders) => {
        const newOrder = this.props.cart.map(order => ({
            product_id: order.id,
            options: JSON.stringify(order.input),
            quantity: order.quantity
        }));

        createOrders({ variables: { options: newOrder } })
            .then(response => {
                console.warn("Order placed:", response.data.createOrders);
                this.redirect();
            })
            .catch(error => {
                console.error("Error placing order:", error);
            });
    };

    redirect = () => {
        this.setState({
            isVisible: false
        });
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

        return (
            <div>
                {this.state.isVisible
                    ? <MiniCartOrderList
                        totalPrice={totalPrice}
                        cartProductList={cartProductList}
                        totalQuantity={totalQuantity} /> :
                    <CompletedOrder seconds={this.state.countdown} />}
                <div className={styles.buttons}>
                    {cartProductList.length !== 0
                        ? (<Mutation mutation={CREATE_ORDER}>
                            {(createOrders, { loading, error }) => (
                                <>
                                    {!loading && !error && <Button name="PLACE ORDER" styleName="Medium" clickOnButton={() => this.placeOrderHandler(createOrders)} />}
                                    {loading && <ButtonDisabled name="LOADING" styleName="Medium" />}
                                    {error && <ButtonDisabled name="SOME ERROR" styleName="Medium" />}
                                </>
                            )}
                        </Mutation>
                        )
                        : (
                            <ButtonDisabled name="PLACE ORDER" styleName="Medium" />
                        )}
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
    cart: state.cart.value,
    totalPrice: state.cart.totalPrice,
    totalQuantity: state.cart.totalQuantity,
    cartProductList: state.cart.value
});

const MiniCartWithRouter = withRouter(MiniCart);
export default connect(mapStateToProps, { clearCart, toggleModalVisibility })(MiniCartWithRouter);
