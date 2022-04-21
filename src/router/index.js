import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/loginIn.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "/pageHome",
        name: "homePage",
        component: () => import("../components/homePage/homePage.vue")
      },
      {
        path: "/System/system",
        name: "Systemsystem",
        component: () => import("../components/systemSettings/System.vue"),
      },
      {
        path: "/System/email",
        name: "email",
        component: () => import("../components/systemSettings/Email.vue"),
      },
      {
        path: "/System/sms",
        name: "sms",
        component: () => import("../components/systemSettings/Sms.vue")
      },
      {
        path: "/Auth/adminList",
        name: "adminList",
        component: () => import("../components/authorityManagement/adminList.vue")
      },
      {
        path: "/Auth/adminGroup",
        name: "adminGroup",
        component: () => import("../components/authorityManagement/adminGroup.vue")
      },
      {
        path: "/Auth/adminRule",
        name: "adminRule",
        component: () => import("../components/authorityManagement/adminRule.vue")
      },
      {
        path: "/AdminLog/index",
        name: "adminLog",
        component: () => import("../components/authorityManagement/adminLog.vue")
      },
      {
        path: "/Database/database",
        name: "database",
        component: () => import("../components/databaseManagement/database.vue")
      },
      {
        path: "/Database/restore",
        name: "restore",
        component: () => import("../components/databaseManagement/restore.vue")
      },
      {
        path: "/Module/index",
        name: "moduleIndex",
        component: () => import("../components/moduleManagement/moduleIndex.vue")
      },
      {
        path: "/Category/index",
        name: "categoryIndex",
        component: () => import("../components/categoryMagnagement/categoryIndex.vue")
      },
      {
        path: "/Link/index",
        name: "Link",
        component: () => import("../components/websiteFunction/Link.vue")
      },
      {
        path: "/Ad/index",
        name: "Ad",
        component: () => import("../components/websiteFunction/Ad.vue")
      },
      {
        path: "/AdType/index",
        name: "AdType",
        component: () => import("../components/websiteFunction/AdType.vue")
      },
      {
        path: "/Debris/index",
        name: "Debris",
        component: () => import("../components/websiteFunction/Debris.vue")
      },
      {
        path: "/Addons/index",
        name: "Addons",
        component: () => import("../components/addonsManagement/Addons.vue")
      },
      {
        path: "/Hooks/index",
        name: "Hooks",
        component: () => import("../components/addonsManagement/Hooks.vue")
      },
      {
        path: "/Template/index",
        name: "Template",
        component: () => import("../components/templateMangement/Template.vue")
      },
      {
        path: "/Users/index",
        name: "memberIndex",
        component: () => import("../components/memberManagement/memberIndex.vue")
      },
      {
        path: "/UsersType/index",
        name: "memberType",
        component: () => import("../components/memberManagement/memberType.vue")
      },
      {
        path: "/Company/index",
        name: "Company",
        component: () => import("../components/businessManagement/enterPriseList.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const totoken = window.localStorage.getItem("token");
  if (!totoken) return next("/login");
  next();
});
export default router;
