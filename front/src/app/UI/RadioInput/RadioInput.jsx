import React, { Component } from "react";
import PropTypes from "prop-types";
import MainStyles from "./RadioInput.module.css";
import MiniStyles from "./MiniRadioInput.module.css";

export class RadioInput extends Component {
    onChangeHandler = (event) => {
        this.props.onChange({ [event.target.getAttribute("data-attribute")]: event.target.value });
    };

    render() {
        const { attributes, input, name, attributesID, isMini, time } = this.props;
        const styles = isMini ? MiniStyles : MainStyles;

        const isColor = attributesID === "Color";
        const inputStyleClass = isColor ? styles.color : styles.title;
        const inputUniqueName = `isMini: ${isMini}, ${attributesID}: ${name} ${time}`;
        const inputUniqueData = `${attributesID}: ${name}`;
        const isChecked = attributes.attribute_value === input?.[inputUniqueData];
        const dataTestId = `product-attribute-${attributesID.toLowerCase()}-${attributes.attribute_value}`;
        return (
            <div className={styles.container} data-testid={dataTestId}>
                <input type="radio" id={attributes.attribute_value}
                    name={inputUniqueName}
                    data-attribute={inputUniqueData}
                    value={attributes.attribute_value}
                    defaultChecked={isChecked}
                    required
                    onChange={this.onChangeHandler} />
                <div className={inputStyleClass} style={{ backgroundColor: attributes.attribute_value }}>
                    <label htmlFor={attributes.attribute_value}>{isColor ? "" : attributes.attribute_display}</label>
                </div>
            </div>
        );
    }
}

RadioInput.propTypes = {
    attributes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    attributesID: PropTypes.string.isRequired,
    isMini: PropTypes.bool,
    input: PropTypes.object,
    time: PropTypes.number
};

RadioInput.defaultProps = {
    isMini: false
};

export default RadioInput;
