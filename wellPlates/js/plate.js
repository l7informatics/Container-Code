var lengthOfRows = 8;
var lengthOfColumn = 12;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var plateViewHTML = "<div class='plateview'></div>";
var plateHTML = "<div class='plate'></div>";
var containerHTML = "<div class='container'></div>";
var intializer = "<div class='label _00 blank'>&nbsp;</div>";

$(document).ready(function() {

    $('#custom-view').append(plateViewHTML);
    $('.plateview').append(plateHTML);
    $('.plate').append(containerHTML);
    $('.container').append(intializer);

    for (var i = 1; i <= lengthOfColumn; i++) {

        if (i < 10) {
            $('.container').append("<div class='label _0" + i + "'>" + i + "</div>");
        } else {
            $('.container').append("<div class='label _" + i + "'>" + i + "</div>");

        }
    }

    for (var i = 0; i < lengthOfRows; i++) {
        $('.container').append("<div class='label " + alphabet[i] + "'>" + alphabet[i] + "</div>");
        for (var j = 0; j < lengthOfColumn; j++) {
            if (j < 10) {
                $('.container').append("<div class='tooltip'><li class='well " + alphabet[i] + "_0" + (j + 1) + "'>" + alphabet[i] + (j + 1) + "" +
                    "<span class='tooltiptext'></span>" +
                    "</li></div>");
            } else {
                $('.container').append("<div class='tooltip'><li class='well " + alphabet[i] + "_" + (j + 1) + "'>" + alphabet[i] + (j + 1) +
                    "<span class='tooltiptext'></span>" +
                    "</li></div>");
            }
        }
    }

});