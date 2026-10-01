import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Layout from './Layout.vue'
import './style.css'
import './eventease.css'

const routes = ['/', '/about', '/projects', '/skills', '/contact', '/interests'].map((path) => ({ path, component: App }))
const router = createRouter({ history: createWebHashHistory(), routes })
router.afterEach((to) => { document.title = `${to.path === '/' ? 'Home' : to.path.slice(1)} | Migcobo Macilikishe` })
createApp(Layout).use(router).mount('#app')
