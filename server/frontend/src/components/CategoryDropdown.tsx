import Dropdown from "react-bootstrap/Dropdown";
import type { Category } from "../models/category";
import { ButtonGroup, DropdownButton } from "react-bootstrap";

function CategoryDropdown(
  categories: Category[],
  selectFunc: (arg: String) => void
) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item
            key={category.id}
            onClick={() => {
              selectFunc(category.name);
            }}
          >
            {category.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoryDropdown;
