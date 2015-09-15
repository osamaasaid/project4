console.log('loaded');

var myApp = angular.module('newsApp', [])
  .controller('listArticles' ['$scope', '$http' function('$scope', '$http'){

      $scope.display = function(){

        $http[{
          method:'GET',
          url:'https://faroo-faroo-web-search.p.mashape.com/api'
        }]
      }

  }])

myApp.run(function(){
  console.log('Hello there!!!');
});

