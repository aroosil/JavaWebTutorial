import { useState } from "react";
import type { Product } from "../../models/product";

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    active: false,
    category: {
      id: 1,
      name: "",
    },
  });

  function addProduct() {
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  return (
    <div>
      <label>Name</label>
      <input
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        type="text"
      ></input>

      <label>Price</label>
      <input
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        type="number"
      ></input>

      <label>Stock</label>
      <input
        onChange={(e) =>
          setProduct({ ...product, stock: Number(e.target.value) })
        }
        type="number"
      ></input>

      <label>Active</label>
      <input
        onChange={(e) => setProduct({ ...product, active: e.target.checked })}
        type="checkbox"
      ></input>

      <select></select>

      <button onClick={() => addProduct()}>Add product</button>
    </div>
  );
}

export default AddProduct;
