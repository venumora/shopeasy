import axios from "axios";

export default {
  // Gets the user with the given id
  getUser: function (id) {
    return axios.get("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/users", userData);
  },
  // Gets the store with the given id
  getStore: function (id) {
    return axios.get("/api/stores/" + id);
  },
  // Gets the store with the given id
  getStores: function () {
    return axios.get("/api/stores/");
  },
  // Saves a store to the database
  saveStore: function (storeData) {
    return axios.post("/api/stores", storeData);
  },
  // Gets all products
  getProducts: function () {
    return axios.get("/api/products");
  },
  // Gets the product with the given id
  getProduct: function (id) {
    return axios.get("/api/products/" + id);
  },
  // Deletes the product with the given id
  deleteProduct: function (id) {
    return axios.delete("/api/products/" + id);
  },
  // Saves a product to the database
  saveProduct: function (productData) {
    return axios.post("/api/products", productData);
  },
  // Gets all placements
  getPlacements: function () {
    return axios.get("/api/placements");
  },
  // Gets the placement with the given id
  getPlacement: function (id) {
    return axios.get("/api/placements/" + id);
  },
  // Deletes the placement with the given id
  deletePlacement: function (id) {
    return axios.delete("/api/placements/" + id);
  },
  // Saves a placement to the database
  savePlacement: function (placementData) {
    return axios.post("/api/placements", placementData);
  }
};
