const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Define routes and their target URLs
const routes = {
  '/voyages': 'http://localhost:3000/voyages',
  '/graphql': 'http://localhost:5000/graphql',
  // Add more routes as needed
};

// Create a proxy for each route
for (const route in routes) {
  const target = routes[route];
  app.use(
    route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route}`]: '', // Remove the route prefix
      },
    })
  );
}

// Example route to fetch voyages
app.get('/voyages', (req, res) => {
  const targetURL = 'http://localhost:3000/voyages'; 

  // Forward the request to the target URL
  createProxyMiddleware({
    target: targetURL,
    changeOrigin: true,
  })(req, res);
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`API gateway server listening on port ${PORT}`);
});