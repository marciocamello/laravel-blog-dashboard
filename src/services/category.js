import Api from "./api";

export default {

    async show(category) {

        return Api.get(`/categories/${category}`);
    },

    async list() {

        return Api.get("/categories");
    },

    async add(data) {

        return Api.post("/categories", data);
    },

    async update(category, data) {

        return Api.put(`/categories/${category}`, data);
    },

    async delete(category) {

        return Api.delete(`/categories/${category}`);
    }
};