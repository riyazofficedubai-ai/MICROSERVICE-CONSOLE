import axios from 'axios';

const PRODUCT_API_URL =
  process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'http://localhost:3001';
const ORDER_API_URL =
  process.env.NEXT_PUBLIC_ORDER_API_URL || 'http://localhost:3002';

export const productApi = axios.create({
  baseURL: PRODUCT_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const orderApi = axios.create({
  baseURL: ORDER_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Product endpoints ──────────────────────────────────────────────────────

export interface ProductPayload {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  weight?: number;
  tags?: string[];
}

export const productsService = {
  list: (params?: Record<string, any>) =>
    productApi.get('/products', { params }).then((r) => r.data),
  get: (id: string) => productApi.get(`/products/${id}`).then((r) => r.data),
  create: (payload: ProductPayload) =>
    productApi.post('/products', payload).then((r) => r.data),
  update: (id: string, payload: Partial<ProductPayload>) =>
    productApi.patch(`/products/${id}`, payload).then((r) => r.data),
  remove: (id: string) => productApi.delete(`/products/${id}`).then((r) => r.data),
  stats: () => productApi.get('/products/stats').then((r) => r.data),
};

// ─── Order endpoints ────────────────────────────────────────────────────────

export interface OrderItemPayload {
  productId: string;
  quantity: number;
  discount?: number;
}

export interface OrderPayload {
  customerId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItemPayload[];
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  notes?: string;
}

export const ordersService = {
  list: (params?: Record<string, any>) =>
    orderApi.get('/orders', { params }).then((r) => r.data),
  get: (id: string) => orderApi.get(`/orders/${id}`).then((r) => r.data),
  getWithProducts: (id: string) =>
    orderApi.get(`/orders/${id}/details`).then((r) => r.data),
  create: (payload: OrderPayload) =>
    orderApi.post('/orders', payload).then((r) => r.data),
  update: (id: string, payload: Record<string, any>) =>
    orderApi.patch(`/orders/${id}`, payload).then((r) => r.data),
  remove: (id: string) => orderApi.delete(`/orders/${id}`).then((r) => r.data),
  stats: () => orderApi.get('/orders/stats').then((r) => r.data),
};
