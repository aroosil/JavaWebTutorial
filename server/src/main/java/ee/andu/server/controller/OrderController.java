package ee.andu.server.controller;

import ee.andu.server.entity.Order;
import ee.andu.server.entity.Person;
import ee.andu.server.entity.Product;
import ee.andu.server.repository.OrderRepository;
import ee.andu.server.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("orders")
    public Iterable<Order> findAll(){
        return orderRepository.findAll();
    }

    @GetMapping("orders/{id}")
    public Order findById(@PathVariable Long id){
        return orderRepository.findById(id).orElseThrow();
    }

    @PostMapping("orders")
    public Order createOrder(@RequestBody List<Product> products){

        Order order = new Order();
        order.setProducts(products);
        order.setCreated(new Date());
        order.setTotal(orderService.calculateCartSum(products));
        order.setPerson(new Person()); // TODO: teeme autentimise

        return orderRepository.save(order);
    }

    @GetMapping("orders-by-date")
    public List<Order> findByDate(@RequestParam Date startDate, @RequestParam Date endDate){
        return orderRepository.findAllByCreatedBetween(startDate, endDate);
    }
}
