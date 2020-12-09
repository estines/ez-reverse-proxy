const app = require("express")();
const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyHosts = {
  member: "http://localhost:8080",
  product: "http://localhost:8082",
};

const defaultOptions = {
  changeOrigin: true,
  pathRewrite: {
    "^/next-ocs-member/*": "/",
    "^/next-product/*": "/",
  },
};

app.all(
  "/next-ocs-member/*",
  createProxyMiddleware({
    ...defaultOptions,
    target: proxyHosts.member,
  })
);

app.all(
  "/next-product/*",
  createProxyMiddleware({
    ...defaultOptions,
    target: proxyHosts.product,
  })
);

app.listen(3000, () => console.log("now proxy server running on port 3000"));
