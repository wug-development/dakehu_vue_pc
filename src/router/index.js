import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Aboutme from '@/components/Aboutme'
import Business from '@/components/Business'
import Customer from '@/components/Customer'
import GovPro from '@/components/GovPro'
import LinkMe from '@/components/LinkMe'
import Index from '@/components/Index'
import FlightList from '@/components/FlightList'
import FlightInfo from '@/components/FlightInfo'
import GNFlightInfo from '@/components/GNFlightInfo'
import OrderList from '@/components/OrderList'
import OrderInfo from '@/components/OrderInfo'
import PayRecord from '@/components/PayRecord'
import TopContacts from '@/components/TopContacts'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main
        },
        {
            path: '/aboutme',
            name: 'Aboutme',
            component: Aboutme
        },
        {
            path: '/business',
            name: 'Business',
            component: Business
        },
        {
            path: '/customer',
            name: 'Customer',
            component: Customer
        },
        {
            path: '/govpro',
            name: 'GovPro',
            component: GovPro
        },
        {
            path: '/linkme',
            name: 'LinkMe',
            component: LinkMe
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
        },
        {
            path: '/flightlist',
            name: 'FlightList',
            component: FlightList
        },
        {
            path: '/flightinfo',
            name: 'FlightInfo',
            component: FlightInfo
        },
        {
            path: '/gnflightinfo',
            name: 'GNFlightInfo',
            component: GNFlightInfo
        },
        {
            path: '/orderlist',
            name: 'OrderList',
            component: OrderList
        },
        {
            path: '/orderdetail',
            name: 'OrderInfo',
            component: OrderInfo
        },
        {
            path: '/payrecord',
            name: 'PayRecord',
            component: PayRecord
        },
        {
            path: '/topcontacts',
            name: 'TopContacts',
            component: TopContacts
        }
    ]
})
