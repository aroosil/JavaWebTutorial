package ee.andu.server.service;

import ee.andu.server.entity.Product;
import ee.andu.server.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    public double calculateCartSum(List<Product> products) {
        double sum = 0;
        for (Product product : products) {
            Product dbProduct = productRepository.findById(product.getId()).orElseThrow();
            sum += dbProduct.getPrice();
        }
        return sum;
    }

}
