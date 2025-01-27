import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ApolloConsumer } from "@apollo/client";
import styles from "./ProductCard.module.css";
import basketImg from "../../assets/empty_cart_white.svg";
import { addProductToCart } from "../../../store/slices/cartSlice";
import queries from "../../GraphQL/queries";
import groupAttributes from "../../utils/groupAttributes";
import toKebabCase from "../../utils/toKebabCase";
import { Link } from "react-router-dom";
import { toggleModalVisibility } from "../../../store/slices/modalSlice";

class ProductCard extends Component {
    addProductToCartHandler = async (client, id) => {
        try {
            const response = await client.query({
                query: queries.productById,
                variables: { id }
            });

            const product = response.data.product;
            const attributes = groupAttributes(product.attributes);
            const input = {};
            attributes.forEach(attribute => {
                const key = `${attribute.id}: ${product.name}`;
                input[key] = attribute.items[0].attribute_value;
            });

            const newProduct = {
                ...product,
                input
            };
            this.props.addProductToCart(newProduct);
            this.props.toggleModalVisibility();
        } catch (error) {
            console.error(error.message);
        }
    };

    render() {
        const { product, categories } = this.props;
        const currentCategory = categories.find(category => category.id === product.category_id);
        const { gallery, name, inStock, prices, id } = product;
        const testIdName = toKebabCase(name);

        return (
            <ApolloConsumer>
                {client => (
                    <div className={styles.card} data-testid={`product-${testIdName}`}>
                        <Link to={`category/${currentCategory.name}/${id}`}>
                            <div className={styles.image}>
                                <img src={gallery[0].image_url} alt={name} />
                                {inStock ? null : <div className={styles.outofstock}>out of stock</div>}
                            </div>
                            <p className={styles.name}>{name}</p>
                            <p className={styles.price}>{prices[0].symbol} {prices[0].amount}</p>
                        </Link>
                        {inStock && (
                            <div
                                className={styles.basket}
                                onClick={() => this.addProductToCartHandler(client, id)}
                            >
                                <img
                                    className={styles.icon}
                                    src={basketImg}
                                    alt="shopping icon"
                                />
                            </div>
                        )}
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    addProductToCart: PropTypes.func.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired,
    categories: PropTypes.array
};

const mapStateToProps = state => ({
    categories: state.categories.value
});

export default connect(
    mapStateToProps,
    { addProductToCart, toggleModalVisibility }
)(ProductCard);
