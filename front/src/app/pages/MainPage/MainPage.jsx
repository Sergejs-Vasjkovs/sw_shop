import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { fetchProductsSuccess } from "../../../store/productsSlice";
import { fetchCategoriesSuccess } from "../../../store/categoriesSlice";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import NavBar from "../../components/NavigationBar/NavBar/NavBar";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import ProductList from "../../components/ProductsList/ProductsList";
import PageNoteFound from "../../pages/PageNotFound/PageNotFound";
import styles from "./MainPage.module.css";
import Modal from "../../UI/Modal/Modal";
import MiniCart from "../../components/MiniCart/MiniCart";

class MainPage extends Component {
    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mainQuery.loading && !this.props.mainQuery.loading) {
            this.updateData();
        }
    }

    updateData = () => {
        const { dispatch, mainQuery } = this.props;

        if (mainQuery && !mainQuery.loading && !mainQuery.error) {
            const { products, categories } = mainQuery;
            if (products && categories) {
                dispatch(fetchProductsSuccess(products));
                dispatch(fetchCategoriesSuccess(categories));
            }
        }
    };

    render() {
        const { mainQuery } = this.props;
        if (mainQuery.loading) {
            return <Loader />;
        }

        if (mainQuery.error) {
            return <ErrorPage />;
        }

        return (
            <div className={styles.container}>
                <NavBar />
                <main>
                    {this.props.isVisible
                        ? <Modal>
                            <MiniCart />
                        </Modal>
                        : null}
                    <Switch>
                        <Route path="/category/:category?/:id?" component={ProductDescription} />
                        <Route exact path="/:category?" component={ProductList} />
                        <Route component={PageNoteFound} />
                    </Switch>
                </main>
            </div>
        );
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    mainQuery: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.object,
        products: PropTypes.array,
        categories: PropTypes.array
    }).isRequired
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible
});

export default connect(mapStateToProps)(compose(
    graphql(queries.mainQuery, { name: "mainQuery" })
)(MainPage));
