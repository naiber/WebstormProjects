/**
 * Created by MicheleSpinello on 15/02/2017.
 */

    var app = angular.module('client',[]);

    app.factory('Project',function Project($http){

        /*return $http.get('localhost:3000/users');*/
        return{
            users: function () {
                return $http.get('http://localhost:3000/users');

            }
        }
    });
    app.factory('Service',function Service($http) {
        return {
            createUser:function (data) {
                var urlG = "http://localhost:3000/users";
                return $http.post(urlG,data);
            }
        }
    })
    app.factory('Put',function Put($http) {
        return{
            editUser:function (data) {
                var urlP = "http://localhost:3000/users/:"+data._id;
                return $http.put(urlP,data);
            }
        }
    })

    app.controller('clientH',function ($scope,Project,Service,Put) {

        $scope.tab=0;

        $scope.mesg="";

        $scope.data = {
            _id:"",
            name:"",
            surname:"",
            birthDate:{type:Date}
        }
        $scope.showUsers=function(){
            Project.users().then(function (response) {
                    $scope.users=response.data;
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};

        $scope.insertUser=function () {
            console.log($scope.data);
            Service.createUser($scope.data).then(function (response) {
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};

        $scope.modUser=function () {
            Put.editUser($scope.data).then(function (response) {
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};
    })
