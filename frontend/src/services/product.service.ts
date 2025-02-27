import { Product } from '@/types';
import api from '@/config/api';

class ProductService {
  private readonly baseUrl = '/products';

  async getProducts(params?: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number }> {
    const response = await api.get(this.baseUrl, { params });
    return response.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await api.get(`${this.baseUrl}/category/${category}`);
    return response.data;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get(`${this.baseUrl}/search`, {
      params: { q: query },
    });
    return response.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get(`${this.baseUrl}/featured`);
    return response.data;
  }

  async getNewArrivals(): Promise<Product[]> {
    const response = await api.get(`${this.baseUrl}/new-arrivals`);
    return response.data;
  }
}

export const productService = new ProductService(); 