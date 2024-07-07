import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentValue } from "../../../../store/categoriesSlice";
import styles from "./NavButton.module.css";
import { withRouter } from "react-router";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class NavButton extends Component {
    onClickHandle = (category) => {
        this.props.setCurrentValue(category);
        if (this.props.location.pathname !== "/") {
            this.props.history.push("/");
        }
    };

    render() {
        const { category, currentCategory } = this.props;
        const isActiveClass = category.name === currentCategory.name;
        return (
            <Link
                to={`/${category.name}`}
                className={`${styles.navigation} ${isActiveClass ? styles.active : ""}`}
                data-testid={`${isActiveClass ? "active-category-link" : "category-link"}`}>
                <div
                    onClick={() => this.onClickHandle(category)}>
                    <span>{category.name}</span>
                </div>
            </Link>
        );
    }
}

NavButton.propTypes = {
    category: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    setCurrentValue: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentCategory: state.categories.currentValue
});

const NavButtonWithRouter = withRouter(NavButton);
export default connect(mapStateToProps, { setCurrentValue })(NavButtonWithRouter);
