const initialTotalPrice = {
    totalAmount: 0,
    currency: "USD",
    symbol: "$"
};

export function calculateTotalPrice(items, initialPrice = initialTotalPrice) {
    let totalAmount = 0;
    let currency = initialPrice.currency;
    let symbol = initialPrice.symbol;

    items.forEach(product => {
        product.prices.forEach(price => {
            totalAmount += product.quantity * price.amount;
            currency = price.currency;
            symbol = price.symbol;
        });
    });

    return {
        symbol,
        totalAmount,
        currency
    };
};
