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
  // Saves a store to the database
  saveStore: function (storeData) {
    return axios.post("/api/stores", storeData);
  }
};
