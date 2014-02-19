
angular.module('PostService', ['ngResource']).factory('Post', ['$resource',function ($resource) {

    function Post() {
        this.service = $resource('/api/posts/:Id', {Id: '@id'},
            {
                update: { method: 'PUT', params: {} }
            });
    }
    Post.prototype.all = function() {
        return this.service.query();
    };

    Post.prototype.delete = function(Id) {
        return this.service.remove({Id: Id});
    };

    Post.prototype.update = function(id,title,text_data) {
        return this.service.update({Id: id},{Id: id,title : title,text_data : text_data});
    };

    Post.prototype.get = function(Id){
        return this.service.get({Id:Id});
    };

    Post.prototype.create = function(attr) {
        return this.service.save(attr);
    }

    return new Post;
}]);


angular.module('CommentService', ['ngResource']).factory('Comment', ['$resource',function ($resource) {
    function Comment() {
        this.service = $resource('/api/comments/:Id',{Id : '@id'});
    }

    Comment.prototype.all = function(postId) {
        return this.service.query({post_id : postId});
    };

    Comment.prototype.delete = function(Id) {
        return this.service.remove({Id: Id});
    };
//
    Comment.prototype.get = function(postId){
        return this.service.get({post_id : postId});
    };

    Comment.prototype.create = function(postId,textData) {
        return this.service.save({post_id:postId,text_data : textData});
    }

    return new Comment;
}]);


angular.module('sessionService', [])
    .factory('Session', function($location, $http, $q) {
        function redirect(url) {
            url = url || '/';
            $location.path(url);
        }
        var service = {
            login: function(email, password,complete) {
                return $http.post('/login', {user: {email: email, password: password} })
                    .then(function(response) {

                        service.currentUser = response.data.user;
                        complete(service.isAuthenticated(),response);
                        if (service.isAuthenticated()) {
                            $location.path('/');
                        }
                    });
            },

            logout: function(redirectTo) {
                $http.post('/logout').then(function() {
                    service.currentUser = null;
                    redirect(redirectTo);
                });
            },

            register: function(name,surname,birthdate,sex,email, password, confirm_password) {
                var userModel ={
                    name: name,
                    surname :surname,
                    birthdate : birthdate,
                    sex : sex,
                    email : email,
                    password: password,
                    password_confirmation: confirm_password

                };
                console.log(userModel);
                return $http.post('/users.json', {user: userModel })
                    .then(function(response) {
                        service.currentUser = response.data;
                        if (service.isAuthenticated()) {
                            $location.path('/record');
                        }
                    });
            },
            requestCurrentUser: function() {
                if (service.isAuthenticated()) {
                    return $q.when(service.currentUser);
                } else {
                    return $http.get('/current_user').then(function(response) {

                        service.currentUser = response.data.user;

                        return service.currentUser;
                    });
                }
            },

            currentUser: null,

            isAuthenticated: function(){


                return !!service.currentUser;
            }
        };
        return service;
    });







var app = angular.module('blog', ['PostService','sessionService','CommentService','ngRoute','ngCookies'])
    .config(['$httpProvider', function($httpProvider){
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

        var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
            function success(response) {
                return response
            };

            function error(response) {
                if (response.status == 401) {
                    $rootScope.$broadcast('event:unauthorized');
                    $location.path('/login');
                    return response;
                };
                return $q.reject(response);
            };

            return function(promise) {
                return promise.then(success, error);
            };
        }];
        $httpProvider.responseInterceptors.push(interceptor);
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/home', {templateUrl: 'templates/posts', controller: PostCtl}).
            when('/post', {templateUrl : 'templates/post',controller: PostCtl }).
            when('/create_post', {templateUrl : 'templates/create_post',controller: PostCtl }).
            when('/login', {templateUrl : 'templates/login',controller: LoginCtl }).
            when('/register', {templateUrl : 'templates/register',controller: LoginCtl }).
            when('/post', {templateUrl : 'templates/post',controller: PostCtl }).
            when('/about', {templateUrl : 'templates/about' }).
            otherwise({redirectTo: '/home'});
    }]).config(["$httpProvider", function (provider) {
        provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }]);

app.service('StorageService', function() {
    var storage = {};

    var addData = function(key,data) {

        storage[key]=data;
    };
    var getData = function(key){

        return storage[key];
    };

    return {
        addData : addData,
        getData : getData
    }
});




