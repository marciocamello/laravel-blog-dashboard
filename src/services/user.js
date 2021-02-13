import Api from "./api";

export default {

  async login(data) {

    return Api.post("/authenticate/login", data);
  },

  async logout() {

    return Api.get("/authenticate/logout");
  },

  auth() {
    return Api.get("/authenticate/user");
  }
};