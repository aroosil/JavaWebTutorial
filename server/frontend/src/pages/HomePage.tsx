import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import type { Category } from "../models/category";
import BasicDropdown from "../components/BasicDropdown";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selected, setSelected] = useState<Product[]>([]);

  function filterProducts(category: String): void {
    if (category == "ALL") {
      setSelected(products);
      return;
    }
    var newSelection: Product[] = [];

    products.forEach((product) => {
      if (product.category.name == category) {
        newSelection[newSelection.length] = product;
      }
    });

    setSelected(newSelection);
  }

  // onLoad funktsioon - > l2heb 1x k2ima
  // TODO: promise handling? retry 3 times
  useEffect(() => {
    function doFetch(
      address: string,
      retries: number,
      action: (arg: any) => void,
      isProducts?: boolean
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
          console.log(action);
          if (isProducts) {
            setSelected(json);
          }
        })
        .catch();
    }

    doFetch("http://localhost:8080/products", 3, setProducts, true);
    doFetch("http://localhost:8080/categories", 3, setCategories);
  }, []);
  return (
    <>
      <div>HomePage</div>
      <div>
        <b>Categories</b>
        <br></br>
        <BasicDropdown></BasicDropdown>
        <select
          onChange={(event) => {
            filterProducts(event.target.value);
          }}
        >
          <option key={0} value={"ALL"}>
            {"ALL"}
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {/* {['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Danger'].map(
        (variant) => (
          <DropdownButton
            as={ButtonGroup}
            key={variant}
            id={`dropdown-variants-${variant}`}
            variant={variant.toLowerCase()}
            title={variant}
          >
            <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Active Item
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
          </DropdownButton>
        ),
      )} */}

        <br></br>
        <b>Products</b>

        {selected.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </>
  );
}

export default HomePage;
