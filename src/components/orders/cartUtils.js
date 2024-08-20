export const parsePrice = (price) => {
    if (typeof price === 'string') {
        price = price.replace(/[^\d.-]/g, '');
    }
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
};

export const calculateTotalPricePerItem = (price, quantity) => {
    const parsedPrice = parsePrice(price);
    return (parsedPrice * quantity).toFixed(2);
};

export const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0).toFixed(2);
};