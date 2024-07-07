import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { setCurrentValue } from "../../../../store/categoriesSlice";
import shopLogo from "../../../assets/shop_logo.svg";
import styles from "./NavLogo.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

class NavLogo extends Component {
    onClickHandle = () => {
        this.props.setCurrentValue(this.props.categories[0]);
    };

    render() {
        return (
            <Link to={"/"} className={styles.logo} onClick={this.onClickHandle} >
                <img src={shopLogo} alt="Home page button" />
            </Link>
        );
    }
}

NavLogo.propTypes = {
    setCurrentValue: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    categories: state.categories.value
});

const NavLogoWithRouter = withRouter(NavLogo);
export default connect(mapStateToProps, { setCurrentValue })(NavLogoWithRouter);
