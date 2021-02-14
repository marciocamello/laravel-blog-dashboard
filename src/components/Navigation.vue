<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">Laravel Blog</router-link>
      </div>
      <ul class="nav navbar-nav">
        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Login' }"
        >
          Login
        </router-link>
        <li v-for="route in routes" :key="route.name">
          <router-link
            v-if="isLoggedIn && route.meta && route.meta.authOnly && route.meta.main"
            class="nav-item nav-link"
            active-class=""
            :to="{ name: route.name }"
          >
            {{ route.name }}
          </router-link>
        </li>
        <a
          class="nav-item nav-link"
          v-if="isLoggedIn"
          @click.prevent="logout"
          href="#"
          >Logout</a
        >
      </ul>
    </div>
  </nav>
</template>

<script>
import routes from "../router/routes";
import User from "../services/user";

export default {
  data() {
    return {
      routes,
      isLoggedIn: false,
    };
  },

  mounted() {
    this.$root.$on("login", () => {
      this.isLoggedIn = true;
    });

    this.isLoggedIn = !!localStorage.getItem("accessToken");
  },

  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("accessToken");
        this.isLoggedIn = false;
        this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>

<style>
.router-link-exact-active {
  color: #ffffff !important;
  transition: all 0.25s;
}
</style>