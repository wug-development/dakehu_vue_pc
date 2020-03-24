import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Main',
            component (resolve) {
                require(['@/components/Main'], resolve)
            }
        },
        {
            path: '/aboutme',
            name: 'Aboutme',
            component (resolve) {
                require(['@/components/Aboutme'], resolve)
            }
        },
        {
            path: '/business',
            name: 'Business',
            component (resolve) {
                require(['@/components/Business'], resolve)
            }
        },
        {
            path: '/customer',
            name: 'Customer',
            component (resolve) {
                require(['@/components/Customer'], resolve)
            }
        },
        {
            path: '/govpro',
            name: 'GovPro',
            component (resolve) {
                require(['@/components/GovPro'], resolve)
            }
        },
        {
            path: '/linkme',
            name: 'LinkMe',
            component (resolve) {
                require(['@/components/LinkMe'], resolve)
            }
        },
        {
            path: '/index',
            name: 'Index',
            component (resolve) {
                require(['@/components/Index'], resolve)
            }
        },
        {
            path: '/flightlist',
            name: 'FlightList',
            component (resolve) {
                require(['@/components/FlightList'], resolve)
            }
        },
        {
            path: '/flightinfo',
            name: 'FlightInfo',
            component (resolve) {
                require(['@/components/FlightInfo'], resolve)
            }
        },
        {
            path: '/gnflightinfo',
            name: 'GNFlightInfo',
            component (resolve) {
                require(['@/components/GNFlightInfo'], resolve)
            }
        },
        {
            path: '/orderlist',
            name: 'OrderList',
            component (resolve) {
                require(['@/components/OrderList'], resolve)
            }
        },
        {
            path: '/orderdetail',
            name: 'OrderInfo',
            component (resolve) {
                require(['@/components/OrderInfo'], resolve)
            }
        },
        {
            path: '/payrecord',
            name: 'PayRecord',
            component (resolve) {
                require(['@/components/PayRecord'], resolve)
            }
        },
        {
            path: '/topcontacts',
            name: 'TopContacts',
            component (resolve) {
                require(['@/components/TopContacts'], resolve)
            }
        }
    ]
})
