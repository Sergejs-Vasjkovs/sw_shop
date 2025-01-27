import React, { Component } from "react";
import PropTypes from "prop-types";
import { ApolloConsumer } from "@apollo/client";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import ImagePicker from "../ImagePicker/ImagePicker";
import styles from "./ProductDescription.module.css";
import ProductAttributes from "../ProductAttributes/ProductAttributes";

class ProductDescription extends Component {
    state = {
        loading: true,
        error: null,
        product: null
    };

    render() {
        const { loading, error, product } = this.state;
        const { match } = this.props;

        if (!match.params.id) {
            return null;
        }

        if (error) {
            return <ErrorPage />;
        }

        return (
            <ApolloConsumer>
                {client => {
                    if (loading) {
                        client.query({
                            query: queries.productById,
                            variables: { id: match.params.id }
                        }).then(({ data }) => {
                            this.setState({
                                loading: false,
                                product: data.product
                            });
                        }).catch(error => {
                            this.setState({ error, loading: false });
                        });

                        return <Loader />;
                    }

                    const { gallery, inStock } = product;
                    return (
                        <div className={styles.wrapper} data-testid={`product-attribute-${product.id}`}>
                            <ImagePicker gallery={gallery} inStock={inStock} />
                            <ProductAttributes product={product} />
                        </div>
                    );
                }}
            </ApolloConsumer>
        );
    }
}

ProductDescription.propTypes = {
    match: PropTypes.object.isRequired
};

export default ProductDescription;
