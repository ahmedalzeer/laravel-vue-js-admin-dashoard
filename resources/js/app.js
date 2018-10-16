require('./bootstrap');
window.Vue = require('vue');
import moment from 'moment'
import { Form, HasError, AlertError } from 'vform'
import swal from 'sweetalert2'
window.swal = swal
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})
window.toast = toast
window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '4px'
})
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/profile', component: require('./components/Profile.vue') },
    { path: '/users', component: require('./components/User.vue') }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
Vue.filter('uptext',function (text) {
    return text.charAt(0).toUpperCase()+text.slice(1)

})
Vue.filter('mydate',function(){
    return moment().format('MMMM Do YYYY')
})

window.fire =  new Vue();

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
