import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue";
import Issue from "@/components/Issue.vue";
import Dashboard from "@/components/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home
    },
    {
      name: "Dashboard",
      path: "/dashboard/:userid",
      component: Dashboard
    },
    {
      name: "Issue",
      path: "/issue/:issueid",
      component: Issue
    }
  ]
});
