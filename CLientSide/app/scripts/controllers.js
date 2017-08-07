        'use strict';

        angular.module('cnc')

           .controller('homeController', ['$scope','$rootScope','menuFactory','ngDialog','orderFactory',function($scope,$rootScope,menuFactory,ngDialog,orderFactory) {
            $scope.myInterval = 3000;
               var vm = this;
            vm.Total = 0;

        //$scope.filtText = '';
        /*
           $scope.dish =  

                   menuFactory.getDishes().query(
                      function(response) {
                          $scope.dishes = response;
                          $scope.showMenu = true;
                      },
                      function(response) {
                          $scope.message = "Error: "+response.status + " " + response.statusText;
                      }
                    );


               //
               */



                $scope.dish =  menuFactory.query(
                function (response) {
                    $scope.dishes = response;
                      $scope.sliderImages = $scope.dish.sliderimage;
                    console.log(  "slider Images are" + $scope.sliderImages);
                   // $scope.showMenu = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

                $scope.filters = { };

            $scope.toggleImage = function(dish) {
                 console.log(dish.image);
                  $scope.myimage=dish.image;
                console.log($scope.myimage);
            };
            $scope.links = [
                {name: 'Apple', category: 'Fruit'},
                {name: 'Pear', category: 'Fruit'},
                {name: 'Almond', category: 'Nut'},
                {name: 'Mango', category: 'Fruit'},
                {name: 'Cashew', category: 'Nut'}
            ];
               var purchasedProducts = [];


              $scope.openproductdelete = function (mydish) {
                  $rootScope.dd=mydish.id;
                  console.log('dialog is opened');
                  console.log(mydish.id);
                ngDialog.open({ template: 'views/productdelete.html', className: 'ngdialog-theme-default' ,controller: "ProductDeleteController" ,$rootScope: $rootScope.dd});
            };
                 var array = {
               id:""
                 ,

                 name:""


             };
             var mylength=0;
              $scope.checking = function (){

                  console.log("i am s");
                    $scope.tot = {
                      "total":"",
                      "username":"",
                        "items":[

              ]
                  };


              var getit = $scope.getTotal();
              $scope.tot.total = getit;

                           $scope.tot.username =  $rootScope.getuser;

                    $scope.tot.items = $rootScope.g;

            console.log("this is my array");

               //   console.log(cartob);
               //   $rootScope.g.push( $scope.tot);

        console.log(  $scope.tot );





              }

              $scope.postorder = function(){
                    console.log("i am po");
                    $scope.tot = {
                      "total":"",
                      "username":"",
                        "items":[

              ]
                  };


              var getit = $scope.getTotal();
              $scope.tot.total = getit;

                           $scope.tot.username =  $rootScope.getuser;

                    $scope.tot.items = $rootScope.g;

             //  console.log('hojaye ga add');
             //  $scope.myimg.image=$scope.files[0].name;
                 console.log( $scope.tot);
                 //$scope.dish.image="";
               orderFactory.save($scope.tot);



              }
           $scope.Addtocart = function (dish) {
               var i,qty=1;
               var match=false;
               console.log('this is it');
               //console.log(dish);

               if($rootScope.g.length>0)

               {
                   for(i=0; i<$rootScope.g.length;i++){
                  // console.log($rootScope.g[i]._id);
                  if( dish._id==$rootScope.g[i]._id){




                  $rootScope.g[i].Qty=$rootScope.g[i].Qty+1; 
                      match=true;
                 break;


                  }


               }


               }
            else{

                $rootScope.g.push(dish);

                  $rootScope.g[0].Qty=1; 
                match=true;

            }
                 if(match==false){
                        console.log('not nul');
                  $rootScope.g.push(dish);   

                    $rootScope.g[$rootScope.g.length-1].Qty=1; 

                   }


               console.log($rootScope.g);


            };

               $rootScope.pname = $rootScope.g ;

                $scope.myfun = function () {

            console.log("this is my array");
        console.log( $rootScope.pname);




            };

              $scope.getTotal = function(){
            var total = 0;
            for(var i = 0; i < $rootScope.g.length; i++){
              //  var product =$rootScope.g.products[i];
                total += ($rootScope.g[i].price * $rootScope.g[i].Qty);
            }
            return total;
        } 



                $scope.myobj= function () {

            console.log("this is my array single object");
        console.log($rootScope.g[0]._id);


            };

                $scope.checkingg = function(){
                console.log('order control');

            }

                }])

           .controller('order', ['$scope','$rootScope','menuFactory','ngDialog','orderFactory',function($scope,$rootScope,menuFactory,ngDialog,orderFactory) {
         $scope.checkingg = function(){
                console.log('order control');

            }

          $scope.order =  orderFactory.query(
                function (response) {
                    $scope.orders = response;
                    console.log($scope.orders);
                     $scope.purchaseditems = $scope.order.items;

                   console.log(  "items are" + $scope.purchaseditems);
                   // $scope.showMenu = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

                       }])


            .controller('ProductDetailController', ['$scope','$stateParams', 'menuFactory' , 'commentFactory' ,function($scope, $stateParams, menuFactory, commentFactory){
                      $scope.myInterval = 3000;                                                                          
             console.log('hi');
            console.log($stateParams);
            var currentIndex = 0;
              $scope.dish = menuFactory.get({
                    id: $stateParams.id

                })
                .$promise.then(
                    function (response) {
                    //    console.log("i am 2");
                //   console.log($stateParams);
                        $scope.dish = response;
                          $scope.sliderImages = $scope.dish.sliderimage;
                    console.log(   $scope.sliderImages);
                        //$scope.sliderImages = $scope.dish.sliderimage.splice(currentIndex,3);

                        $scope.showDish = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );


            $scope.nextSlider = function(){
                console.log("next");
                currentIndex +=3;
                 $scope.sliderImages = $scope.dish.sliderimage.splice(currentIndex,3);
            }

            function getNextImages(arrayImages,startIndex){
                var img = [];
                for(var i = startIndex ; i< arrayImages.length ; i++){

                }
            }

           /* $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                  .$promise.then(
                      function(response){
                          $scope.dish = response;
                          $scope.showDish = true;
                      },
                      function(response) {
                          $scope.message = "Error: "+response.status + " " + response.statusText;
                      }
                  );
        */

        $scope.selectDish = function(newimg){
            $scope.selectedDish = newimg;

        }

         $scope.update = function () {



           //     commentFactory.save({id: $stateParams.id}, $scope.dish);
         commentFactory.update({id: $stateParams.id}, $scope.dish);

            // console.log($scope.dish);
            // console.log("I a m print");


            }


        }])

        .controller('CarouselDemoCtrl', ['$scope','$stateParams' ,function($scope, $stateParams){
            $scope.myInterval = 3000;
           $scope.slides = [
            {
              image: 'http://lorempixel.com/400/200/'
            },
            {
              image: 'http://lorempixel.com/400/200/food'
            },
            {
              image: 'http://lorempixel.com/400/200/sports'
            },
            {
              image: 'http://lorempixel.com/400/200/people'
            }
          ];

        }])

        .controller('HeadController', ['$scope', '$http','menuFactory', 'corporateFactory','ngDialog','AuthFactory','$rootScope','$localStorage', function ($scope, $http, menuFactory, corporateFactory,ngDialog,AuthFactory,$rootScope,$localStorage) 
        {
              $rootScope.g =[];
             $rootScope.pname ='';
            $rootScope.adminisalive = false;
        $scope.myass = '';
                $scope.loggedIn = false;
            $scope.username = '';
             $rootScope.getuser = '' ;
                 $scope.dish =  menuFactory.query(
                function (response) {
                    $scope.dishes = response;

                   // $scope.showMenu = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });

            if(AuthFactory.isAuthenticated()) {

                $scope.loggedIn = true;

                $scope.username = AuthFactory.getUsername();


            }
          $scope.openLogin = function () {

                ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
            };


              $scope.logOut = function() {
               // $localStorage.remove('name'); 

                   $rootScope.adminisalive = AuthFactory.logoutcheck();

                  AuthFactory.logout();
                $scope.loggedIn = false;

               //    $scope.admincheck='';

         console.log( 'cubix'+$rootScope.adminisalive);


                $scope.username = '';
            };

            $rootScope.$on('login:Successful', function () {
                //condition for dashboard

                $scope.loggedIn = AuthFactory.isAuthenticated();
                $scope.username = AuthFactory.getUsername();
                $rootScope.getuser = $scope.username;
                console.log("name of admin in controller"+$localStorage.get('name'));

              $scope.admincheck = AuthFactory.logincheck() ;
                console.log('check kro'+$scope.admincheck);

                if( $scope.admincheck=='true'){

                    $rootScope.adminisalive='true';
                    console.log("admin is alive");
                }





            });

            $rootScope.$on('registration:Successful', function () {
                $scope.loggedIn = AuthFactory.isAuthenticated();
                $scope.username = AuthFactory.getUsername();
            });

            $scope.stateis = function(curstate) {
               return $state.is(curstate);  
            };

           // 

               console.log($scope.username);
             $scope.reserveTable = function () {
             //   ngDialog.open({ template: 'views/placeorder.html', scope: $scope, className: 'ngdialog-theme-default', controller:"" });
            };





        }])


        .controller('orderController', ['$scope','$stateParams','$rootScope' ,function($scope, $rootScope,$stateParams){


        }])


        .controller('contactController', ['$scope', 'ngDialog','ProductAddFactory', function ($scope, ngDialog,ProductAddFactory) {



        }])

                .controller('ConController', ['$scope', function($scope) {

                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.callme={


        };
                    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

                    $scope.channels = channels;
                    $scope.invalidChannelSelection = false;

                }])

                .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

                  $scope.showLeader = false;
                  $scope.message="Loading ...";
                  corporateFactory.getLeaders().query(
                      function(response){
                          $scope.leaders = response;
                          $scope.showLeader = true;
                                 },
                      function(response) {
                          $scope.message = "Error: "+response.status + " " + response.statusText;

                      }
                  );

                }])


        .controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

            $scope.loginData = $localStorage.getObject('userinfo','{}');

            $scope.doLogin = function() {
                if($scope.rememberMe)
                   $localStorage.storeObject('userinfo',$scope.loginData);

                AuthFactory.login($scope.loginData);

                ngDialog.close();

            };

            $scope.openRegister = function () {
                //ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
               ngDialog.open({ template: 'views/registercustomer.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterCustomerController" });


            };

        }])

        .controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

            $scope.register={};
            $scope.loginData={};

            $scope.doRegister = function() {
                console.log('Doing registration', $scope.registration);

                AuthFactory.register($scope.registration);

                ngDialog.close();

            };
        }])

        .controller('RegisterCustomerController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {

            $scope.register={};
            $scope.loginData={};

            $scope.doRegister = function() {
                console.log('Doing registration', $scope.registration);

                AuthFactory.registercustomer($scope.registration);

                ngDialog.close();

            };
        }])

         .controller('CustomerManagementController', ['$scope', 'customerFactory', function($scope, customerFactory) {

                     $scope.customer =  customerFactory.query(
                function (response) {
                    $scope.customers = response;

                   // $scope.showMenu = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });



                }])

        .controller('addProductController', ['$scope', 'ngDialog','ProductAddFactory', function ($scope, ngDialog,ProductAddFactory) {

            $scope.myob = {



        };
            $scope.dish={

                "image":""
            };

             $scope.add = function() {
             //  console.log('hojaye ga add');
             //  $scope.myimg.image=$scope.files[0].name;
                 console.log( $scope.dish);
                 //$scope.dish.image="";
               ProductAddFactory.save($scope.dish);

            };
           $scope.filesChanged = function(elm) {


        $scope.files=elm.files;
               //$scope.ff =$scope.files;
               $scope.dish.image= "images/"+$scope.files[0].name;

             //  $scope.dish = $scope.files;
        $scope.$apply();


        }

        }])

        .controller('ProductDeleteController', ['$rootScope','$scope', 'ngDialog','ProductDeleteFactory','$route', function ($rootScope,$scope, ngDialog,ProductDeleteFactory,$route) {
              console.log('i sup'+$rootScope.dd);
        //$windowProvider.$get();

            $scope.delete = function() {
               console.log('hojaye ga del');
               ProductDeleteFactory.remove({id:$rootScope.dd});
             //  $window.location.reload();
               //

                ngDialog.close();

                console.log('im good');
        // $route.reload();
            };




        }])

        .controller('cartController', ['$rootScope','$scope', 'ngDialog','ProductDeleteFactory','$route', function ($rootScope,$scope, ngDialog,ProductDeleteFactory,$route) {

        //$windowProvider.$get();


                    $scope.prinf = function (){

                      console.log('i sup'+$rootScope.g);

                    }


        }])

         .controller('createcakeController', ['$scope','$rootScope','ccFactory','ngDialog',function($scope,$rootScope,ccFactory,ngDialog) {

        $scope.showcake = false;
            var singlebase=false;
                  var doublebase=false;
                  var triplebase=false;
                   var bases = false;


             $scope.top1 =     function (ss){

              //  console.log(ss);
                  console.log("Iam clicked");
                var img = document.getElementById(ss);
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
                if(singlebase){

                      ctx.drawImage(img,30, 140, 180, 90);

             }

             if(doublebase){
                      ctx.drawImage(img, 10, 50, 170, 100);

             }
         if(triplebase){
                      ctx.drawImage(img, 10, 150, 200, 137);

             }


             }
             /*


               $scope.border = function(){


               }
               */
              $scope.walls = function(ss){
                  console.log("Iam clicked wall");
                var img = document.getElementById(ss);
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
                if(singlebase){

                     ctx.drawImage(img,25, 170, 190, 120);


             }

             if(doublebase){
                      ctx.drawImage(img, 10, 100, 200, 137);

             }
         if(triplebase){
                      ctx.drawImage(img, 10, 150, 200, 137);

             }



               }
              $scope.borders = function(ss){
                    console.log("Iam clicked border");
                var img = document.getElementById(ss);
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
                if(singlebase){

                     ctx.drawImage(img,25, 130, 200, 100);


             }

             if(doublebase){
                      ctx.drawImage(img, 10, 100, 200, 137);

             }
         if(triplebase){
                      ctx.drawImage(img, 10, 150, 200, 137);

             }


               }

              $scope.base1 = function(mybase){

                  console.log('ok is'+mybase);
                    bases = true;
                    var img = document.getElementById(mybase);
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
               if(bases){

                   ctx.clearRect(0, 0, c.width, c.height);
               }

             ctx.drawImage(img, 10, 50, 220, 250);
                  // console.log('base name'+ mybase);
                   if(mybase=='Single Layer'){
                       console.log("layer is"+mybase);
                       singlebase= true;

                   }
                      if(mybase=='Double Layer'){
                          console.log("layer is"+mybase);
                       doublebase= true;

                   }   if(mybase=='Triple Layer'){
                       console.log("layer is"+mybase);
                       triplebase = true;

                   }
              }


                $scope.cake =  ccFactory.query(
                function (response) {
        //            console.log(response);
                    $scope.circleCakes = response[0].circle;
                    console.log($scope.circleCakes);
        //            $scope.circleCake = $scope.cakes[0].circle;
        //            $scope.cakeCircle = 
                    //  console.log( $scope.circle[0].single[0].name);
                   // $scope.showMenu = true;

                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });


                }])


        ;
