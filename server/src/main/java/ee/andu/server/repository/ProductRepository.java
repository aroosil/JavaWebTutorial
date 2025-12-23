package ee.andu.server.repository;

import ee.andu.server.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {

    List<Product> findByActiveTrueOrderByIdAsc();
    List<Product> findByOrderByIdAsc();
}
