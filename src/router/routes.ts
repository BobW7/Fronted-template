import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AboutView from "@/views/AboutView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "根页面",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "管理员页面",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: HomeView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/task1",
    name: "功能页1",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/task2",
    name: "功能页2",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/task3",
    name: "功能页3",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/task4",
    name: "功能页4",
    component: AboutView,
    meta: {
      access: ACCESS_ENUM.USER,
    },
  },
];
