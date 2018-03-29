import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import Login from '@/components/Login'
import AHome from '@/components/Admin/Home'
import AProfile from '@/components/Admin/Profile'
import LNav from '@/components/Landlords/Nav'
import LHome from '@/components/Landlords/Home'
import LProfile from '@/components/Landlords/Profile'
import Fulldetails from '@/components/Landlords/Fulldetails'
import TNav from '@/components/Tenants/Nav'
import THome from '@/components/Tenants/Home'
import TProfile from '@/components/Tenants/Profile'
import TPayments from '@/components/Tenants/Payments'
import TDocuments from '@/components/Tenants/Documents'
import TMaintenance from '@/components/Tenants/Maintenance'
import TContact from '@/components/Tenants/Contact'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(VueLocalStorage)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/user/Landlord/nav',
            name: 'LNav',
            component: LNav,
            redirect: '/user/Landlord/Home',
            children: [
                {
                    path: '/user/Landlord/Home',
                    name: 'LHome',
                    component: LHome
                },
                {
                    path: '/user/Landlord/Profile',
                    name: 'LProfile',
                    component: LProfile
                },
                {
                    path: '/user/Landlord/Fulldetails',
                    name: 'Fulldetails',
                    component: Fulldetails
                }
            ]
        },
        {
            path: '/user/Tenant/nav',
            name: 'TNav',
            component: TNav,
            redirect: '/user/Tenant/Home',
            children: [{
                    path: '/user/Tenant/Home',
                    name: 'THome',
                    component: THome
                },
                {
                    path: '/user/Tenant/Profile',
                    name: 'TProfile',
                    component: TProfile
                },
                {
                    path: '/user/Tenant/Payments',
                    name: 'TPayments',
                    component: TPayments
                },
                {
                    path: '/user/Tenant/Documents',
                    name: 'TDocuments',
                    component: TDocuments
                },
                {
                    path: '/user/Tenant/Maintenance',
                    name: 'TMaintenance',
                    component: TMaintenance
                },
                {
                    path: '/user/Tenant/Contact',
                    name: 'TContact',
                    component: TContact
                }
            ]
        },
        {
            path: '/user/AHome',
            name: 'AHome',
            component: AHome,
            children: [{
                path: '/user/Admin/Profile',
                name: 'AProfile',
                component: AProfile
            }]
        }
    ]
})