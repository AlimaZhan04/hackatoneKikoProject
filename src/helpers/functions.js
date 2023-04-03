export function getCountProductsInCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart ? cart.cosmetics.length : 0;
}

export const calcSubPrice = (product) => +product.count * product.item.price;

export const calcTotalPrice = (cosmetics) => {
  return cosmetics.reduce((acc, curr) => {
    return (acc += curr.subPrice);
  }, 0);
};
