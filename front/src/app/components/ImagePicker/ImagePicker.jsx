import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ImagePicker.module.css";

export class ImagePicker extends Component {
    constructor() {
        super();
        this.state = {
            image: 0
        };
    }

    imageClickHandler = (index) => {
        this.setState({ image: index });
    };

    arrowClickHandler = (arrow) => {
        if (arrow === "right") {
            if (this.state.image === this.props.gallery.length - 1) {
                this.setState(({
                    image: 0
                }));
            } else {
                this.setState((prevState) => ({
                    image: prevState.image + 1
                }));
            }
        } else {
            if (this.state.image === 0) {
                this.setState(({
                    image: this.props.gallery.length - 1
                }));
            } else {
                this.setState((prevState) => ({
                    image: prevState.image - 1
                }));
            }
        }
    };

    render() {
        const { gallery, inStock } = this.props;

        return (
            <div className={styles.wrapper} data-testid='product-gallery'>
                <div className={styles.small}>
                    {gallery.map((img, index) =>
                        <img
                            className={`${styles.preview} ${index === this.state.image ? styles.selected : ""}`}
                            key={index}
                            src={img.image_url}
                            onClick={() => this.imageClickHandler(index)} />)}
                </div>
                <div className={styles.big}>
                    {inStock ? null : <div className={styles.outofstock}>out of stock</div>}
                    <div className={styles.btnLeft} onClick={() => this.arrowClickHandler("left")}>
                        <i className={styles.arrowLeft}></i>
                    </div>
                    <img src={gallery[this.state.image].image_url} />
                    <div className={styles.btnRight} onClick={() => this.arrowClickHandler("right")}>
                        <i className={styles.arrowRight}></i>
                    </div>
                </div>
            </div>
        );
    }
}

ImagePicker.propTypes = {
    gallery: PropTypes.array.isRequired,
    inStock: PropTypes.bool.isRequired
};

export default ImagePicker;
