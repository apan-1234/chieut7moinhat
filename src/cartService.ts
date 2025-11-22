export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
  };
  
  export const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  // Gửi event thông báo cart thay đổi để Layout tự cập nhật
  window.dispatchEvent(new Event("cartUpdated"));
  };
  
  export const addToCart = (product: any, quantity = 1) => {
  let cart = getCart();
  const index = cart.findIndex((item: any) => item.id === product.id);
  if (index >= 0) cart[index].quantity += quantity;
  else cart.push({ ...product, quantity });
  
  saveCart(cart);
  };
  
  export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item: any) => item.id !== id);
  saveCart(cart);
  };
  
  export const clearCart = () => {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
  };
  