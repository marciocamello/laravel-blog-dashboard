<template>
  <container title="Add Post" button="Posts" action="Posts">
    <form class="needs-validation" novalidate @submit="savePost">
      <fieldset :disabled="loading">
        <div class="form-group">
          <label for="title">Category</label>
          <select class="form-control" v-model="post.category_id">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            name="title"
            v-model="post.title"
            required
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            id="description"
            name="title"
            v-model="post.description"
            rows="3"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="media">Media</label>
          <input
            type="file"
            class="form-control-file"
            id="media"
            name="media"
            v-on:change="onFileChange"
            accept=".jpg,.jpeg,.png"
          />
        </div>
        <div class="alert alert-danger" role="alert" v-if="errors">
          <h4 class="alert-heading">Alerts</h4>
          <p class="mb-0" v-for="(error, i) in errors" :key="i">
            {{ error[0] }}
          </p>
        </div>
        <b-toast id="success" variant="success" solid>
          <template #toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
              <strong class="mr-auto">Success!</strong>
            </div>
          </template>
          Post created with success.
        </b-toast>
        <button type="submit" class="btn btn-lg btn-primary">
          <span v-if="loading">
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span> Saving...</span>
          </span>
          <span v-else> Save</span>
        </button>
      </fieldset>
    </form>
  </container>
</template>

<script>
import Container from "../../components/Container";
import Post from "../../services/post";
import Category from "../../services/category";

export default {
  components: {
    Container,
  },
  data() {
    return {
      loading: false,
      categories: [],
      errors: false,
      post: {},
    };
  },
  mounted() {
    Category.list().then(({ data }) => {
      const categories = data.data;
      this.loading = false;
      this.categories = categories.map((category) => {
        const { name, id } = category;
        return {
          name,
          id,
        };
      });
    });
  },
  methods: {
    savePost(event) {
      event.preventDefault();

      this.loading = true;

      const data = new FormData();
      data.append("category_id", this.post.category_id);
      data.append("title", this.post.title);
      data.append("description", this.post.description);
      data.append('file', this.post.file);

      Post.add(data)
        .then(() => {
          this.loading = false;
          this.errors = false;
          this.$bvToast.show("success");
          this.post = {};
          setTimeout(() => this.$router.push('/posts'), 1000);
        })
        .catch((e) => {
          this.loading = false;
          const { errors } = e.response.data;
          this.errors = errors;
        });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const file = files[0];

      if (file.size > 2000000) {
        this.errors = { file: [`File size max is 2MB`] };
        return;
      }

      this.post.file = files[0];
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>