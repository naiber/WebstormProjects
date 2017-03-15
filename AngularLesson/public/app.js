(function() {
    var app = angular.module('store', []);

    app.factory('Project',function Project($http){
       return{
           contributors: function (rep,name) {
               return $http.get('https://api.github.com/repos/'+rep+'/'+name+'/contributors');
               console.log(response);
           }
       }
    });

    app.controller('storeController', function ($scope,Project) {

        $scope.repos="";
        $scope.nameP="";

        $scope.dynamicUsers=function(){
            Project.contributors($scope.repos,$scope.nameP).then(function (response) {
            $scope.contributors=response.data;
        },function (err) {
            console.log(err);
            }
        )};



        $scope.name="";
        $scope.i=0;
        $scope.fontSize = 12;
        $scope.addFont = function () {
            $scope.fontSize = $scope.fontSize +1;
            $scope.customCss = {'font-size':  $scope.fontSize +'px'}
        }

        $scope.addFontExp = function () {
            $scope.fontSize = $scope.fontSize +10;
            $scope.customCss = {'font-size':  $scope.fontSize +'px'}
        }

        $scope.removeFont = function () {
            $scope.fontSize = $scope.fontSize -1;
            $scope.customCss = {'font-size':  $scope.fontSize +'px'}
        }

        $scope.removeFontExp = function () {
            $scope.fontSize = $scope.fontSize -10;
            $scope.customCss = {'font-size':  $scope.fontSize +'px'}
        }

        $scope.gems = [{
                        name: "dodecahedron",
                        price: 100,
                        canPurchase: function(){
                            return this.nProducts>this.item;
                        },
                        soldOut: false,
                        item:0,
                        nProducts:10,
                        rank:128,
                        img:"https://img.fasttechcdn.com/121/1210807/1210807-3.jpg"
                    },
                    {
                        name: "pentagonalgem",
                        price: 1000,
                        canPurchase: function(){
                            return this.nProducts>this.item;
                        },
                        soldOut: false,
                        item:0,
                        nProducts:7,
                        rank:3,
                        img:"http://pre05.deviantart.net/e7cc/th/pre/f/2012/199/0/8/gem_png_by_doloresdevelde-d57oyqr.png"
                    },
                    {
                        name: "diamond",
                        price: 1500,
                        canPurchase: function(){
                            return this.nProducts>this.item;
                        },
                        soldOut: false,
                        item:0,
                        nProducts:5,
                        rank:1,
                        img:"https://www.gia.edu/images/diamond_1355958458647.png"
                    }];

        $scope.finalSum = function(){
            var sum = 0;
            for(var i=0;i<this.gems.length;i++){
                sum = sum+this.gems[i].item;
            }
            return sum;
        };

        $scope.finalSale = function(){
            var cost = 0;
            for(var i=0;i<this.gems.length;i++){
                cost = cost+(this.gems[i].item*this.gems[i].price);
            }
            return cost;
        }

        $scope.resetAll = function(){
            for(var i=0;i<this.gems.length;i++){
                this.gems[i].item=0;
            }
            return this.gems.item;
        }

        $scope.buyAll = function(){
            for(var i=0;i<this.gems.length;i++){
                this.gems[i].item=this.gems[i].nProducts;
            }
            return this.gems.item;
        }


    });
    app.filter('capitalize',function () {
        return function (input) {
            return input.charAt(0).toUpperCase()+input.substring(1,input.length);
        }
    });
    app.filter('rankStar',function () {
        return function (input) {
            var star='';
            for(var i=0;i<input;i++){
                star=star+'*';
            }
            return star;
        }
    });
    app.filter('toHex',function () {
        return function (input) {
            return input.toString(16);
        }
    });
    /*app.controller('myCtrl', function($scope) {
        $scope.count = 0;
    });*/
})();