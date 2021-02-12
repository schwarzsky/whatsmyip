import Main from '../pages/main.vue'
import Status from '../pages/status.vue'

const routes = [
    {path: '/', name: 'Main', component: Main, meta: {guest: true}},
    {path: '/status', name: 'Status', component: Status, meta: {guest: true}}
]

export default routes;