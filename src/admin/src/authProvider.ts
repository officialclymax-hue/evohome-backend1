export const authProvider = {
  login: async ({ username, password }: any) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email: username, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
  },
  logout: () => { localStorage.removeItem('token'); return Promise.resolve(); },
  checkAuth: () => localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
  checkError: (error: any) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token'); return Promise.reject();
    }
    return Promise.resolve();
  }
};

// inject token for all RA fetches
const origFetch = window.fetch;
window.fetch = (input: RequestInfo, init: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  init.headers = { ...(init.headers||{}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
  return origFetch(input, init);
};
