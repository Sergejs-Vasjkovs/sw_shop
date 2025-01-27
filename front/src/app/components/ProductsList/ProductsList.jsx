import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../../UI/Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsList.module.css";

class ProductsList extends Component {
    render() {
        const { currentCategory, products } = this.props;
        if (products.length === 0 && Object.keys(currentCategory).length === 0) {
            return <Loader />;
        }

        const filteredProducts = products.filter(product => product.category_id === currentCategory.id);

        return (
            <>
                <h2 className={styles.category}>{currentCategory.name}</h2>
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        {(filteredProducts.length ? filteredProducts : products).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

ProductsList.propTypes = {
    products: PropTypes.array,
    currentCategory: PropTypes.object
};

const mapStateToProps = state => ({
    products: state.products.data,
    currentCategory: state.categories.currentValue
});

export default connect(mapStateToProps)(ProductsList);
