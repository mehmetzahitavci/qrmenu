import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Get initial table number from localStorage
const getInitialTableNumber = () => {
    const saved = localStorage.getItem('akasya_table_number');
    return saved ? parseInt(saved, 10) : null;
};

// Initial state
const initialState = {
    items: [],
    tableNumber: getInitialTableNumber(),
    language: 'tr', // 'tr' or 'en'
    currentOrder: null, // For order tracking
    hasSelectedTable: getInitialTableNumber() !== null,
};

// Action types
const CartActionTypes = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    UPDATE_NOTE: 'UPDATE_NOTE',
    CLEAR_CART: 'CLEAR_CART',
    SET_TABLE_NUMBER: 'SET_TABLE_NUMBER',
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_CURRENT_ORDER: 'SET_CURRENT_ORDER',
    CLEAR_CURRENT_ORDER: 'CLEAR_CURRENT_ORDER',
};

// Reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case CartActionTypes.ADD_ITEM: {
            const { product, note } = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === product.id && item.note === note
            );

            if (existingItemIndex > -1 && !note) {
                // Item exists without note, increase quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };
                return { ...state, items: updatedItems };
            }

            // New item or item with different note
            return {
                ...state,
                items: [...state.items, { ...product, quantity: 1, note: note || '' }],
            };
        }

        case CartActionTypes.REMOVE_ITEM: {
            return {
                ...state,
                items: state.items.filter((_, index) => index !== action.payload),
            };
        }

        case CartActionTypes.UPDATE_QUANTITY: {
            const { index, quantity } = action.payload;

            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((_, i) => i !== index),
                };
            }

            return {
                ...state,
                items: state.items.map((item, i) =>
                    i === index ? { ...item, quantity } : item
                ),
            };
        }

        case CartActionTypes.UPDATE_NOTE: {
            const { index, note } = action.payload;
            return {
                ...state,
                items: state.items.map((item, i) =>
                    i === index ? { ...item, note } : item
                ),
            };
        }

        case CartActionTypes.CLEAR_CART: {
            return { ...state, items: [] };
        }

        case CartActionTypes.SET_TABLE_NUMBER: {
            localStorage.setItem('akasya_table_number', action.payload.toString());
            return {
                ...state,
                tableNumber: action.payload,
                hasSelectedTable: true,
            };
        }

        case CartActionTypes.SET_LANGUAGE: {
            return { ...state, language: action.payload };
        }

        case CartActionTypes.SET_CURRENT_ORDER: {
            return { ...state, currentOrder: action.payload };
        }

        case CartActionTypes.CLEAR_CURRENT_ORDER: {
            return { ...state, currentOrder: null };
        }

        default:
            return state;
    }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Add item to cart with optional note
    const addToCart = useCallback((product, note = '') => {
        dispatch({ type: CartActionTypes.ADD_ITEM, payload: { product, note } });
    }, []);

    // Remove item from cart by index
    const removeFromCart = useCallback((index) => {
        dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: index });
    }, []);

    // Update item quantity by index
    const updateQuantity = useCallback((index, quantity) => {
        dispatch({
            type: CartActionTypes.UPDATE_QUANTITY,
            payload: { index, quantity },
        });
    }, []);

    // Update item note by index
    const updateItemNote = useCallback((index, note) => {
        dispatch({
            type: CartActionTypes.UPDATE_NOTE,
            payload: { index, note },
        });
    }, []);

    // Clear cart
    const clearCart = useCallback(() => {
        dispatch({ type: CartActionTypes.CLEAR_CART });
    }, []);

    // Set table number
    const setTableNumber = useCallback((tableNumber) => {
        dispatch({ type: CartActionTypes.SET_TABLE_NUMBER, payload: tableNumber });
    }, []);

    // Toggle language
    const toggleLanguage = useCallback(() => {
        dispatch({
            type: CartActionTypes.SET_LANGUAGE,
            payload: state.language === 'tr' ? 'en' : 'tr',
        });
    }, [state.language]);

    // Set specific language
    const setLanguage = useCallback((lang) => {
        dispatch({ type: CartActionTypes.SET_LANGUAGE, payload: lang });
    }, []);

    // Set current order (for tracking)
    const setCurrentOrder = useCallback((order) => {
        dispatch({ type: CartActionTypes.SET_CURRENT_ORDER, payload: order });
    }, []);

    // Clear current order
    const clearCurrentOrder = useCallback(() => {
        dispatch({ type: CartActionTypes.CLEAR_CURRENT_ORDER });
    }, []);

    // Calculate total items count
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

    // Calculate total price
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Get item quantity by product ID
    const getItemQuantity = useCallback(
        (productId) => {
            const matchingItems = state.items.filter((item) => item.id === productId);
            return matchingItems.reduce((sum, item) => sum + item.quantity, 0);
        },
        [state.items]
    );

    // Check if item is in cart
    const isInCart = useCallback(
        (productId) => {
            return state.items.some((item) => item.id === productId);
        },
        [state.items]
    );

    const value = {
        // State
        items: state.items,
        tableNumber: state.tableNumber,
        language: state.language,
        currentOrder: state.currentOrder,
        hasSelectedTable: state.hasSelectedTable,
        totalItems,
        totalPrice,

        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemNote,
        clearCart,
        setTableNumber,
        toggleLanguage,
        setLanguage,
        setCurrentOrder,
        clearCurrentOrder,

        // Helpers
        getItemQuantity,
        isInCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export default CartContext;
