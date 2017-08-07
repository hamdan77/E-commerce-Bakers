        'use strict';

        angular.module('cnc', ['ui.router','ngResource','ui.bootstrap','ngDialog','ngRoute'])
        //angular.module('cnc', ['ui.router','ui.bootstrap','ngDialog','ngRoute'])

            .config(function($stateProvider, $urlRouterProvider) {
                $stateProvider

                    // route for the home page
                    .state('app', {
                        url:'/',
                        views: {
                            'header': {
                                templateUrl : 'views/header.html',
                                controller  : 'HeadController'
                            },
                            'content': {
                                templateUrl : 'views/home.html',
                                controller  : 'homeController'
                            },
                            'footer': {
                                templateUrl : 'views/footer.html',
                            }
                        }

                    })

                 .state('app.aboutus', {
                        url: 'aboutus',
                        views: {
                            'content@': {
                                templateUrl : 'views/aboutus.html',

                                controller  : 'AboutController'       
                           }
                        }
                    })

                     .state('app.contactus', {
                        url: 'contactus',
                        views: {
                            'content@': {
                                templateUrl : 'views/cc.html',
                                controller  : 'contactController'

                            }
                        }
                    })
                 //adminDashboard
                 .state('app.admin', {
                        url: 'admin',
                        views: {
                            'content@': {
                                templateUrl : 'views/admin.html',
                                controller  : ''
                                // controller  : 'AppCtrl'
                            }
                        }
                    })

                 .state('app.productmanagement', {
                        url: 'productmanagement',
                        views: {
                            'content@': {
                                templateUrl : 'views/productmanagement.html',
                                controller  : 'addProductController'

                            }
                        }
                    })
                 .state('app.productupdate', {
                        url: 'home/update/:id',
                        views: {
                            'content@': {
                                templateUrl : 'views/productupdate.html',
                                controller  : 'ProductDetailController'
                           }
                        }
                    })


          .state('app.productdetails', {
                        url: 'home/:id',
                        views: {
                            'content@': {
                                templateUrl : 'views/productdetail.html',
                                controller  : 'ProductDetailController'
                           }
                        }
                    })



                 .state('app.customermanagement', {
                        url: 'customermanagement',
                        views: {
                            'content@': {
                                templateUrl : 'views/customermanagement.html',
                                controller  : 'CustomerManagementController'
                           }
                        }
                    })
                   .state('app.viewcart', {
                        url: 'viewcart',
                        views: {
                            'content@': {
                                templateUrl : 'views/viewcart.html',
                                controller  : 'homeController'
                           }
                        }
                    })
                 .state('app.orders', {
                        url: 'orders',
                        views: {
                            'content@': {
                                templateUrl : 'views/orders.html',
                                controller  : 'order'
                           }
                        }
                    })
                 .state('app.createcake', {
                        url: 'createcake',
                        views: {
                            'content@': {
                                templateUrl : 'views/createcake.html',
                                controller  : 'createcakeController'
                           }
                        }
                    })


                ;

                $urlRouterProvider.otherwise('/');
            })
        ;
