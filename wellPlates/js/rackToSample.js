var lengthOfRows = 8;
var lengthOfColumn = 12;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var contents = espObject.get("items");
var xdim = parseInt(espObject.get("container_type").get("meta").dims[0]);
var ydim = parseInt(espObject.get("container_type").get("meta").dims[1]);
var dummy_container;

var plateViewHTML = "<div class='plateview'></div>";
var plateHTML = "<div class='plate'></div>";
var containerHTML = "<div class='container'></div>";
var intializer = "<div class='label _00 blank'> </div>";

$(document).ready(function() {
    console.log(contents);

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
                    "<ul id = " + alphabet[i] + (j +1) + "  style = 'height: 2.25em; width: 2.25em'></ul>" +
                    "</li></div>");
            } else {
                $('.container').append("<div class='tooltip'><li class='well " + alphabet[i] + "_" + (j + 1) + "'>" + alphabet[i] + (j + 1) +
                    "<span class='tooltiptext'></span>" +
                    "<ul id = " + alphabet[i] + (j +1) + " style = 'height: 2.25em; width: 2.25em'></ul>" +
                    "</li></div>");
            }
        }
    }


    for (var i = 0; i < contents.length; i++) {
        if (contents[i].item_uuid !== null) {

            var button = document.createElement("a");
            var innerTextRenderedItem =
                ResourceApp.models.samples.get((contents[i].item_uuid)).get("name");
            button.innerHTML = innerTextRenderedItem;
            console.log(innerTextRenderedItem);
            $('#' + contents[i].label).parent().find("span").append(button);
            button.setAttribute("class", "button");
            button.setAttribute("href", "/app/container/container-library#container/" + contents[i].item_uuid);
            button.setAttribute("style", "position:relative;top:5px;");
            var idOfTarget = contents[i].label;
            $('#' + contents[i].label).closest("li").css("background", "#2A92BF");

        }
    }

    var  sampleContainerArrays = [];
    for (var i = 0; i < xdim; i++) {
        for (var j = 0; j < ydim; j++) {
            sampleContainerArrays.push(document.getElementById(alphabet[i] + (j + 1)));
        }
    }
    sampleContainerArrays.push(document.getElementById("pool-list"));

    var containers = Array.prototype.slice.call(document.querySelectorAll("ul"));

    var opts = {allowNestedContainers: true};
    opts = {
        accepts: function (el, target, source, sibling) {
            // prevent dragged containers from trying to drop inside itself
            return !contains(el,target);
        }
    };

    dragula(sampleContainerArrays, containers, opts).on("drop", function(el, target, source) {

        console.log(target);
        revertOnSpill: true;
        $('#save-container').addClass('on');
        $('#save-container').removeClass('off');
        var itemUuid = jQuery(el).attr("uuid");
        var labelOfTarget = jQuery(target).attr("id");
        var button = document.createElement("a");

        for (var i = 0; i < contents.length; i++) {
            if (contents[i].label === labelOfTarget) {
                contents[i].item_uuid = itemUuid;
            }
        }

        var addedString = jQuery(el).find("div:first-child");
        var innerText = addedString[0].innerText;
        button.innerHTML = innerText;

        jQuery(target).parent().find("span").append(button);
        button.setAttribute("class", "button");
        button.setAttribute("href", "/app/sample/sample-library#sample/" + itemUuid);
        button.setAttribute("style", "position:relative;top:-15px;");
        el.remove();

    }).on("over", function(el, container, source) {
        if (dummy_container === container) {
            jQuery(container).closest(".well").css("background-color", "red");
        } else {
            jQuery(container).closest(".well").css("background-color", "red");
            jQuery(dummy_container).closest(".well").css("background-color", "white");
            dummy_container = container;
        }

    });

});