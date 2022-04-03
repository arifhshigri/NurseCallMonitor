function normalize_bedId(id, isRoom = false, reverse = false) {
    return reverse ? id.replace(isRoom ? "Room_" : "Bed_", '') : isRoom ? `Room_${id}`:`Bed_${id}`;
}
var grid_x = 10;
var grid_y = 10;
var snapThreshold = 5;
var snapWhileResizing = true;
(function ($) {

    $.fn.getStyleObject = function () {
        var dom = this.get(0);
        var style;
        var returns = {};
        if (window.getComputedStyle) {
            var camelize = function (a, b) {
                return b.toUpperCase();
            };
            style = window.getComputedStyle(dom, null);
            for (var i = 0, l = style.length; i < l; i++) {
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = val;
            };
            return returns;
        };
        if (style = dom.currentStyle) {
            for (var prop in style) {
                returns[prop] = style[prop];
            };
            return returns;
        };
        return this.css();
    }

    $("#btnSaveFloor").click(function () {
        floorName = $("#FloorName").val();
        if (!floorName) {
            alert("Floor Name is required.")
            return;
        }
        data = {
            "FloorName": floorName,
            "FloorData": JSON.stringify(SaveFloor())
        }
        $.ajax({
            type: 'POST',
            url: 'AddFloor',
            data: data,
            dataType: 'json',
            success: function (data) {
                alert("Successfully Save.");
                if (window.location.href.indexOf(`floorName=`) > -1)
                 {
                    window.location.href = window.location.href
                }
                else
                {
                    window.location.href = (`${window.location.href}?floorName=${floorName.trim()}.json`);
                }
            },
            error: function (xhr, textStatus, error) {
                alert("Unsuccessfully! please try again.")
            }
        });

      
    });

})(jQuery);

$(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
});
$(function () {

    /***/
    $.each($(".floor-object") || [], function (index, ele) {
        draggable_C($(ele).attr('id') , "#containment-wrapper")
    })
    for (var i = 12; i < 100; i += 12) {
        $("#selectFontSize").append(`<option value='${i}px'>${i} px</option>`)
    }
      /****/

    //$('#btnFullScreen').click(function (e) {
    //    $('div.full-size').toggleClass('full-screen');
    //});
   
    //$(".floor-object").resizable({
    //    //handles: 'e, w'
    //});

    $(document).on('click', 'i.close', function (ev) {
        $(event.target).closest('div.closeable').remove();
    });

    $(document).on('click', 'i.edit', function (ev)
    {
        roomLabel = $(ev.target).closest('div.RoomCls').find('h2.room-label').text().trim()
        bedLabel=$(ev.target).closest('div.RoomCls').find('h2.bed-label').text().trim()
        bedNumber = $(ev.target).closest('div.RoomCls').find('div.bed').attr("id");
        $('#defaultModalSuccess').find('input[name="RoomLabel"]').val(roomLabel);
        $('#defaultModalSuccess').find('input[name="BedLabel"]').val((bedLabel));
        $('#defaultModalSuccess').find('input[name="BedNumber"]').val(normalize_bedId(bedNumber, false,reverse = true));
        modalobj=$('#defaultModalSuccess');
        modalobj.find('.modal-title').text('Edit Room');
        modalobj.find('.modal-title').data('IsEdit', true);
        modalobj.find('.modal-title').data('BedId', bedNumber);
        modalobj.modal("show");
    });

   
    $("#btn-show-add-room-form").click(function (e) {
        $('#defaultModalSuccess').modal({
            backdrop: 'static',
            keyboard: false
        })
    });

    $("#btnRoomSave").click(function (e) {
        ele = $("#sample_bed_room").clone();
        roomData = $('#addRoomForm').serializeObject();
        e.preventDefault();
        if (!roomData['BedNumber'] || !roomData['RoomLabel'])
        {
            e.preventDefault();
            alert("Please enter the details.");
            return false;
        }
        modalobj = $('#defaultModalSuccess');
        isEdit=modalobj.find('.modal-title').data('IsEdit')
        edit_bedId = modalobj.find('.modal-title').data('BedId')
        id = (roomData['RoomLabel'] || "").replace(' ', '_');
        bedId = normalize_bedId(roomData["BedNumber"])
        if (isEdit && edit_bedId) {
            room = $(`#${edit_bedId}`).closest('.RoomCls');
            $(room).find('div.bed').attr("id", bedId);
            $(room).find('.bed-label').text((roomData['BedLabel']))
            $(room).find('.room-label').text((roomData['RoomLabel']))
        } else {
            if ($(`#${bedId}`).length > 0) {
                alert('Invalid Bed Number')
                return false;
            }
            add_bed_room_toFloor(ele,roomData, bedId)
        }
    });
    $("#btnAddRoom").on("click", function (e) {
        modalobj = $('#defaultModalSuccess');
        modalobj.modal("show");
        modalobj.find('input[name="RoomLabel"]').val('');
        modalobj.find('input[name="BedLabel"]').val('') ;
        modalobj.find('input[name="BedNumber"]').val('');
        modalobj.find('.modal-title').data('IsEdit', false);
        modalobj.find('.modal-title').data('BedId', '');
    })
    $("#showTextModal").on("click", function (event) {
        $('#exampleModalLong').modal("show");
        $("#FloorTextArea").val('');
      $("#selectFontSize").val('');
    });
    $("#addBoxBtn").on("click", function (event) {
        $('#boxModal').modal("show");
        $("#BoxColor").val('');
    });
    $("#AddBox").on("click", function (event) {
        color = $("#BoxColor").val();
        ele_id= add_box_toFloor(color)
        draggable_C(ele_id, "#containment-wrapper")

    });
    $(document).on("click", "#btnAddText", function(e){
        text = $("#FloorTextArea").val(); 
        fontSize = $("#selectFontSize").val(); 
        add_text_toFloor(text, fontSize)
    })
    

});

$('#toggle_fullscreen').on('click', function () {
    // if already full screen; exit
    // else go fullscreen
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        element = $('#containment-wrapper').get(0);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
});




function add_bed_room_toFloor(ele, roomData, bedId, isresizeable = true, isdraggable = true) {
    id = (roomData['RoomLabel'] || "").replace(' ', '_');
    ele_id = normalize_bedId(id, true);
    $(ele).find('div.bed').attr("id", bedId);
    $(ele).find('.bed-label').text((roomData['BedLabel']))
    $(ele).find('.room-label').text((roomData['RoomLabel']))
    $(ele).css("display", '')
    $(ele).addClass("floor-object")
    $(ele).attr("id", ele_id)

    //if (isresizeable)
    //    $(ele).resizable({
    //    //handles: 'e, w'
    //});
    $('#containment-wrapper').append(ele);
    //$(".floor-object").resizable({
    //    //handles: 'e, w'
    //});
    //$(".floor-object").draggable({ containment: , scroll: false });
    //draggable_C(".floor-object", "#containment-wrapper")

    if (isdraggable)
        draggable_C($(ele).attr('id'), "#containment-wrapper")
}

function add_box_toFloor(color) {
    ele = $('<div>').addClass("floor-box closeable box_container floor-object").append('<i class="cursor-pointer fas fa-trash close"></i>').css("background-color", color).attr("id", `Box_${parseInt(Math.random() * 1000000)}`)
    ele_id = gen_Id('box');
    $(ele).attr("id", ele_id)

    $('#containment-wrapper').append(ele);
    //$(".floor-box").resizable();

    return ele_id
}
function add_text_toFloor(text, fontSize) {
    ele = $("<h2>")
    $(ele).text(text.trim()).css('font-size', fontSize);
    div = $("<div>").append('<i class="cursor-pointer fas fa-trash close"></i>')
        .append(ele).addClass("text_container closeable draggable-heading floor-object")
    $('#containment-wrapper').append(div);
    //$(div).resizable();
    ele_id = gen_Id('box');
    $(div).attr("id", ele_id)
    draggable_C(ele_id, "#containment-wrapper")

}
function SaveFloor() {
    jsonObj = new Array();
    $('#containment-wrapper>.floor-object').each(function (index, ele) {
        //$(ele).hasClass("RoomCls")
        obj = new Object();
 
        if ($(ele).hasClass("RoomCls"))
        {
            obj['objectType']='room'
            obj["BedLabel"]=$(ele).find('div.bed-label').text();
            obj["RoomLabel"]=$(ele).find('div.room-label').text();
            obj["bed_id"] =$(ele).find('div.bed').attr("id");
        }
        if ($(ele).hasClass("text_container")) {
            obj['objectType'] = 'text';
            obj['text'] = $(ele).find('h2').text();
            obj['TextStyle'] = $(ele).find('h2').attr('style');
        }
        if ($(ele).hasClass("box_container")) {
            obj['objectType'] = 'box';
        }
            //rmCls = ["ui-resizable", "ui-draggable", "ui-draggable-handle"]
             //$.each(rmCls, function (index, cls) 
             //   {
             //       $(ele).removeClass(cls);
             //       console.log("removing " + cls)
             //   })

        attrs = []
        $.each((ele.attributes || []), function (index, ele) {
            atob = {}
            atob[(ele.name || ele.nodeName)] = (ele.nodeValue || ele.value);
            attrs.push(atob);
        })
        obj['DOMAttributes'] = attrs
        jsonObj.push(obj);
    })
    return jsonObj;
}
function add_dom_attr(element, attr) {
    $.each(attr || [], function (index, e) {
        if (e) {
            $.each(Object.keys(e) || [], function (ki, key) {
                $(element).attr(key, e[key]);
            })
        }
    });
}

function render_text(obj, isresizeable = false, isdraggable = false) {
    ele = $("<h2>")
    $(ele).text((obj.text || "").trim());
    div = $("<div>").append('<i class="cursor-pointer fas fa-trash close"></i>')
        .append(ele).addClass("text_container closeable draggable-heading floor-object")
    if (obj.DOMAttributes) {
        add_dom_attr(div, obj.DOMAttributes);
    }
    $(div).find("h2").attr('style', obj.TextStyle);
    //ele_id = gen_Id('box');
    //$(ele).attr("id", ele_id)

    $('#containment-wrapper').append(div);
    //if (isresizeable)
        //$(div).resizable();

    //$(".draggable-heading").draggable({ containment: "#containment-wrapper" });

    if (isdraggable)
        draggable_C($(div).attr('id'), "#containment-wrapper")


}
function gen_Id(type) {
    var flag = true
    var id = '';
    do
    {
        id = `${type}_${Math.random().toString(36)}`;
        flag = !!document.getElementById(id);
    } while (flag)
    return id;
}
function render_box(obj, isresizeable = false,isdraggable=false) {
    ele = $('<div>').addClass("floor-box closeable box_container floor-object").append('<i class="cursor-pointer fas fa-trash close"></i>').css("background-color", obj.color).attr("id", `Box_${parseInt(Math.random() * 1000000)}`)
    if (obj.DOMAttributes) {
        add_dom_attr(ele, obj.DOMAttributes);
    }
    //if (isresizeable)
    //    $(ele).resizable();
    //draggable_C(".floor-box", "#containment-wrapper")
  
    $('#containment-wrapper').append(ele);
    if (isdraggable)
        draggable_C($(ele).attr('id'), "#containment-wrapper")
}

function render_room(obj, isresizeable = false, isdraggable = false) {
    ele = $("#sample_bed_room").clone();
    roomData = {
        "RoomLabel": obj['RoomLabel'],
        "BedLabel": obj['bed_id']
    };
    if (obj.DOMAttributes) {
        add_dom_attr(ele, obj.DOMAttributes);
    }
    add_bed_room_toFloor(ele, roomData, obj.bed_id, isresizeable, isdraggable)
    }
function draggable_C(elementId, containerId) {
    var w = $(containerId).width();
    var h = $(containerId).height();
    var dragger = document.getElementById(elementId);
    if (dragger) {
        var draggable = Draggable.create(dragger, {
            type: "left,top",
            bounds: { minX: 0, minY: 0, maxX: w, maxY: h },
            bounds: containerId,
            onDrag: function () {
                p_obj = calcPercent(this.x, this.y)
                dragger.style.left = p_obj.x;
                dragger.style.top = p_obj.y;
                
            },
            onPress: function () {
                dragger.style.left = dragger.offsetLeft + "px";
                dragger.style.top = dragger.offsetTop + "px";
                this.update(); //force the Draggable to update with the new values.

            },
        });
    }
    function calcPercent(x, y) {
            Xpercent = Math.round(x / w * 100) +"%";
            Ypercent = Math.round(y / h * 100)+"%";
        return { x: Xpercent, y: Ypercent }
    };

   
}

function resizeable(elementCls) {
    interact('.text_container,.floor-box')
        .resizable({
            edges: { top: true, left: true, bottom: true, right: true },
            listeners: {
                move: function (event) {
                    let { x, y } = event.target.dataset
                    x = (parseFloat(x) || 0) + event.deltaRect.left
                    y = (parseFloat(y) || 0) + event.deltaRect.top
                    Object.assign(event.target.style, {
                        width: `${event.rect.width}px`,
                        height: `${event.rect.height}px`,
                        transform: `translate(${x}px, ${y}px)`
                    })
                    Object.assign(event.target.dataset, { x, y })
                }
            }
        })
}