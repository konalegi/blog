
angular.module('PostService', ['ngResource']).factory('Post', ['$resource',function ($resource) {
    function Post() {
        this.service = $resource('/api/posts/:Id', {Id: '@id'});
    }
    Post.prototype.all = function() {
        return this.service.query();
    };

    Post.prototype.delete = function(Id) {
        return this.service.remove({Id: Id});
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
        this.service = $resource('/api/comments',{post_id: '@postId'});
    }

    Comment.prototype.all = function(postId) {
        return this.service.query({post_id : postId});
    };

//    Post.prototype.delete = function(Id) {
//        return this.service.remove({Id: Id});
//    };
//
    Comment.prototype.get = function(postId){
        return this.service.get({post_id : postId});
    };

    Comment.prototype.create = function(postId,textData) {
        return this.service.save({post_id:postId,text_data : textData});
    }

    return new Comment;
}]);



angular.module('authentication', [])

    .config(function($httpProvider){
        var interceptor = function($q, $location, $rootScope) {
            return {
                'responseError': function(rejection) {
                    if (rejection.status == 401) {
                        $rootScope.$broadcast('event:unauthorized');
                        $location.path('/login');
                        return rejection;
                    }
                    return $q.reject(rejection);
                }
            };
        };
        $httpProvider.interceptors.push(interceptor);
    });



var app = angular.module('blog', ['PostService','CommentService','ngRoute','authentication','ngCookies']).
    config(['$routeProvider', function ($routeProvider) {
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


