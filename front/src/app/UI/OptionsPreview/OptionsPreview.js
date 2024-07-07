import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./OptionsPreview.module.css";

class OptionsPreview extends Component {
    render() {
        const { input, attributes, attributesID, name } = this.props;
        const isColor = attributesID === "Color";

        const inputUniqueData = `${attributesID}: ${name}`;
        const isChecked = attributes.attribute_value === input?.[inputUniqueData];
        let style = styles.value;
        if (isChecked) {
            style = `${styles.value} ${styles.selected}`;
        }

        if (isChecked && isColor) {
            style = `${styles.value} ${styles.outline}`;
        }
        const dataTestID = isChecked ? `cart-item-attribute-${attributesID.toLowerCase()}-${attributes.attribute_value}-selected` : `cart-item-attribute-${attributesID}-${attributesID}`;
        return (
            <div className={style} data-testid={dataTestID}
                style={{ backgroundColor: attributes.attribute_value }}>
                {isColor ? "" : attributes.attribute_display}
            </div>
        );
    }
}

OptionsPreview.propTypes = {
    attributesID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired
};

export default OptionsPreview;
