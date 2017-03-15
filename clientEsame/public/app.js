/**
 * Created by MicheleSpinello on 15/02/2017.
 */

    var app = angular.module('client',[]);

    app.factory('GET',function GET($http){

        /*return $http.get('localhost:3000/users');*/
        return{
            flowers: function () {
                return $http.get('http://localhost:3000/flowers');

            }
        }
    });
    app.factory('POST',function POST($http) {
        return {
            createFlower:function (data) {
                var urlG = "http://localhost:3000/flowers";
                return $http.post(urlG,data);
            }
        }
    })
    app.factory('PUT',function PUT($http) {
        return{
            editFlower:function (data) {
                var urlP = "http://localhost:3000/flowers/"+data._id;
                return $http.put(urlP,data);
            }
        }
    })
    app.factory('DELETE',function DELETE($http) {
        return{
            deleteFlower:function (id) {
                var urlP = "http://localhost:3000/flowers/"+id;
                return $http.delete(urlP);
            }
        }
    })

    app.controller('clientH',function ($scope,GET,POST,PUT,DELETE) {

        $scope.tab=0;

        $scope.mesg="";

        $scope.data = {
            name:"",
            nPetal:{type:Number},
            colour:""
        }

        $scope.id="";

        $scope.showFlower=function(){
            GET.flowers().then(function (response) {
                    $scope.flowers=response.data;
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};

        $scope.insertFlower=function () {
            POST.createFlower($scope.data).then(function (response) {
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};

        $scope.modFlower=function () {
            PUT.editFlower($scope.data).then(function (response) {
                console.log(response);
                },function (err) {
                    console.log(err);
                }
            )};
        $scope.getFlower=function (flower) {
            $scope.data=flower;
        }
        $scope.eraseFlower=function (id) {
            DELETE.deleteFlower(id)
            console.log("QUI")
        }
    })
