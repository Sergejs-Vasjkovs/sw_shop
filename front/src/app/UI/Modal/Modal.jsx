import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class ModalWindow extends Component {
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
        const newTopPosition = scrollTop < initialTopPosition ? `${initialTopPosition}px` : `${scrollTop}px`;
        if (this.state.topPosition !== newTopPosition) {
            this.setState({ topPosition: newTopPosition });
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.modal} style={{ top: this.state.topPosition }}>
                    <div data-testid="cart-overlay">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

ModalWindow.propTypes = {
    children: PropTypes.node.isRequired,
    initialTopPosition: PropTypes.number
};

ModalWindow.defaultProps = {
    initialTopPosition: 80
};

const portalElement = document.getElementById("overlays");

class Modal extends Component {
    render() {
        return (
            <>
                {ReactDOM.createPortal(<Backdrop />, portalElement)}
                {ReactDOM.createPortal(
                    <ModalWindow>
                        {this.props.children}
                    </ModalWindow>,
                    portalElement
                )}
            </>
        );
    }
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    initialTopPosition: PropTypes.number
};

export default Modal;
