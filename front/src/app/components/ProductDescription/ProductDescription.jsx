import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { graphql } from "@apollo/client/react/hoc";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ImagePicker from "../ImagePicker/ImagePicker";
import styles from "./ProductDescription.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";

class ProductDescription extends Component {
    render() {
        const { data } = this.props;

        if (data.loading) {
            return <Loader />;
        }

        if (data.error) {
            return <ErrorPage />;
        }

        const { product } = data;
        const { gallery, inStock } = product;
        return (
            <div className={styles.wrapper} data-testid={`product-attribute-${product.id}`}>
                <ImagePicker gallery={gallery} inStock={inStock} />
                <ProductAttributes product={product} />
            </div>
        );
    }
}

ProductDescription.propTypes = {
    data: PropTypes.object.isRequired
};

export default (compose(
    graphql(queries.productById, {
        options: (props) => ({ variables: { id: props.match.params.id } })
    })
)(ProductDescription));
