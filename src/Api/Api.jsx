export const BASE_URL = `https://ecommerce-dot-code.vercel.app/api`;

export const API = {
  /* ======= Authentication ======= */
  register: `${BASE_URL}/auth/signup`,
  login: `${BASE_URL}/auth/login`,
  forgotPassword: `${BASE_URL}/auth/forgotPassword`,
  ResetCode: `${BASE_URL}/auth/verifyResetCode`,
  resetPassword: `${BASE_URL}/auth/resetPassword`,

  /* ======= wishlist======= */
  getWishlist: `${BASE_URL}/wishlist`,
  /* ======= cart ======= */
  getUserCart: `${BASE_URL}/cart`,
  /* ======= order ======= */
  getUserOrders: (userId) => `${BASE_URL}/user/${userId}/order`,
  createCashOrder: `${BASE_URL}/order`,
  createInstantPayment: `${BASE_URL}/order/checkout`,

  /* ======= Contact Us ======= */
  contactUs: `${BASE_URL}/contact`,
  /* ======= User ======= */
  getUser: `${BASE_URL}/user/showbyid`,

  /* ======= Category ======= */
  getAllCategories: `${BASE_URL}/category/`,
  /* ======= Product ======= */
  product: `${BASE_URL}/product/`,
  getProductData: (id) => `${BASE_URL}/product/${id}`,
  product : `${BASE_URL}/product/`,
  getSubcategoryProducts: (subcategoryId) => `${BASE_URL}/subcategory/${subcategoryId}`,
  /* ======= subcategory ======= */
  getAllSubcategories: `${BASE_URL}/subcategory/`,
  getSpecificSubcategory: (subcategoryId) =>
    `${BASE_URL}/subcategory/${subcategoryId}`,
  getAllSubcategoriesForSpecificCategory: (categoryId) =>
    `${BASE_URL}/category/${categoryId}/subcategories/`,
};
