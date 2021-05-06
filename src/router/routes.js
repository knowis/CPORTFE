const routes = [
  {
    path: '/oidc-callback', // Needs to match redirectUri (redirect_uri if you use snake case) in you oidcSettings
    name: 'oidcCallback',
    component: () => import('pages/OidcCallback.vue')
  },
  {
    path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
    name: 'oidcCallbackError',
    component: () => import('pages/OidcCallbackError.vue'),
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/logout',
    component: () => import('layouts/PublicLayout.vue'),
    meta: {
      isPublic: true
    },
    children: [
      { path: '', component: () => import('pages/Logout.vue') }
    ]
  },
  {
    path: '/credits',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Credits.vue'), meta: { title: 'menu.credits' } },
      { path: 'add', component: () => import('pages/Credit.vue'), meta: { title: 'credit.new' } }
    ]
  },
  {
    path: '/messages',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Messages.vue'), meta: { title: 'menu.messages' } }
    ]
  },
  {
    path: '/account',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Account.vue'), meta: { title: 'account.settings' } }
    ]
  },
  {
    path: '/testdata',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Testdata.vue'), meta: { title: 'menu.testdatamgmt' } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {
      isPublic: true
    }
  }
]

export default routes
