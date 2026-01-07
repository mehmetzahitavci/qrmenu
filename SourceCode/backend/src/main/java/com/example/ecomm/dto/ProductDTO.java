package com.example.ecomm.dto;

public class ProductDTO {
    private Long id;
    private String name;
    private String nameEN;
    private String description;
    private String descriptionEN;
    private Double price;
    private String imageUrl;
    private String details;
    private Long categoryId;
    private boolean featured;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, String nameEN, String description, String descriptionEN,
            Double price, String imageUrl, String details,
            Long categoryId, boolean featured) {
        this.id = id;
        this.name = name;
        this.nameEN = nameEN;
        this.description = description;
        this.descriptionEN = descriptionEN;
        this.price = price;
        this.imageUrl = imageUrl;
        this.details = details;
        this.categoryId = categoryId;
        this.featured = featured;
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

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }
}
