<template>
  <div class="mx-auto mt-5 home col-12">
    <div class="d-flex justify-content-between">
      <h1>{{ title }}</h1>
      <router-link class="nav-item nav-link" :to="{ name: action }">
        {{ button }}
      </router-link>
    </div>
    <div class="card">
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: null,
    button: null,
    action: null,
  },
};
</script>