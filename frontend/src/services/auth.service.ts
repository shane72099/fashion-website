import { AuthResponse, User } from '@/types';
import api from '@/config/api';

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user';

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    return response.data;
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', { name, email, password });
    this.setToken(response.data.token);
    this.setUser(response.data.user);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    // Clear axios default headers
    delete api.defaults.headers.common['Authorization'];
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    // Set token in axios default headers
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  private setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Token refresh logic can be added here
  async refreshToken(): Promise<void> {
    try {
      const response = await api.post<AuthResponse>('/auth/refresh-token');
      this.setToken(response.data.token);
    } catch (error) {
      this.logout();
      throw error;
    }
  }
}

export const authService = new AuthService(); 