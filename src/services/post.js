import Api from "./api";

export default {

    async show(post) {

        return Api.get(`/posts/${post}`);
    },

    async list() {

        return Api.get("/posts");
    },

    async add(data) {

        return Api.post("/posts", data);
    },

    async update(post, data) {

        return Api.post(`/posts/${post}`, data);
    },

    async delete(post) {

        return Api.delete(`/posts/${post}`);
    }
};