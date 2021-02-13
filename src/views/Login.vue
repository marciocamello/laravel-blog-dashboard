<template>
  <div class="py-5 mx-auto mt-5 home col-5">
    <h1 class="text-center">Login</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="email"
          />
          <span class="text-danger" v-if="errors.email">
            {{ errors.email[0] }}
          </span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="password"
          />
          <span class="text-danger" v-if="errors.password">
            {{ errors.password[0] }}
          </span>
        </div>
        <button @click.prevent="login" class="btn btn-primary btn-block">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../services/user";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      errors: []
    };
  },

  methods: {
    login() {
      User.login(this.form)
        .then(({data}) => {
          const { accessToken } = data.response
          this.$root.$emit("login", true);
          localStorage.setItem("accessToken", accessToken);
          this.$router.push({ name: "Dashboard" });
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>