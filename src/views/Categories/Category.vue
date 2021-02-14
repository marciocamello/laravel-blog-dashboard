<template>
  <container title="Categories" button="Add Category" action="AddCategory">
    <blog-table
      :items="categories"
      :fields="fields"
      :editItem="editItem"
      :deleteItem="deleteItem"
      :loading="loading"
    ></blog-table>
    <b-toast id="success" variant="success" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Success!</strong>
        </div>
      </template>
      Category removed with success.
    </b-toast>
    <b-toast id="error" variant="error" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Alert!</strong>
        </div>
      </template>
      Category won`t removed, pleas try again.
    </b-toast>
  </container>
</template>

<script>
import Container from "../../components/Container";
import BlogTable from "../../components/BlogTable";
import Category from "../../services/category";

export default {
  components: {
    Container,
    BlogTable,
  },
  data() {
    BlogTable;
    return {
      user: null,
      loading: true,
      categories: [],
      fields: [],
    };
  },
  methods: {
    deleteItem(item, e) {
      e.preventDefault();
      if (window.confirm("You are sure?")) {
        Category.delete(item.id)
          .then(() => {
            this.$bvToast.show("success");
            this.categories = this.categories.filter(
              (itemFilter) => itemFilter.id !== item.id
            );
          })
          .catch(() => {
            this.$bvToast.show("error");
          });
      }
    },
    editItem(item, e) {
      e.preventDefault();

      this.$router.push(`categories/edit-category/${item.id}`);
    },
  },
  mounted() {

    Category.list().then(({ data }) => {
      const categories = data.data;
      this.loading = false;
      this.categories = categories.map((category) => {
        const { id, name, created_at, updated_at } = category;
        return {
          id,
          name,
          created_at,
          updated_at,
        };
      });

      this.fields = [
        { key: "name", label: "Name", sortable: true, sortDirection: "desc" },
        {
          key: "updated_at",
          label: "Updated At",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions" },
      ];
    });
  },
};
</script>