angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'angular-flexslider', 'duScroll'])

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams, $state, $document, $location) {
    //Used to name the .html file

    console.log("Testing Consoles");

    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.homeSlider = [
        'img/slide1.jpg',
        'img/slide2.jpg'
    ];
    $scope.section = {
        one: "views/section/section1.html",
        two: "views/section/section2.html",
        three: "views/section/section3.html",
        four: "views/section/section4.html",
        five: "views/section/section5.html"
    };

    $scope.$on('$viewContentLoaded', function() {
        $('body').addClass('fp-viewing-0');
        $(window).scroll(function() {
          var scroller = $(document).scrollTop();
          var height = $(window).height();
          if (height <= scroller) {
            $('body').removeClass('fp-viewing-0');
          } else {
            $('body').addClass('fp-viewing-0');
          }
        });
      });

      function makeAnimation(id) {
        if (_.isEmpty(id)) {
          id = "home";
        }
        var someElement = angular.element(document.getElementById(id));
        $document.scrollToElement(someElement, 0, 1400);
      }

      $scope.$on('$viewContentLoaded', function(event) {
        setTimeout(function() {
          makeAnimation($stateParams.id);
        }, 1000);
      });


      $scope.changePage = function(id) {
        $scope.menutitle = NavigationService.makeactive(id);
        $state.transitionTo('home', {
          id: id
        }, {
          notify: false
        });
        makeAnimation(id);
        $location.replace();
      };

    $scope.hows = [{
        icon: 'img/i1.png',
        title: 'Barter',
        desc: 'Barter is perhaps the worlds oldest system of trade. We all have heard and studied in school about how people used to barter for sustenance before the advent of money, the currency. Swaap advocates the age old Barter system to be used by corporate /individual business for mutual win-win deals.'
    }, {
        icon: 'img/i2.png',
        title: 'Who We Are',
        desc: 'Swaap has built its impeccable reputation on solid financials, ethical and vigilant trading practices and creating barter system that’s designed to help its vendors thrive. It’s vast and growing network of active vendors sets swaap apart in an important way.'
    }, {
        icon: 'img/i4.png',
        title: 'Power Of Barter',
        desc: ' A true focus on service, rock solid financial stability and a reputation for integrity and Transparency in all its dealings. Swaap vendors comprise all facets of industry, print etc. Smart businesses are growing more productive, efficient and successful with the power of barter.'
    }, {
        icon: 'img/i3.png',
        title: 'Buisness stratergy',
        desc: 'With swaap, barter becomes a smart part of your business strategy. One can improve your Cash-flow, profit picture and sales efficiency all through corporate barter. As your trading partner, it makes sure that you receive quality personal service to get you exactly what you need.'
    }];
    $scope.animationsEnabled = true;
    $scope.open = function(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/registration.html',
            controller: 'HomeCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

    };
})

.controller('headerctrl', function($scope, TemplateService, $state) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.goToLogin = function() {
        console.log("login");
        $state.go('memberlogin');
    }
    $scope.menu = "menu-out";
    $scope.getMenu = function() {
        $(".side-menu").addClass("menu-in");
        $(".side-menu").removeClass("menu-out");
    };
    $scope.closeMenu = function() {
        $(".side-menu").removeClass("menu-in");
        $(".side-menu").addClass("menu-out");
    };

    $(".template.content").click(function() {
        $(".side-menu").removeClass("menu-in");
        $(".side-menu").addClass("menu-out");
    });
})

.controller('languageCtrl', function($scope, TemplateService, $translate, $rootScope) {

    $scope.changeLanguage = function() {
        console.log("Language CLicked");

        if (!$.jStorage.get("language")) {
            $translate.use("hi");
            $.jStorage.set("language", "hi");
        } else {
            if ($.jStorage.get("language") == "en") {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                $translate.use("en");
                $.jStorage.set("language", "en");
            }
        }
        //  $rootScope.$apply();
    };


})

;
