import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./ProductAttributes.module.css";
import RadioInput from "../../UI/RadioInput/RadioInput";
import { connect } from "react-redux";
import Button from "../../UI/Button/Button";
import { addItem } from "../../../store/cartSlice";
import groupAttributes from "../../utils/groupAttributes";
import parse from "html-react-parser";
import { toggleModalVisibility } from "../../../store/modalSlice";

export class ProductAttributes extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        this.props.product.attributes.forEach(attribute => {
            const key = attribute.attribute_name + ": " + this.props.product.name;
            this.setState(prevState => {
                return {
                    ...prevState,
                    [key]: ""
                };
            });
        });
    }

    formOnSubmitHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            ...this.props.product,
            input: this.state
        };
        this.props.addItem(newProduct);
        this.props.toggleModalVisibility();
    };

    onChangeHandler = (input) => {
        this.setState(prevState => {
            return {
                ...prevState,
                ...input
            };
        });
    };

    render() {
        const { name, brand, attributes, prices, description, inStock } = this.props.product;
        const groupedAttributes = groupAttributes(attributes);

        const result = description.split("\\n").map(line => [`${line} <br />`]).join(" ");

        return (

            <div className={styles.product} data-testid='product-description'>
                <h3 className={styles.name}>{name}</h3>
                <h2 className={styles.brand}>{brand}</h2>
                <form onSubmit={this.formOnSubmitHandler}>
                    {groupedAttributes.map(att => (
                        <div key={att.id} data-testid={`product-attribute-${att.id.toLowerCase()}`}>
                            <p className={styles.attribute}>{att.id}</p>
                            <div className={styles.group}>
                                {att.items.map((item, index) =>
                                    <RadioInput key={index} attributesID={att.id} attributes={item} name={name} onChange={this.onChangeHandler} />
                                )}
                            </div>
                        </div>
                    ))
                    }
                    <p className={styles.attribute}>Price</p>
                    <p className={styles.price}>{prices[0].symbol} {prices[0].amount} </p>
                    <Button data-testid="add-to-cart" type="onSubmit" isActive={inStock} />
                </form>
                <div className={styles.description}>{parse(result)}</div>
            </div>
        );
    }
}

ProductAttributes.propTypes = {
    product: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    toggleModalVisibility: PropTypes.func.isRequired
};

export default connect(null, { addItem, toggleModalVisibility })(ProductAttributes);
