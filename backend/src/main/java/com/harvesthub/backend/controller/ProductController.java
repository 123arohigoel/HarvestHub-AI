package com.harvesthub.backend.controller;

import com.harvesthub.backend.entity.product;
import com.harvesthub.backend.repositry.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostConstruct
    public void initData() {
        if (productRepository.count() == 0) {
            product p1 = new product();
            p1.setName("Organic Wheat");
            p1.setCategory("Grains");
            p1.setPrice(45.0);
            p1.setQuantity(100);
            productRepository.save(p1);

            product p2 = new product();
            p2.setName("Fresh Tomatoes");
            p2.setCategory("Vegetables");
            p2.setPrice(30.0);
            p2.setQuantity(50);
            productRepository.save(p2);
        }
    }

    // GET all products
    @GetMapping
    public List<product> getAllProducts() {
        return productRepository.findAll();
    }

    // POST create product
    @PostMapping
    public product createProduct(@RequestBody product newProduct) {
        return productRepository.save(newProduct);
    }

    // PUT update product
    @PutMapping("/{id}")
    public ResponseEntity<product> updateProduct(@PathVariable Long id, @RequestBody product updatedProduct) {
        Optional<product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            product existing = optionalProduct.get();
            existing.setName(updatedProduct.getName());
            existing.setCategory(updatedProduct.getCategory());
            existing.setPrice(updatedProduct.getPrice());
            existing.setQuantity(updatedProduct.getQuantity());
            return ResponseEntity.ok(productRepository.save(existing));
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}