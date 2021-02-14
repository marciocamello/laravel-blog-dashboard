<template>
  <container title="Posts" button="Add Post" action="AddPost">
    <blog-table
      :items="posts"
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
      Post removed with success.
    </b-toast>
    <b-toast id="error" variant="error" solid>
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong class="mr-auto">Alert!</strong>
        </div>
      </template>
      Post won`t removed, pleas try again.
    </b-toast>
  </container>
</template>

<script>
import Container from "../../components/Container";
import BlogTable from "../../components/BlogTable";
import Post from "../../services/post";

export default {
  components: {
    Container,
    BlogTable,
  },
  data() {
    BlogTable;
    return {
      loading: true,
      posts: [],
      fields: [],
    };
  },
  methods: {
    deleteItem(item, e) {
      e.preventDefault();
      if (window.confirm("You are sure?")) {
        Post.delete(item.id)
          .then(() => {
            this.$bvToast.show("success");
            this.posts = this.posts.filter(
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

      this.$router.push(`posts/edit-post/${item.id}`);
    },
  },
  mounted() {

    Post.list().then(({ data }) => {
      const posts = data.data;
      this.loading = false;
      this.posts = posts.map((post) => {
        const { id, media, title, description, created_at, updated_at } = post;
        return {
          id,
          title,
          file_url: media ? media.file_url : '',
          description,
          created_at,
          updated_at,
        };
      });

      this.fields = [
        { key: "file_url", label: "Media", sortable: true, sortDirection: "desc" },
        { key: "title", label: "Title", sortable: true, sortDirection: "desc" },
        {
          key: "description",
          label: "Description",
          sortable: true,
          sortDirection: "desc",
        },
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