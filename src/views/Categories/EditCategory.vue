<template>
  <container title="Edit Category" button="Categories" action="Categories">
    <form class="needs-validation" novalidate @submit="editCategory">
      <fieldset :disabled="loading">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            v-model="category.name"
            required
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
          Category created with success.
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
import Category from "../../services/category";

export default {
  components: {
    Container,
  },
  data() {
    return {
      loading: false,
      errors: false,
      category: {},
    };
  },
  mounted() {
    Category.show(this.$route.params.category).then(({ data }) => {
      const category = data.response;
      this.category = category;
    });
  },
  methods: {
    editCategory(event) {
      event.preventDefault();

      this.loading = true;

      Category.update(this.$route.params.category, this.category)
        .then(() => {
          this.loading = false;
          this.errors = false;
          this.$bvToast.show("success");
          setTimeout(() => this.$router.push('/categories'), 1000);
        })
        .catch((e) => {
          this.loading = false;
          const { errors } = e.response.data;
          this.errors = errors;
        });
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>