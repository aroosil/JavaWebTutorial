package ee.andu.server.controller;

import ee.andu.server.entity.Product;
import ee.andu.server.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // BASE URL + API endpoint
    // localhost:8080/hi
    @GetMapping("hi")
    public String hello()
    {
        return "Hello World";
    }

    @GetMapping("products")
    public List<Product> getProducts()
    {
        return productRepository.findAll(); // SELECT * FROM products
    }

    @PostMapping("products")
    public List<Product> saveProduct(@RequestBody Product product)
    {
        if (product.getId() != null)
        {
            throw new RuntimeException("Cannot add with Id");
        }
        productRepository.save(product);
        return productRepository.findAll(); // SELECT * FROM products
    }

    // DELETE localhost:8080/products/id
    @DeleteMapping("products/{id}")
    public List<Product> deleteProductById(@PathVariable Long id)
    {
        productRepository.deleteById(id);
        return productRepository.findAll(); // SELECT * FROM products
    }

    // DELETE localhost:8080/products?id=2
    @DeleteMapping("products")
    public List<Product> deleteProduct(@RequestParam Long id)
    {
        productRepository.deleteById(id);
        return productRepository.findAll(); // SELECT * FROM products
    }

    @GetMapping("products/{id}")
    public Product getProductById(@PathVariable Long id)
    {
        return productRepository.findById(id).orElseThrow();
    }

    @PutMapping("products")
    public List<Product> updateProduct(@RequestBody Product product)
    {
        if (product.getId() == null)
        {
            throw new RuntimeException("Cannot update product without Id");
        }
        productRepository.save(product);
        return productRepository.findAll(); // SELECT * FROM products
    }

    // erinev lähenemine
    //    @RequestMapping(value = "hi2", method = RequestMethod.GET)
    //    public String hello2()
    //    {
    //        return "Hello World 2";
    //    }
}
