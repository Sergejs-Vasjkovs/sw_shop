import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./Backdrop.module.css";
import { toggleModalVisibility } from "../../../store/modalSlice";

class Backdrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topPosition: `${props.initialTopPosition}px`
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.updateTopPosition();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll() {
        this.updateTopPosition();
    }

    updateTopPosition() {
        const { initialTopPosition } = this.props;
        const scrollTop = window.scrollY;
        const newTopPosition = scrollTop > initialTopPosition ? "0px" : `${initialTopPosition - scrollTop}px`;
        if (this.state.topPosition !== newTopPosition) {
            this.setState({ topPosition: newTopPosition });
        }
    }

    toggleModalHandler = () => {
        this.props.toggleModalVisibility();
    };

    render() {
        return (
            <div className={styles.backdrop} onClick={this.toggleModalHandler} data-testid="cart-btn">
                <div className={styles.background} style={{ top: this.state.topPosition }}>

                </div>
            </div>
        );
    }
}

Backdrop.propTypes = {
    toggleModalVisibility: PropTypes.func.isRequired,
    initialTopPosition: PropTypes.number
};

Backdrop.defaultProps = {
    initialTopPosition: 80
};

export default connect(null, { toggleModalVisibility })(Backdrop);
