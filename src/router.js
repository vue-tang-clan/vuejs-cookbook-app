import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Silence from "./views/Silence.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import RecipesNew from "./views/RecipesNew.vue";
import RecipesShow from "./views/RecipesShow.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/silence",
      name: "silence",
      component: Silence
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/recipes/new",
      name: "recipes-new",
      component: RecipesNew
    },
    {
      path: "/recipes/:id",
      name: "recipes-show",
      component: RecipesShow
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
