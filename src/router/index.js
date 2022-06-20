import { createRouter, createWebHashHistory  } from "vue-router";

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
    meta: {
      title: "控制台"
    },
    children: [
      {
        path: "/home",
        redirect: "/pageHome",
      },
      {
        path: "/pageHome",
        name: "homePage",
        component: () => import("../components/homePage/homePage.vue"),
      },
      {
        path: "/System/system",
        name: "Systemsystem",
        component: () => import("../components/systemSettings/System.vue"),
        meta: {
          title: "系统设置"
        }
      },
      {
        path: "/System/email",
        name: "email",
        component: () => import("../components/systemSettings/Email.vue"),
        meta: {
          title: "邮箱设置"
        }
      },
      {
        path: "/System/sms",
        name: "sms",
        component: () => import("../components/systemSettings/Sms.vue")
        , meta: {
          title: "短信配置"
        }
      },
      {
        path: "/Sensitive/getData",
        name: "sensitive",
        component: () => import("../components/systemSettings/Sensitive.vue"),
        meta: {
          title: "敏感词设置"
        }
      },
      {
        path: "/Auth/adminList",
        name: "adminList",
        component: () => import("../components/authorityManagement/adminList.vue")
        , meta: {
          title: "管理员列表"
        }
      },
      {
        path: "/Auth/adminGroup",
        name: "adminGroup",
        component: () => import("../components/authorityManagement/adminGroup.vue")
        , meta: {
          title: "用户组列表"
        }
      },
      {
        path: "/Auth/adminRule",
        name: "adminRule",
        component: () => import("../components/authorityManagement/adminRule.vue")
        , meta: {
          title: "菜单规则"
        }
      },
      {
        path: "/AdminLog/index",
        name: "adminLog",
        component: () => import("../components/authorityManagement/adminLog.vue")
        , meta: {
          title: "管理员日志"
        }
      },
      {
        path: "/Users/index",
        name: "memberIndex",
        component: () => import("../components/memberManagement/memberIndex.vue")
        , meta: {
          title: "会员列表"
        }
      },
      {
        path: "/UsersType/index",
        name: "memberType",
        component: () => import("../components/memberManagement/memberType.vue")
        , meta: {
          title: "会员组"
        }
      },
      {
        path: "/Company/index",
        name: "Company",
        component: () => import("../components/businessManagement/enterPriseList.vue")
        , meta: {
          title: "企业列表"
        }
      },
      {
        path: "/company_rule/listRule",
        name: "company_rule",
        component: () => import("../components/businessManagement/companyRule.vue")
        , meta: {
          title: "权限列表"
        }
      },
      {
        path: "/Complaint/getList",
        name: "Complaint",
        component: () => import("../components/routineManagement/complaintList.vue")
        , meta: {
          title: "投诉列表"
        }
      },
      {
        path: "/Demand/index",
        name: "Demand",
        component: () => import("../components/demandManagement/demandIndex.vue")
        , meta: {
          title: "需求列表"
        }
      },
      {
        path: "/Circle/list",
        name: "Circle",
        component: () => import("../components/Circle/circleList.vue")
        , meta: {
          title: "圈子列表"
        }
      },
      {
        path: "/Circle/forum",
        name: "forum",
        component: () => import("../components/Circle/ForumManagement.vue")
        , meta: {
          title: "论坛管理"
        }
      },
      {
        path: "/Circle/listTheme",
        name: "listTheme",
        component: () => import("../components/Circle/topicList.vue")
        , meta: {
          title: "话题管理"
        }
      },
      {
        path: "/Designer/index",
        name: "Designer",
        component: () => import("../components/Designer/designerList.vue")
        , meta: {
          title: "设计师列表"
        }
      },
      {
        path: "/match/listMacth",
        name: "match",
        component: () => import("../components/eventManagement/listMacth.vue")
        , meta: {
          title: "赛事列表"
        }
      },
      {
        path: "/Activity/listActivity",
        name: "Activity",
        component: () => import("../components/activityManagement/Activity.vue")
        , meta: {
          title: "活动列表"
        }
      },
      {
        path: "/product_type/getList",
        name: "product_type",
        component: () => import("../components/product_typeManagement/product_typeList.vue")
        , meta: {
          title: "商品类别列表"
        }
      },
      {
        path: "/Brand/getList",
        name: "Brand",
        component: () => import("../components/brand/brandList.vue")
        , meta: {
          title: "品牌列表"
        }
      },
      {
        path: "/Business/index",
        name: "Business",
        component: () => import("../components/Business/BusinessList.vue")
        , meta: {
          title: "门店列表"
        }
      },
      {
        path: "/Ad/listAdType",
        name: "listAdType",
        component: () => import("../components/category/categoryList.vue")
        , meta: {
          title: "类别列表"
        }
      },
      {
        path: "/Ad/getList",
        name: "getList",
        component: () => import("../components/advertisement/advertisementList.vue")
        , meta: {
          title: "类别列表"
        }
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/404",
    name: "/404",
    component: () => import("../views/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404"
  }

];

const router = createRouter({
  history: createWebHashHistory (),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();
  const totoken = window.localStorage.getItem("token");
  if (!totoken) return next("/login");
  next();
});
export default router;
