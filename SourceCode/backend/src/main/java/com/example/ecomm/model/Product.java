package com.example.ecomm.model;

import jakarta.persistence.*;

/**
 * =============================================================================
 * PRODUCT ENTITY - JPA Database Model
 * =============================================================================
 * This class represents the 'products' table in the database.
 * JPA (Java Persistence API) maps this class to database rows.
 * 
 * DATABASE TABLE: products
 * 
 * ANNOTATIONS EXPLAINED:
 * - @Entity: Marks this class as a JPA entity (database table)
 * - @Table: Specifies the actual table name in database
 * - @Id: Marks the primary key field
 * - @GeneratedValue: Auto-generates ID values (auto-increment)
 * - @Column: Customizes column mapping (name, type, etc.)
 * 
 * FIELDS:
 * - id: Primary key, auto-incremented
 * - name: Product name in Turkish
 * - nameEN: Product name in English (for bilingual support)
 * - description: Product description in Turkish
 * - descriptionEN: Product description in English
 * - price: Product price in TL
 * - imageUrl: Path to product image
 * - featured: Whether product appears in "Popular" section
 * - categoryId: Foreign key to category (1=Coffee, 2=Cold Drinks, etc.)
 * - details: Extended product details (TEXT field)
 * =============================================================================
 */
@Entity
@Table(name = "products")
public class Product {

    // Primary key with auto-increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // Turkish product name
    private String nameEN; // English product name (for language toggle)
    private String description; // Turkish description
    private String descriptionEN; // English description
    private Double price; // Price in TL
    private String imageUrl; // Image path (e.g., /images/coffee.png)
    private boolean featured; // If true, shows in "Popular Products" section

    // Category ID references the frontend categories array
    // 1=Coffee, 2=Cold Drinks, 3=Desserts, 4=Burgers, 5=Salads, 6=Pizza
    @Column(name = "category_id")
    private Long categoryId;

    // Extended details text (can be long, so using TEXT type)
    @Column(columnDefinition = "TEXT")
    private String details;

    // Default constructor required by JPA
    public Product() {
    }

    // ==========================================================================
    // GETTERS AND SETTERS - Required for JPA and JSON serialization
    // ==========================================================================

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameEN() {
        return nameEN;
    }

    public void setNameEN(String nameEN) {
        this.nameEN = nameEN;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionEN() {
        return descriptionEN;
    }

    public void setDescriptionEN(String descriptionEN) {
        this.descriptionEN = descriptionEN;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
