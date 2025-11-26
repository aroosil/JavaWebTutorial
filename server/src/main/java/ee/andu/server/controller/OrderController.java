package ee.andu.server.controller;

import ee.andu.server.entity.Order;
import ee.andu.server.entity.Person;
import ee.andu.server.entity.Product;
import ee.andu.server.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("orders")
    public Iterable<Order> findAll(){
        return orderRepository.findAll();
    }

    @GetMapping("orders")
    public Order findById(@RequestParam Long id){
        return orderRepository.findById(id).orElseThrow();
    }

    @PostMapping("orders")
    public Order createOrder(@RequestBody List<Product> products){

        Order order = new Order();
        order.setProducts(products);
        order.setCreated(new Date());
        order.setTotal(10); // TODO: arvuta hind toodetest
        order.setPerson(new Person());

        return orderRepository.save(order);
    }

    @GetMapping("orders")
    public List<Order> findByDate(@RequestParam Date startDate, @RequestParam Date endDate){
        return orderRepository.findAllByCreatedBetween(startDate, endDate);
    }
}
