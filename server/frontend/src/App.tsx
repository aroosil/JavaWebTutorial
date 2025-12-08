import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  active: boolean;
  category: Category;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selection, setSelection] = useState<Product[]>([]);

  // onLoad funktsioon - > l2heb 1x k2ima
  // TODO: promise handling? retry 3 times
  useEffect(() => {
    function doFetch(
      address: string,
      retries: number,
      action: (arg: any) => void
    ) {
      fetch(address)
        .then((result) => {
          if (result && result.ok) {
            return result.json();
          }
          console.log("got null");
          if (retries <= 0) {
            return;
          }
          console.log(address, ". Retries left: ", retries);
          retries -= 1;
        })
        .then((json) => {
          if (json == null) {
            return;
          }
          action(json);
        })
        .catch();
    }

    doFetch("http://localhost:8080/products", 3, setProducts);
    doFetch("http://localhost:8080/categories", 3, setCategories);
  }, []);

  return (
    <>
      <b>Categories</b>

      <select>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <br></br>
      <b>Products</b>

      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}

      {/* 




      */}

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onMouseDown={() => setCount((count) => count + 2)}
          onMouseUp={() => setCount((count) => count - 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
