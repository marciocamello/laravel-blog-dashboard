<template>
  <div class="py-5 mx-auto mt-5 home col-8">
    <h1>Dashboard</h1>
    <div class="card">
      <div class="card-body" v-if="user">
        <h3>Hello, {{ user.name }}</h3>
        <span>{{ user.email }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../services/user";

export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  }
};
</script>