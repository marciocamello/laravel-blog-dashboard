<template>
  <container title="Dashboard" v-if="user">
    <h3>Hello, {{ user.name }}</h3>
    <span>{{ user.email }}</span>
  </container>
</template>

<script>
import Container from "../components/Container";
import User from "../services/user";

export default {
  components: {
    Container,
  },
  data() {
    Container;
    return {
      user: null,
    };
  },
  mounted() {
    User.auth().then((response) => {
      this.user = response.data;
    });
  },
};
</script>