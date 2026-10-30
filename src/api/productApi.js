import { apiClient } from './client';

export const productApi = {
  /**
   * Fetch paginated list of products with optional category and search filters
   * @param {{ category?: string, search?: string, page?: number, limit?: number }} params
   * @returns {Promise<{ success: boolean, products: Array, pagination: Object }>}
   */
  async getProducts({ category, search, page = 1, limit = 20 } = {}) {
    const query = new URLSearchParams();
    if (category && category !== 'All' && category !== 'All Finds') {
      query.set('category', category);
    }
    if (search && search.trim()) {
      query.set('search', search.trim());
    }
    if (page) query.set('page', String(page));
    if (limit) query.set('limit', String(limit));

    const queryString = query.toString();
    const endpoint = queryString ? `/api/products?${queryString}` : '/api/products';

    return await apiClient(endpoint, {
      method: 'GET',
    });
  },

  /**
   * Fetch single product by ID
   * @param {number|string} id
   * @returns {Promise<{ success: boolean, product: Object }>}
   */
  async getProductById(id) {
    return await apiClient(`/api/products/${id}`, {
      method: 'GET',
    });
  },

  /**
   * Fetch list of categories
   * @returns {Promise<{ success: boolean, categories: Array }>}
   */
  async getCategories() {
    return await apiClient('/api/products/categories', {
      method: 'GET',
    });
  },

  /**
   * Normalize backend product format to the UI model structure
   * @param {Object} raw
   */
  normalizeProduct(raw) {
    if (!raw) return null;
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description || '',
      price: typeof raw.price === 'string' ? parseFloat(raw.price) : Number(raw.price || 0),
      category: raw.category?.name || 'Artisanal Craft',
      sellerName: raw.seller?.name || 'Rawayat Verified Artisan',
      sellerCity: raw.seller?.city || 'Pakistan',
      inStock: (raw.stock ?? 1) > 0,
      stockCount: raw.stock ?? 10,
      images: raw.images && raw.images.length > 0
        ? raw.images.map((img) => (typeof img === 'string' ? img : img.url))
        : ['/src/assets/images/multan_blue_pottery_vase_1792146048032.jpg'],
      rating: 5.0,
      reviewCount: 1,
    };
  },
};

