/**
 * Created by MicheleSpinello on 27/02/2017.
 */
$(document).ready(function() {

    $("#myCarousel").owlCarousel({
        singleItem: true,
        startPosition : -1,
        autoPlayDirection : "rtl",

    });

});

/**
 * This was built using the scrollie jQuery Plugin
 * https://github.com/Funsella/jquery-scrollie
 */


$( window ).ready(function() {

    var wHeight = $(window).height();

    $('#myNav')
        .height(wHeight)
        .scrollie({
            scrollOffset : -50,
            scrollingInView : function(elem) {

                var bgColor = elem.data('background');

                $('#myNav').css('background-color', bgColor);

            }
        });

});