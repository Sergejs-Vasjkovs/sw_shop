import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { ApolloConsumer } from "@apollo/client";
import { fetchProductsSuccess } from "../../../store/slices/productsSlice";
import { fetchCategoriesSuccess } from "../../../store/slices/categoriesSlice";
import queries from "../../GraphQL/queries";
import Loader from "../../UI/Loader/Loader";
import NavBar from "../../components/NavigationBar/NavBar/NavBar";
import ErrorPage from "../ErrorPage/ErrorPage";
import ProductDescription from "../../components/ProductDescription/ProductDescription";
import ProductList from "../../components/ProductsList/ProductsList";
import PageNoteFound from "../PageNotFound/PageNotFound";
import styles from "./MainPage.module.css";
import Modal from "../../UI/Modal/Modal";
import MiniCart from "../../components/MiniCart/MiniCart";

class MainPage extends Component {
    state = {
        loading: true,
        error: null
    };

    render() {
        const { loading, error } = this.state;
        const { isVisible } = this.props;

        if (error) {
            return <ErrorPage />;
        }

        return (
            <ApolloConsumer>
                {client => {
                    if (loading) {
                        client.query({
                            query: queries.mainQuery
                        }).then(({ data }) => {
                            this.props.dispatch(fetchProductsSuccess(data.products));
                            this.props.dispatch(fetchCategoriesSuccess(data.categories));
                            this.setState({ loading: false });
                        }).catch(error => {
                            this.setState({ error, loading: false });
                        });

                        return <Loader />;
                    }

                    return (
                        <div className={styles.container}>
                            <NavBar />
                            <main>
                                {isVisible && (
                                    <Modal>
                                        <MiniCart />
                                    </Modal>
                                )}
                                <Switch>
                                    <Route
                                        path="/category/:category?/:id?"
                                        component={ProductDescription}
                                    />
                                    <Route
                                        exact
                                        path="/:category?"
                                        component={ProductList}
                                    />
                                    <Route component={PageNoteFound} />
                                </Switch>
                            </main>
                        </div>
                    );
                }}
            </ApolloConsumer>
        );
    }
}

MainPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    client: PropTypes.object
};

const mapStateToProps = state => ({
    isVisible: state.modal.isVisible
});

export default connect(mapStateToProps)(MainPage);
