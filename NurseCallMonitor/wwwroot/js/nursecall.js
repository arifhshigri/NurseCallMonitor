function normalize_bedId(id, isRoom = false, reverse = false) {
    return reverse ? id.replace(isRoom ? "Room_" : "Bed_", '') : isRoom ? `Room_${id}`:`Bed_${id}`;
}
var grid_x = 10;
var grid_y = 10;
var snapThreshold = 5;
var snapWhileResizing = true;
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
    function draggable_C(element, containerId) {
        old_w = $(containerId).width();
        old_h = $(containerId).height();
        $(element).draggable({
            containment: containerId, scroll: false, snap: '.gridlines',
            stop: function () {
                debugger
                $(this).css("left", parseInt($(this).css("left")) / ($(".square-grid").width() / 100) + "%");
                $(this).css("top", parseInt($(this).css("top")) / ($(".square-grid").height() / 100) + "%")
            }
        });
    }
    $('#btnFullScreen').click(function (e) {
        $('div.full-size').toggleClass('full-screen');
    });

    for (var i = 12; i < 100; i+=12) {
        $("#selectFontSize").append(`<option value='${i}px'>${i} px</option>`)
    }
    $(".room-draggable").resizable({
        handles: 'e, w'
    });
    $(document).on('click', 'i.close', function (ev) {
        $(event.target).closest('div.closeable').remove();
    });
    $(document).on('click', 'i.edit', function (ev)
    {
        roomLabel = $(ev.target).closest('div.bed-rooms').find('h2.room-label').text().trim()
        bedLabel=$(ev.target).closest('div.bed-rooms').find('h2.bed-label').text().trim()
        bedNumber = $(ev.target).closest('div.bed-rooms').find('div.bed').attr("id");
        $('#defaultModalSuccess').find('input[name="RoomLabel"]').val(roomLabel);
        $('#defaultModalSuccess').find('input[name="BedLabel"]').val((bedLabel));
        $('#defaultModalSuccess').find('input[name="BedNumber"]').val(normalize_bedId(bedNumber, false,reverse = true));
        modalobj=$('#defaultModalSuccess');
        modalobj.find('.modal-title').text('Edit Room');
        modalobj.find('.modal-title').data('IsEdit', true);
        modalobj.find('.modal-title').data('BedId', bedNumber);
        modalobj.modal("show");
    });

    //$().draggable({ containment: "#containment-wrapper", scroll: false });

    draggable_C(".room-draggable", "#containment-wrapper")

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
            room = $(`#${edit_bedId}`).closest('.bed-rooms');
            $(room).find('div.bed').attr("id", bedId);
            $(room).find('.bed-label').text((roomData['BedLabel']))
            $(room).find('.room-label').text((roomData['RoomLabel']))
        } else {
            if ($(`#${bedId}`).length > 0) {
                alert('Invalid Bed Number')
                return false;
            }
            id = (roomData['RoomLabel'] || "").replace(' ', '_');
            $(ele).attr("id", normalize_bedId(id, true))
            $(ele).find('div.bed').attr("id", bedId);
            $(ele).find('.bed-label').text((roomData['BedLabel']))
            $(ele).find('.room-label').text((roomData['RoomLabel']))
            $(ele).css("display",'')
            $('#containment-wrapper').append(ele);
            $(".room-draggable").resizable({
                handles: 'e, w'
            });


            //$(".room-draggable").draggable({ containment: , scroll: false });

            draggable_C(".room-draggable", "#containment-wrapper")

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
        ele = $('<div>').addClass("floor-box closeable box_container").append('<i class="cursor-pointer fas fa-trash close"></i>').css("background-color", color).attr("id", `Box_${parseInt(Math.random() * 1000000)}`)
        $('#containment-wrapper').append(ele);
        $(".floor-box").resizable( );
        //$(".floor-box").draggable({ containment: "#containment-wrapper", scroll: false });
        draggable_C(".floor-box", "#containment-wrapper")

    });
    $(document).on("click", "#btnAddText", function(e){
        text = $("#FloorTextArea").val(); 
        fontSize = $("#selectFontSize").val(); 
        ele = $("<h2>")
        $(ele).text(text.trim()).css('font-size', fontSize);
        div = $("<div>").append('<i class="cursor-pointer fas fa-trash close"></i>')
            .append(ele).addClass("text_container closeable draggable-heading")
        $('#containment-wrapper').append(div);
        $(div).resizable();
        //$(".draggable-heading").draggable({ containment: "#containment-wrapper" });
        draggable_C(".draggable-heading", "#containment-wrapper")

    })

    $(window).resize(function () {
        var new_w = window.innerWidth;
        var new_h = window.innerHeight;

        var mod_w = new_w % grid_x;
        var mod_h = new_h % grid_y;
        new_w = ((mod_w > snapThreshold) ? (new_w + (grid_x - mod_w)) : new_w - mod_w) - 40;
        new_h = ((mod_h > snapThreshold) ? (new_h + (grid_y - mod_h)) : new_h - mod_h) - 50;

        if (old_w != new_w)
            old_w = $("#draggable").width();
        if (old_h != new_h)
            old_h = $("#draggable").height();

        $("#draggable").width(new_w);
        $("#draggable").height(new_h);
    })


});