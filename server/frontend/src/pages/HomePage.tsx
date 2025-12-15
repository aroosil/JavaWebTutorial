import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import type { Category } from "../models/category";
import CategoryDropdown from "../components/CategoryDropdown";
import { DoGet } from "../helpers/DoGet";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selected, setSelected] = useState<Product[]>([]);

  function filterProducts(categoryName: String): void {
    if (categoryName == "ALL") {
      setSelected(products);
      return;
    }
    var newSelection: Product[] = [];

    products.forEach((product) => {
      if (product.category.name == categoryName) {
        newSelection[newSelection.length] = product;
      }
    });

    setSelected(newSelection);
  }

  // onLoad funktsioon - > l2heb 1x k2ima
  // TODO: promise handling? retry 3 times
  useEffect(() => {
    var productsPromise = DoGet(
      "http://localhost:8080/products",
      3,
      setProducts,
      "GET PRODUCTS: "
    );
    productsPromise.then((result) => {
      setSelected(result);
    });

    var categoryPromise = DoGet(
      "http://localhost:8080/categories",
      3,
      setCategories,
      "GET CATEGORIES: "
    );
    categoryPromise.then((result) => {
      result[0] = { id: 0, name: "ALL" }; // add an option to select all
      setCategories(result);
    });
  }, []);

  function addToCart(product: Product) {
    const productsInCart: Product[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    productsInCart.push(product);
    localStorage.setItem("cart", JSON.stringify(productsInCart));
  }

  return (
    <>
      <div>HomePage</div>
      <div>
        <b>Categories</b>
        <br></br>
        {CategoryDropdown(categories, filterProducts)}

        <br></br>
        <b>Products</b>

        {selected.map((product) => (
          <div key={product.id}>
            <div>{product.name}</div>
            <div>{product.price}€</div>
            <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
