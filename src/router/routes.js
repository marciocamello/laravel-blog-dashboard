import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"

// Posts
import Post from "../views/Posts/Post.vue"
import AddPost from "../views/Posts/AddPost.vue"
import EditPost from "../views/Posts/EditPost.vue"

// Categories
import Category from "../views/Categories/Category.vue"
import AddCategory from "../views/Categories/AddCategory.vue"
import EditCategory from "../views/Categories/EditCategory.vue"

export default [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { authOnly: true, main: true }
    },
    {
      path: "/posts",
      name: "Posts",
      component: Post,
      meta: { authOnly: true, main: true }
    },
    {
      path: "/posts/add-post",
      name: "AddPost",
      component: AddPost,
      meta: { authOnly: true, main: false }
    },
    {
      path: "/posts/edit-post/:post",
      name: "EditPost",
      component: EditPost,
      meta: { authOnly: true, main: false }
    },
    {
      path: "/categories",
      name: "Categories",
      component: Category,
      meta: { authOnly: true, main: true }
    },
    {
      path: "/categories/add-category",
      name: "AddCategory",
      component: AddCategory,
      meta: { authOnly: true, main: false }
    },
    {
      path: "/categories/edit-category/:category",
      name: "EditCategory",
      component: EditCategory,
      meta: { authOnly: true, main: false }
    }
  ]