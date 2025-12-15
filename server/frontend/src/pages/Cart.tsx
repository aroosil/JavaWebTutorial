import { useEffect, useState } from "react";
import type { Product } from "../models/product";

type CartProduct = {
  product: Product;
  count: number;
};

function Cart() {
  const [cart, _setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [countedItems, setCountedItems] = useState<Map<String, CartProduct>>();

  function refreshCart(products: Product[]) {}

  return (
    <div>
      {cart.map((product) => (
        <div>
          <span>{product.name} - </span>
          <span>{product.price}€</span>
        </div>
      ))}
    </div>
  );
}

export default Cart;
