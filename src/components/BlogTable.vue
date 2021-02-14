<template>
  <div v-if="!loading">
    <b-table
      id="blog-table"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      outlined
      hover
    >
      <template #cell(file_url)="data">
        <img :src="data.value" width="60" />
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="editItem(row.item, $event)" class="mr-1" variant="success">
           <b-icon icon="pencil" variant="white"></b-icon>
        </b-button>
        <b-button size="sm" @click="deleteItem(row.item, $event)" class="mr-1" variant="danger">
           <b-icon icon="trash" variant="white"></b-icon>
        </b-button>
      </template>
    </b-table>
    <div v-if="rows > 0">
      <hr />
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        align="right"
        aria-controls="blog-table"
      ></b-pagination>
      <p class="mt-3 float-right">Current Page: {{ currentPage }}</p>
    </div>
  </div>
  <div v-else>
    <div class="text-center text-danger my-2">
      <b-spinner class="align-middle"></b-spinner>
      <strong>Loading...</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: null,
    fields: null,
    loading: null,
    editItem: null,
    deleteItem: null,
  },
  data() {
    return {
      user: null,
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
};
</script>