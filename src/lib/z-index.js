/**
 * Z-Index Scale
 * 
 * Centralized z-index management to prevent layering conflicts
 * Use these constants throughout the application for consistent stacking
 */

export const Z_INDEX = {
  // Background elements
  BACKGROUND: 0,
  STAR_BACKGROUND: 1,
  
  // Content layers
  CONTENT: 10,
  PROGRAMMING_ICONS: 20,
  
  // Navigation layers
  NAVBAR: 50,
  MOBILE_MENU_OVERLAY: 100,
  MOBILE_MENU_BUTTON: 150,
  
  // UI Controls (highest priority)
  THEME_TOGGLE: 200,
  TOAST: 300,
  MODAL: 400,
  TOOLTIP: 500,
};

export default Z_INDEX;