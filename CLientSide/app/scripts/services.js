'use strict';

angular.module('cnc')

  .constant("baseURL","http://localhost:3000/")

.service('menuFactory', ['$resource', 'baseURL','$http', function($resource,baseURL,$http) {

return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });
    /*
     this.getDishes = function(){
          return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
 };*/

  }])
 

.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", {id:"@Id"}, {
            'update': {
                method: 'PUT'
            }
        });

}])


.factory('ProductDeleteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", {id:"@Id"}, {
            'remove': {
                method: 'DELETE'
            }
        });
}])

.factory('ProductAddFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/",{},{
            'save': {
                method: 'POST',
              
                
            }
        });
}]) 

.factory('orderFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

return $resource(baseURL + "orders/", null, {
            'get': {
                method: 'GET'
            }
        });

}]) 

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])
  
  .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {

      var corpfac = {};

      corpfac.getLeaders = function(){
          return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
      };

      return corpfac;

  }])


.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])


.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    
    //empty object
    var authFac = {};
    //variable defined
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    var admin = {};
    
  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
      
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
      //common shows that headers are common for all requests
      //for put re quest
      //$httpProvider.defaults.headers.put
  }
    
    function getAdmin(){
        return adam;
    }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
      
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }
     
    authFac.login = function(loginData) {
       var admin='';
        $resource(baseURL + "users/login")
        
        .save(loginData,
           function(response) {
           
              storeUserCredentials({username:loginData.username, token: response.token});
             admin = response.adam;
            console.log("thu is cont admin"+admin);
            $localStorage.store('name',admin);
  console.log("the admin"+$localStorage.get('name'));
            $rootScope.$broadcast('login:Successful');
           
            //  $localStorage.store("admin",  admin);
           // localStorage.setItem("admin", admin);
        // response.adam ki value ko controller se acces krna hai jb wo yaha hume mily gi    
      
            
            
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };
 
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
         
             console.log('I am in logout service'+$localStorage.get('name'));
        });
        destroyUserCredentials();
    };
   authFac.logoutcheck = function() {
       
         $localStorage.store('name','false');
        console.log('logout check click'+ $localStorage.get('name') );
       return $localStorage.get('name') ;
    };
    authFac.logincheck = function() {
        console.log('login check click'+ $localStorage.get('name') );
       return $localStorage.get('name') ;
    };
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
        authFac.registercustomer = function(registerData) {
        
        $resource(baseURL + "customers/registercustomer")
        .save(registerData,
           function(response) {
              authFac.login({username:registerData.username, password:registerData.password});
            if (registerData.rememberMe) {
                $localStorage.storeObject('userinfo',
                    {username:registerData.username, password:registerData.password});
            }
           
              $rootScope.$broadcast('registration:Successful');
           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    
    
    authFac.isAuthenticated = function() {
        
 
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        
        return username;  
    };

    loadUserCredentials();
    
    return authFac;
    
}])

.service('customerFactory', ['$resource', 'baseURL','$http', function($resource,baseURL,$http) {

return $resource(baseURL + "customers/", null, {
            'update': {
                method: 'PUT'
            }
        });
    /*
     this.getDishes = function(){
          return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
 };*/

  }])
 
.service('ccFactory', ['$resource', 'baseURL','$http', function($resource,baseURL,$http) {
 
return $resource(baseURL + "cakes/", null, {
            'update': {
                method: 'PUT'
              
            }
        });
     

  }])


;
