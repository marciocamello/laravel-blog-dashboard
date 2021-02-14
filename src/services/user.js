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
    },

    async list() {

        return Api.get("/users");
    },

    async add(data) {

        return Api.post("/users", data);
    },

    async update(user, data) {

        return Api.put(`/users/${user}`, data);
    }
};