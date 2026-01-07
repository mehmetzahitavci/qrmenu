package com.example.ecomm.controller;

import com.example.ecomm.dto.ProductDTO;
import com.example.ecomm.model.Product;
import com.example.ecomm.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * =============================================================================
 * PRODUCT CONTROLLER - REST API Endpoints
 * =============================================================================
 * This controller handles all HTTP requests related to products.
 * It exposes REST endpoints that the React frontend consumes.
 * 
 * ENDPOINTS:
 * - GET /api/products → Returns all products
 * - GET /api/products/{id} → Returns single product by ID
 * - GET /api/products/top → Returns featured/popular products
 * 
 * ANNOTATIONS EXPLAINED:
 * - @RestController: Combines @Controller + @ResponseBody, returns JSON
 * directly
 * - @RequestMapping: Base URL path for all endpoints in this controller
 * - @CrossOrigin("*"): Allows requests from any origin (CORS enabled for React)
 * =============================================================================
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*") // Allow React frontend (localhost:3000) to call this API
public class ProductController {

    // Dependency injection of ProductRepository for database access
    private final ProductRepository repository;

    /**
     * Constructor-based Dependency Injection
     * Spring automatically injects ProductRepository instance
     * This is the recommended way to inject dependencies in Spring Boot
     */
    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * Convert Product entity to ProductDTO (Data Transfer Object)
     * DTO is used to control which fields are exposed to the frontend
     * This prevents exposing internal entity structure directly
     * 
     * @param p Product entity from database
     * @return ProductDTO for JSON response
     */
    private ProductDTO toDTO(Product p) {
        return new ProductDTO(
                p.getId(),
                p.getName(),
                p.getNameEN(), // English product name
                p.getDescription(),
                p.getDescriptionEN(), // English description
                p.getPrice(),
                p.getImageUrl(),
                p.getDetails(),
                p.getCategoryId(),
                p.isFeatured());
    }

    /**
     * GET /api/products/top
     * Returns only featured/popular products, sorted by ID descending
     * Used by frontend to display "Popular Products" section
     * 
     * @return List of featured ProductDTOs
     */
    @GetMapping("/top")
    public List<ProductDTO> getTopFeatured() {
        return repository.findByFeaturedTrueOrderByIdDesc().stream()
                .map(this::toDTO) // Convert each Product to ProductDTO
                .collect(Collectors.toList());
    }

    /**
     * GET /api/products
     * Returns all products from the database
     * Main endpoint used by React MenuPage to load all menu items
     * 
     * @return List of all ProductDTOs
     */
    @GetMapping
    public List<ProductDTO> getAll() {
        return repository.findAll().stream()
                .map(this::toDTO) // Convert each Product to ProductDTO using Java Stream API
                .collect(Collectors.toList());
    }

    /**
     * GET /api/products/{id}
     * Returns a single product by its ID
     * Used when viewing product details or adding to cart
     * 
     * @param id Product ID from URL path
     * @return ProductDTO for the requested product
     * @throws NoSuchElementException if product not found
     */
    @GetMapping("/{id}")
    public ProductDTO getOne(@PathVariable Long id) {
        Product p = repository.findById(id).orElseThrow(); // Throws exception if not found
        return toDTO(p);
    }

}
