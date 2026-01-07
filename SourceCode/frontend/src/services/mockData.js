/**
 * =============================================================================
 * API SERVICE LAYER (mockData.js)
 * =============================================================================
 * This file handles all API communication between frontend and Spring Boot backend.
 * It provides a service layer that fetches products from the backend and includes
 * fallback mock data if the backend is unavailable.
 * 
 * KEY CONCEPTS:
 * - Uses fetch() API for HTTP requests to Spring Boot backend
 * - Normalizes backend response to match frontend data structure
 * - Provides fallback data when backend connection fails
 * =============================================================================
 */

// =============================================================================
// STATIC DATA - Categories available in the menu
// =============================================================================
// Each category has: id, Turkish name (name), English name (nameEN), URL slug,
// Material UI icon name, image path, and description
export const categories = [
    { id: 1, name: 'Kahve', nameEN: 'Coffee', slug: 'coffee', icon: 'Coffee', image: '/images/ClassicCoffe.png', description: 'Özenle hazırlanmış kahve çeşitlerimiz' },
    { id: 2, name: 'Soğuk İçecekler', nameEN: 'Cold Drinks', slug: 'cold-drinks', icon: 'LocalBar', image: '/images/Beverages.png', description: 'Serinletici soğuk içecekler' },
    { id: 3, name: 'Tatlılar', nameEN: 'Desserts', slug: 'desserts', icon: 'Cake', image: '/images/Dessert.png', description: 'Taze tatlılar' },
    { id: 4, name: 'Burgerler & Sandviçler', nameEN: 'Burgers', slug: 'burgers', icon: 'LunchDining', image: '/images/BurgersAndSandwiches.png', description: 'Lezzetli burgerler' },
    { id: 5, name: 'Salatalar', nameEN: 'Salads', slug: 'salads', icon: 'RestaurantMenu', image: '/images/FreshSalads.png', description: 'Taze salatalar' },
    { id: 6, name: 'Pizza & Makarna', nameEN: 'Pizza', slug: 'pizza-pasta', icon: 'LocalPizza', image: '/images/Pizza.png', description: 'İtalyan lezzetleri' },
];

// CAFE INFORMATION - Restaurant details displayed in the UI
export const cafeInfo = {
    name: 'Akasya Kitchen & Bistro',
    address: 'Atatürk Mah. Lale Sok. No:32, Kadıköy/İstanbul',
    phone: '+90 216 123 55 67',
    openHours: '09:00 - 23:00',
    social: { instagram: 'https://instagram.com' },
    vatIncluded: true
};

// TABLE INFO HELPER - Returns table information for a given table number
export const getTableInfo = (tableNumber) => ({
    tableNumber: tableNumber || 5,
    capacity: 4,
    isAvailable: true,
});

// ADMIN PANEL DATA - Order status labels and mock orders for admin dashboard

// Bilingual order status labels for display in admin panel
export const orderStatusLabels = {
    tr: { pending: 'Beklemede', preparing: 'Hazırlanıyor', prepared: 'Hazır', served: 'Servis Edildi' },
    en: { pending: 'Pending', preparing: 'Preparing', prepared: 'Ready', served: 'Served' },
};

// Sample orders for testing admin panel functionality
export const mockOrders = [
    {
        id: 1001, tableNumber: 5, totalPrice: 215.00, status: 'pending', createdAt: '2026-01-01T11:30:00', customerNote: 'Az şekerli olsun',
        items: [{ productId: 2, productName: 'Cappuccino', quantity: 2, price: 65.00 }]
    },
    {
        id: 1002, tableNumber: 3, totalPrice: 415.00, status: 'preparing', createdAt: '2026-01-01T11:45:00', customerNote: '',
        items: [{ productId: 20, productName: 'Cheeseburger', quantity: 2, price: 145.00 }]
    }
];

// BACKEND INTEGRATION

// Spring Boot backend base URL - ensure backend is running on this port
const API_BASE_URL = "http://localhost:8080";

// Fallback product shown when backend connection fails
const MOCK_BACKUP = [
    { id: 1, categoryId: 1, name: 'Fallback Espresso (No Backend)', price: 45.00, description: 'Backend connection failed', image: '/images/Doubleespresso07.11.2025_11zon.png', isAvailable: true }
];

// Export fallback products for backward compatibility with existing code
export const products = MOCK_BACKUP;

/**
 * Normalize Product Data
 * Transforms backend response format to match frontend expectations.
 * 
 * Backend returns:  { imageUrl, featured, ... }
 * Frontend expects: { image, isPopular, ... }
 * 
 * @param {Object} p - Product object from backend
 * @returns {Object} - Normalized product object for frontend
 */
const normalizeProduct = (p) => ({
    id: p.id,
    name: p.name,
    nameEN: p.nameEN,           // English product name
    description: p.description,
    descriptionEN: p.descriptionEN,  // English description
    price: p.price,
    image: p.imageUrl || p.image,    // Backend uses imageUrl, frontend expects image
    categoryId: p.categoryId,
    featured: p.featured,
    isPopular: p.featured,           // Alias: 'featured' in backend = 'isPopular' in frontend
    details: p.details,
    isAvailable: p.isAvailable !== false  // Defaults to true if not specified
});

// API SERVICE OBJECT - All methods for communicating with backend
export const mockApiService = {

    /**
     * Get Categories
     * Returns the static list of menu categories.
     * Categories are not stored in backend for this project.
     * @returns {Promise} - { data: Category[], success: boolean }
     */
    getCategories: () => {
        return new Promise((resolve) => resolve({ data: categories, success: true }));
    },

    /**
     * Get All Products (FROM BACKEND)
     * Fetches all products from Spring Boot backend via REST API.
     * Falls back to MOCK_BACKUP if backend is unavailable.
     * 
     * Endpoint: GET http://localhost:8080/api/products
     * 
     * @returns {Promise} - { data: Product[], success: boolean }
     */
    getAllProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            if (!response.ok) throw new Error('Connection error');
            const data = await response.json();
            // Transform backend data to frontend format
            const normalizedData = data.map(normalizeProduct);
            console.log(" Products fetched and normalized from backend:", normalizedData);
            return { data: normalizedData, success: true };
        } catch (error) {
            console.error("Backend error:", error);
            return { data: MOCK_BACKUP, success: false };
        }
    },

    /**
     * Get Products By Category
     * Fetches all products and filters by categoryId on the frontend.
     * 
     * @param {number} categoryId - Category ID to filter by
     * @returns {Promise} - { data: Product[], success: boolean }
     */
    getProductsByCategory: async (categoryId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            const allProducts = await response.json();
            const normalizedProducts = allProducts.map(normalizeProduct);
            // Filter products by categoryId if provided
            const filtered = categoryId
                ? normalizedProducts.filter(p => p.categoryId === categoryId)
                : normalizedProducts;
            return { data: filtered, success: true };
        } catch (error) {
            return { data: [], success: false };
        }
    },

    /**
     * Get Single Product By ID
     * Fetches a specific product from backend.
     * 
     * Endpoint: GET http://localhost:8080/api/products/{id}
     * 
     * @param {number} id - Product ID
     * @returns {Promise} - { data: Product, success: boolean }
     */
    getProductById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
            if (response.ok) {
                const data = await response.json();
                return { data: normalizeProduct(data), success: true };
            }
            throw new Error();
        } catch (e) { return { success: false, message: 'Not found' }; }
    },

    /**
     * Get Popular Products
     * Fetches products where featured=true from backend.
     * 
     * @returns {Promise} - { data: Product[], success: boolean }
     */
    getPopularProducts: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products`);
            const data = await response.json();
            const normalizedData = data.map(normalizeProduct);
            // Filter only featured/popular products
            return { data: normalizedData.filter(p => p.featured), success: true };
        } catch (e) { return { data: [], success: false }; }
    },

    /**
     * Get Orders (Mock)
     * Returns mock orders for admin panel testing.
     * Real implementation would fetch from backend.
     */
    getOrders: () => Promise.resolve({ data: mockOrders, success: true }),

    /**
     * Get Cafe Info
     * Returns static cafe information.
     */
    getCafeInfo: () => Promise.resolve({ data: cafeInfo, success: true }),

    /**
     * Place Order (Demo)
     * Mock function - in production, would POST to backend.
     */
    placeOrder: () => Promise.resolve({ success: true, message: 'Order Received (Demo)' }),

    /**
     * Update Order Status (Mock)
     * Mock function for admin panel.
     */
    updateOrderStatus: () => Promise.resolve({ success: true })
};

export default mockApiService;