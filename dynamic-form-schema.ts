'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Grid,
  TextField,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { productsService, ordersService } from '@/lib/api';
import { monoFont } from '@/lib/theme';

const PAYMENT_METHODS = ['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'CASH_ON_DELIVERY', 'WALLET'];

const STATUS_COLORS: Record<string, any> = {
  PENDING: 'warning',
  CONFIRMED: 'info',
  PROCESSING: 'info',
  SHIPPED: 'primary',
  DELIVERED: 'success',
  CANCELLED: 'error',
  REFUNDED: 'default',
};

interface CartLine {
  productId: string;
  quantity: number;
}

export default function OrdersPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [address, setAddress] = useState({
    fullName: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: '',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsService.list(),
        ordersService.list(),
      ]);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
    } catch {
      setError(
        'Could not reach the microservices. Ensure both Product Service (3001) and Order Service (3002) are running.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) {
        return prev.map((c) =>
          c.productId === productId ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const updateQty = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.productId === productId ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0),
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  const cartTotal = cart.reduce((sum, c) => {
    const product = products.find((p) => p.id === c.productId);
    return sum + (product ? product.price * c.quantity : 0);
  }, 0);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError('Add at least one product to the order.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await ordersService.create({
        customerId: `cust-${customerEmail.split('@')[0]}`,
        customerEmail,
        customerName,
        items: cart.map((c) => ({ productId: c.productId, quantity: c.quantity })),
        paymentMethod,
        shippingAddress: { ...address, fullName: customerName },
      });
      setSuccessMsg('Order created successfully — stock updated in Product Service.');
      setTimeout(() => setSuccessMsg(null), 4000);
      setCart([]);
      loadData();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to create order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 5, md: 8 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Chip
            label="ORDER SERVICE · PORT 3002"
            size="small"
            sx={{ alignSelf: 'flex-start', bgcolor: 'primary.main', color: 'white', fontFamily: monoFont }}
          />
          <Typography variant="h3" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Orders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Placing an order calls the Product Service over TCP to check and decrement stock.
          </Typography>
        </Stack>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 3 }}>{successMsg}</Alert>}

        {loading ? (
          <Stack alignItems="center" sx={{ py: 6 }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider', position: 'sticky', top: 88 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  New Order
                </Typography>

                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                  1. Pick products
                </Typography>
                <Stack spacing={1} sx={{ mb: 3, maxHeight: 220, overflowY: 'auto' }}>
                  {products.map((p) => (
                    <Stack
                      key={p.id}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {p.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${p.price} · {p.stock} in stock
                        </Typography>
                      </Box>
                      <Button size="small" onClick={() => addToCart(p.id)} disabled={p.stock === 0}>
                        Add
                      </Button>
                    </Stack>
                  ))}
                </Stack>

                {cart.length > 0 && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                      Cart
                    </Typography>
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      {cart.map((c) => {
                        const product = products.find((p) => p.id === c.productId);
                        if (!product) return null;
                        return (
                          <Stack key={c.productId} direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2">{product.name}</Typography>
                            <Stack direction="row" alignItems="center" spacing={0.5}>
                              <IconButton size="small" onClick={() => updateQty(c.productId, -1)}>
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                {c.quantity}
                              </Typography>
                              <IconButton size="small" onClick={() => updateQty(c.productId, 1)}>
                                <AddIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" onClick={() => removeFromCart(c.productId)}>
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Stack>
                        );
                      })}
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Subtotal: <strong>${cartTotal.toFixed(2)}</strong>
                    </Typography>
                  </>
                )}

                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                  2. Customer details
                </Typography>
                <Box component="form" onSubmit={handleCreateOrder}>
                  <Stack spacing={2}>
                    <TextField
                      label="Customer Name"
                      required
                      fullWidth
                      size="small"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <TextField
                      label="Email"
                      type="email"
                      required
                      fullWidth
                      size="small"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                    <TextField
                      select
                      label="Payment Method"
                      fullWidth
                      size="small"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      {PAYMENT_METHODS.map((m) => (
                        <MenuItem key={m} value={m}>
                          {m.replace(/_/g, ' ')}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      label="Address Line 1"
                      required
                      fullWidth
                      size="small"
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                    />
                    <Stack direction="row" spacing={1.5}>
                      <TextField
                        label="City"
                        required
                        fullWidth
                        size="small"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      />
                      <TextField
                        label="State"
                        required
                        fullWidth
                        size="small"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      />
                    </Stack>
                    <Stack direction="row" spacing={1.5}>
                      <TextField
                        label="Postal Code"
                        required
                        fullWidth
                        size="small"
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      />
                      <TextField
                        label="Phone"
                        required
                        fullWidth
                        size="small"
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      />
                    </Stack>
                    <Button type="submit" variant="contained" size="large" disabled={submitting}>
                      {submitting ? 'Placing order…' : 'Place Order'}
                    </Button>
                  </Stack>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order History ({orders.length})
              </Typography>
              {orders.length === 0 ? (
                <Paper elevation={0} sx={{ p: 4, textAlign: 'center', border: '1px dashed', borderColor: 'divider' }}>
                  <Typography color="text.secondary">No orders yet.</Typography>
                </Paper>
              ) : (
                <Stack spacing={2}>
                  {orders.map((o) => (
                    <Paper key={o.id} elevation={0} sx={{ p: 2.5, border: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ fontFamily: monoFont }}>
                            {o.orderNumber}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {o.customerName} · {new Date(o.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                        <Chip
                          label={o.status}
                          size="small"
                          color={STATUS_COLORS[o.status] || 'default'}
                        />
                      </Stack>
                      <Stack spacing={0.5} sx={{ mb: 1.5 }}>
                        {o.items.map((item: any, idx: number) => (
                          <Stack key={idx} direction="row" justifyContent="space-between">
                            <Typography variant="body2">
                              {item.productName} × {item.quantity}
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: monoFont }}>
                              ${item.totalPrice.toFixed(2)}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                      <Divider sx={{ mb: 1.5 }} />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="body2" color="text.secondary">
                          Total
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={700}>
                          ${o.totalAmount.toFixed(2)}
                        </Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
