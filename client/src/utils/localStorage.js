const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const getUserFromLocalStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const addCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

const removeCartFromLocalStorage = () => {
  localStorage.removeItem("cart");
};
const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  addCartToLocalStorage,
  getCartFromLocalStorage,
  removeCartFromLocalStorage,
  removeUserFromLocalStorage,
};
