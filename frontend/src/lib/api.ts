import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse, Portfolio } from '../../../shared/src/types/index.js';

const API_BASE_URL = '/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success && response.data) {
      this.setToken(response.data.token);
      return response.data;
    }

    throw new Error(response.error || 'Registration failed');
  }

  async verifyToken(token: string) {
    const response = await this.request('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });

    return response.success ? response.data : null;
  }

  async getProfile() {
    const response = await this.request('/users/profile');
    return response.success ? response.data : null;
  }

  async getPortfolio(): Promise<Portfolio> {
    const response = await this.request<Portfolio>('/transactions/portfolio');
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch portfolio');
  }

  async mintStablecoin(amount: number) {
    const response = await this.request('/transactions/mint', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });

    if (response.success) {
      return response.data;
    }

    throw new Error(response.error || 'Mint transaction failed');
  }

  async redeemStablecoin(amount: number) {
    const response = await this.request('/transactions/redeem', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });

    if (response.success) {
      return response.data;
    }

    throw new Error(response.error || 'Redeem transaction failed');
  }

  logout() {
    this.setToken(null);
  }
}

export const apiClient = new ApiClient();