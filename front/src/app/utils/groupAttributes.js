const groupAttributes = (attributes) => {
    const groupedAttributes = {};

    attributes.forEach(attribute => {
        if (!groupedAttributes[attribute.attribute_name]) {
            groupedAttributes[attribute.attribute_name] = [];
        }
        groupedAttributes[attribute.attribute_name].push({
            attribute_name: attribute.attribute_name,
            attribute_value: attribute.attribute_value,
            attribute_display: attribute.attribute_display
        });
    });

    const result = Object.keys(groupedAttributes).map(attributeName => ({
        id: attributeName,
        items: groupedAttributes[attributeName]
    }));

    return result;
};

export default groupAttributes;
