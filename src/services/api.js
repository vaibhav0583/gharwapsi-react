// ─────────────────────────────────────────────
//  GharWapsi API Service
//  All backend calls go through this file.
//  Replace BASE_URL with your backend URL.
// ─────────────────────────────────────────────

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const headers = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

// ── AUTH ────────────────────────────────────

export const authAPI = {
  register: (data) =>
    fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  login: (data) =>
    fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  me: () =>
    fetch(`${BASE_URL}/auth/me`, { headers: headers() }).then(r => r.json()),

  verifyAadhaar: (otp) =>
    fetch(`${BASE_URL}/auth/verify-aadhaar`, { method: 'POST', headers: headers(), body: JSON.stringify({ otp }) }).then(r => r.json()),
};

// ── LISTINGS ────────────────────────────────

export const listingsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return fetch(`${BASE_URL}/listings?${params}`, { headers: headers() }).then(r => r.json());
  },

  getById: (id) =>
    fetch(`${BASE_URL}/listings/${id}`, { headers: headers() }).then(r => r.json()),

  create: (data) =>
    fetch(`${BASE_URL}/listings`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  update: (id, data) =>
    fetch(`${BASE_URL}/listings/${id}`, { method: 'PUT', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  delete: (id) =>
    fetch(`${BASE_URL}/listings/${id}`, { method: 'DELETE', headers: headers() }).then(r => r.json()),
};

// ── BOOKINGS ────────────────────────────────

export const bookingsAPI = {
  create: (data) =>
    fetch(`${BASE_URL}/bookings`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  getMyBookings: () =>
    fetch(`${BASE_URL}/bookings/my`, { headers: headers() }).then(r => r.json()),

  confirm: (id) =>
    fetch(`${BASE_URL}/bookings/${id}/confirm`, { method: 'PUT', headers: headers() }).then(r => r.json()),

  cancel: (id) =>
    fetch(`${BASE_URL}/bookings/${id}/cancel`, { method: 'PUT', headers: headers() }).then(r => r.json()),

  checkIn: (id) =>
    fetch(`${BASE_URL}/bookings/${id}/checkin`, { method: 'PUT', headers: headers() }).then(r => r.json()),
};

// ── AI ──────────────────────────────────────

export const aiAPI = {
  matchFamilies: (vibeProfile) =>
    fetch(`${BASE_URL}/ai/match`, { method: 'POST', headers: headers(), body: JSON.stringify({ vibeProfile }) }).then(r => r.json()),

  chat: (message, conversationHistory = []) =>
    fetch(`${BASE_URL}/ai/chat`, { method: 'POST', headers: headers(), body: JSON.stringify({ message, history: conversationHistory }) }).then(r => r.json()),

  generateProfile: (hostAnswers) =>
    fetch(`${BASE_URL}/ai/generate-profile`, { method: 'POST', headers: headers(), body: JSON.stringify({ answers: hostAnswers }) }).then(r => r.json()),

  tripPlan: (listingId, days, budget, interests) =>
    fetch(`${BASE_URL}/ai/trip-plan`, { method: 'POST', headers: headers(), body: JSON.stringify({ listingId, days, budget, interests }) }).then(r => r.json()),
};

// ── CROWD ────────────────────────────────────

export const crowdAPI = {
  getAll: () =>
    fetch(`${BASE_URL}/crowd`, { headers: headers() }).then(r => r.json()),

  getZone: (zoneId) =>
    fetch(`${BASE_URL}/crowd/${zoneId}`, { headers: headers() }).then(r => r.json()),

  report: (zoneId, level) =>
    fetch(`${BASE_URL}/crowd/report`, { method: 'POST', headers: headers(), body: JSON.stringify({ zoneId, level }) }).then(r => r.json()),

  getAlternatives: (zone) =>
    fetch(`${BASE_URL}/crowd/alternatives/${zone}`, { headers: headers() }).then(r => r.json()),
};

// ── REVIEWS ──────────────────────────────────

export const reviewsAPI = {
  submit: (data) =>
    fetch(`${BASE_URL}/reviews`, { method: 'POST', headers: headers(), body: JSON.stringify(data) }).then(r => r.json()),

  getForListing: (listingId) =>
    fetch(`${BASE_URL}/reviews/listing/${listingId}`, { headers: headers() }).then(r => r.json()),
};

// ── PAYMENTS ─────────────────────────────────

export const paymentsAPI = {
  createOrder: (bookingId, amount) =>
    fetch(`${BASE_URL}/payments/create-order`, { method: 'POST', headers: headers(), body: JSON.stringify({ bookingId, amount }) }).then(r => r.json()),

  verify: (paymentData) =>
    fetch(`${BASE_URL}/payments/verify`, { method: 'POST', headers: headers(), body: JSON.stringify(paymentData) }).then(r => r.json()),
};
