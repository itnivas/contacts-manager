import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/details",
        name: "details",
        component: () => import(/* webpackChunkName: "details" */ "../views/DetailsView.vue"),
    },
    {
        path: "*",
        name: "page-not-found",
        component: () => import(/* webpackChunkName: "page-not-found" */ "../views/PageNotFoundView.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
