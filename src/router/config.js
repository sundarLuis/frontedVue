import { AuthLayout, DefaultLayout, ChatLayout } from "@/components/layouts"

export const publicRoute = [
  { path: "*", component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue") },
  {
    path: "/auth",
    component: AuthLayout,
    meta: { title: "Login" },
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "Login" },
        component: () => import(/* webpackChunkName: "login" */ "@/views/auth/Login.vue")
      }
    ]
  },

  {
    path: "/404",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import(/* webpackChunkName: "errors-404" */ "@/views/error/NotFound.vue")
  },

  {
    path: "/500",
    name: "500",
    meta: { title: "Server Error" },
    component: () => import(/* webpackChunkName: "errors-500" */ "@/views/error/Error.vue")
  }
]

export const protectedRoute = [
  {
    path: "/",
    component: DefaultLayout,
    meta: { title: "Home", group: "apps", icon: "" },
    redirect: "/dashboardCustomised",
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: { title: "Home", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
      },
      // customised sundar
      {
        path: "/dashboardCustomised",
        name: "DashboardCustomised",
        meta: { title: "Task", group: "apps", icon: "dashboard" },
        component: () => import(/* webpackChunkName: "dashboardCustomised" */ "@/views/DashboardCustimised.vue")
      },
      // customised end
      {
        path: "/403",
        name: "Forbidden",
        meta: { title: "Access Denied", hiddenInMenu: true },
        component: () => import(/* webpackChunkName: "error-403" */ "@/views/error/Deny.vue")
      }
    ]
  },

  //list
  {
    path: "/setting",
    component: DefaultLayout,
    redirect: "/setting/table",
    meta: { title: "setting", icon: "view_compact", group: "setting" },
    children: [
      {
        path: "/setting/table/Category",
        name: "Confi_Category",
        meta: { title: "Category" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/sundar/Category.vue")
      },
      {
        path: "/setting/table/State",
        name: "Confi_State",
        meta: { title: "State" },
        component: () => import(/* webpackChunkName: "table" */ "@/views/sundar/State.vue")
      }
    ]
  },

  //widgets
  {
    path: "/widgets",
    component: DefaultLayout,
    meta: { title: "Widget", icon: "widgets", group: "advance" },
    redirect: "/widgets/chart",
    children: [
      {
        path: "/widgets/chart",
        name: "ChartWidget",
        meta: { title: "Chart Widget" },
        component: () => import(/* webpackChunkName: "chart-widget" */ "@/views/widgets/Chart.vue")
      },
      {
        path: "/widgets/list",
        name: "ListWidget",
        meta: { title: "List Widget" },
        component: () => import(/* webpackChunkName: "list-widget" */ "@/views/widgets/List.vue")
      },
      {
        path: "/widgets/social",
        name: "SocialWidget",
        meta: { title: "Social Widget" },
        component: () => import(/* webpackChunkName: "social-widget" */ "@/views/widgets/Social.vue")
      },
      {
        path: "/widgets/statistic",
        name: "StatisticWidget",
        meta: { title: "Statistic Widget" },
        component: () => import(/* webpackChunkName: "statistic-widget" */ "@/views/widgets/Statistic.vue")
      }
    ]
  },

  //media
  {
    path: "/media",
    meta: { title: "Media", group: "apps", icon: "media" },
    name: "Media",
    props: route => ({ type: route.query.type }),
    component: () => import(/* webpackChunkName: "routes" */ `@/views/Media.vue`)
  },

  // chat app
  {
    path: "/chat",
    name: "Chat",
    component: ChatLayout,
    redirect: {
      path: "/chat/messaging"
    },
    meta: { title: "Chat", group: "apps", icon: "chat_bubble" },
    children: [
      {
        path: "/chat/messaging/:uuid?",
        name: "ChatMessaging",
        props: true,
        components: () => import(/* webpackChunkName: "chat-messaging" */ `@/components/chat/ChatMessaging.vue`)
      },
      {
        path: "/chat/contact/:uuid?",
        meta: {
          public: true
        },
        name: "ChatContact",
        components: () => import(/* webpackChunkName: "chat-contact" */ `@/components/chat/ChatContact.vue`)
      }
    ]
  },

  //mail app
  {
    path: "/mail",
    meta: {
      public: true
    },
    name: "Mail",
    component: () => import(/* webpackChunkName: "routes" */ `@/components/email/Layout.vue`),
    redirect: {
      path: "/mail/all"
    },
    children: [
      {
        path: "/mail/:mailType",
        meta: {
          public: true
        },
        name: "MailIndex",
        component: () => import(/* webpackChunkName: "routes" */ `@/components/email/List.vue`)
      },
      {
        path: "/mail/0/:uuid",
        meta: {
          public: true
        },
        name: "MailDetail",
        component: () => import(/* webpackChunkName: "routes" */ `@/components/email/Reply.vue`)
      }
    ]
  }
]
