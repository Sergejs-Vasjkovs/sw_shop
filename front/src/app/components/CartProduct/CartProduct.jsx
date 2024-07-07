import PropTypes from "prop-types";
import React, { Component } from "react";
import CounterButtons from "../../UI/CounterButtons/CounterButtons";
import ImageSlider from "../ImageSlider/ImageSlider";
import MainStyles from "./CartProduct.module.css";
import MiniStyles from "./MiniCartProduct.module.css";
import PreviewImage from "../../UI/PreviewImage/PreviewImage";
import groupAttributes from "../../utils/groupAttributes";
import OptionsPreview from "../../UI/OptionsPreview/OptionsPreview";

class CartProduct extends Component {
    render() {
        const { name, brand, attributes, prices, input, gallery, quantity, time, id } = this.props.product;
        const { isMini } = this.props;
        const styles = isMini ? MiniStyles : MainStyles;
        const groupedAttributes = groupAttributes(attributes);
        return (
            <div className={styles.wrapper} data-testid={`cart-item-attribute-${id}`}>
                <div className={styles.width}>
                    <h3 className={styles.name}>{name}</h3>
                    <h2 className={styles.brand}>{brand}</h2>
                    <p className={styles.price}>{prices[0].symbol} {prices[0].amount}</p>
                    {groupedAttributes.map(att => (
                        <div key={att.id} >
                            <p className={styles.attribute} data-testid={`cart-item-attribute-${att.id.toLowerCase()}`}>{att.id}</p>
                            <div className={styles.group}>
                                {att.items.map((item, index) =>
                                    <OptionsPreview
                                        name={name}
                                        attributesID={att.id}
                                        key={index}
                                        attributes={item}
                                        input={input} />
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div>
                <CounterButtons isMini={isMini} quantity={quantity} time={time} />
                {isMini ? <PreviewImage gallery={gallery} /> : <ImageSlider gallery={gallery} />}
            </div>
        );
    }
}

CartProduct.propTypes = {
    product: PropTypes.object.isRequired,
    input: PropTypes.object,
    isMini: PropTypes.bool
};

CartProduct.defaultProps = {
    isMini: false
};

export default CartProduct;
