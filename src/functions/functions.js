const serviceIds = {
    "Book": 1,
    "Movie": 2,
    "Manga": 3,
    "Game": 4,
    "Music": 5,
    "Order": 6
};

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

export const setServiceId = (array) => {
    let newArray = [];

    array.forEach((item) => {            
        item.serviceId = serviceIds[item.type];
        newArray.push(item);
    });

    return newArray;
};   

export const showError = (error) => {
    console.log(error);
    return <div className="alert alert-danger" role="alert">{error}</div>;
};