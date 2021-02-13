import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"

Vue.use(VueRouter)

const routes = [
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
    meta: { authOnly: true }
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn() {
  return localStorage.getItem("accessToken")
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router