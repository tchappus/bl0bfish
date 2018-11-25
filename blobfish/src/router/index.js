import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home.vue"
import Issue from "@/components/Issue.vue"

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: "Home",
            path: "/",
            component: Home,
        },
        {   
            name: "Issue",
            path: '/issue/:issueid', 
            component: Issue 
        }
    ]
});
