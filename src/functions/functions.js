export const shortenText = (text, maxLength=150) => {
    if (text && text.length > maxLength) {
        return text.substr(0, maxLength) + '...';
    }
    return text;
};

export const addToCart = (item) => {
    console.log(item);
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];
    // Check if item is already in cart
    const index = cart.findIndex((cartItem) => cartItem.title === item.title && cartItem.type === item.type);
    if (index === -1) {
        cart.push(item);
    } else return alert(`'${item.title}' is already in your cart`);

    console.log(cart);
    localStorage.setItem("Cart", JSON.stringify(cart));
};