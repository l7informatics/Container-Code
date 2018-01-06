var lengthOfRows = 8;
var lengthOfColumn = 12;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var xdim = parseInt(espObject.get("container_type").get("meta").dims[0]);
var ydim = parseInt(espObject.get("container_type").get("meta").dims[1]);

var plateViewHTML = "<div class='plateview'></div>";
var plateHTML = "<div class='plate'></div>";
var containerHTML = "<div class='container'></div>";
var intializer = "<div class='label _00 blank'> </div>";

$(document).ready(function() {

    $('#custom-view').append(plateViewHTML);
    $('.plateview').append(plateHTML);
    $('.plate').append(containerHTML);
    $('.container').append(intializer);

    for (var i = 1; i <= ydim; i++) {

        if (i < 10) {
            $('.container').append("<div class='label _0" + i + "'>" + i + "</div>");
        } else {
            $('.container').append("<div class='label _" + i + "'>" + i + "</div>");

        }
    }

    for (var i = 0; i < xdim; i++) {
        $('.container').append("<div class='label " + alphabet[i] + "'>" + alphabet[i] + "</div>");
        for (var j = 0; j < ydim; j++) {
            if (j < 10) {
                $('.container').append("<div class='tooltip'><li class='well " + alphabet[i] + "_0" + (j + 1) + "'>" + alphabet[i] + (j + 1) + "" +
                    "<span class='tooltiptext'></span>" +
                    "<ul></ul>" +
                    "</li></div>");
            } else {
                $('.container').append("<div class='tooltip'><li class='well " + alphabet[i] + "_" + (j + 1) + "'>" + alphabet[i] + (j + 1) +
                    "<span class='tooltiptext'></span>" +
                    "<ul></ul>" +
                    "</li></div>");
            }
        }
    }


    var containers = Array.prototype.slice.call(document.querySelectorAll("ul"));

    var opts = {allowNestedContainers: true};
    opts = {
        accepts: function (el, target, source, sibling) {
            // prevent dragged containers from trying to drop inside itself
            return !contains(el,target);
        }
    };

});