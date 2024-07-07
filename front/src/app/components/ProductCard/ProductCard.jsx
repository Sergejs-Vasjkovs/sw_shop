import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./ProductCard.module.css";
import basketImg from "../../assets/empty_cart_white.svg";
import { Link } from "react-router-dom";
import { addItem } from "../../../store/cartSlice";
import { compose } from "redux";
import { graphql } from "@apollo/client/react/hoc";
import queries from "../../GraphQL/queries";
import groupAttributes from "../../utils/groupAttributes";
import toKebabCase from "../../utils/toKebabCase";

class ProductCard extends Component {
    addProductToCartHandler = async (id) => {
        try {
            const response = await this.props.productById.refetch({ id });
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
            this.props.addItem(newProduct);
        } catch (error) {
            console.error(error.message);
        }
    };

    render() {
        const { product, categories } = this.props;
        const currentCategory = categories.find(category => category.id === product.category_id.toString());
        const { gallery, name, inStock, prices, id } = product;
        const testIdName = toKebabCase(name);
        return (
            <Link className={styles.card} data-testid={`product-${testIdName}`}
                to={`category/${currentCategory.name}/${id}`}>
                <div className={styles.image}>
                    <img src={gallery[0].image_url} alt={name} />
                    {inStock ? null : <div className={styles.outofstock}>out of stock</div>}
                </div>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>{prices[0].symbol} {prices[0].amount}</p>
                {inStock
                    ? <div className={styles.basket} onClick={() => this.addProductToCartHandler(id)}>
                        <img className={styles.icon} src={basketImg} alt="shopping icon" />
                    </div>
                    : null}
            </Link>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    productById: PropTypes.object.isRequired,
    categories: PropTypes.array
};

const mapStateToProps = state => ({
    categories: state.categories.value
});

export default connect(mapStateToProps, { addItem })(compose(
    graphql(queries.productById, { options: ({ id }) => ({ variables: { id } }), name: "productById" })
)(ProductCard));
