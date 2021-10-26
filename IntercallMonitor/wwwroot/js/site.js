// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
var canvas = window._canvas = new fabric.Canvas('c');
var topRoom = 100;
var topToilet = 250;
var heightRoom = 200;
var widthRoom = 200;
var heightToilet = 50;
var widthToilet = widthRoom;
var json = {
    "objects": [{
        "type": "group",
        "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "RoomType": "BEDROOM",
            "RoomNumber": 1,
            "type": "rect",
            "originX": "center",
            "originY": "center",
            "left": 0,
            "top": topRoom,
            "width": widthRoom,
            "height": heightRoom,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        },
        {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "originY": "center",
            "left": 0,
            "top": topRoom,
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 30,
            "text": "Room 1",
            "textAlign": "left",
            "fontStyle": "normal",
            "lineHeight": 1.16,
        }
        ]
    },
    {
        "type": "group",
        "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "RoomType": "BEDROOM",
            "RoomNumber": 2,
            "type": "rect",
            "originX": "center",
            "originY": "center",
            "left": 250,
            "top": topRoom,
            "width": widthRoom,
            "height": heightRoom,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        },
        {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "originY": "center",
            "left": 250,
            "top": topRoom,
            "width": 150,
            "height": 150,
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 30,
            "text": "Room 2",
            "textAlign": "left",
            "fontStyle": "normal",
            "lineHeight": 1.16,
        }
        ]
    },

    /*
     *
     * {
        "type": "group",
         "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "RoomType": "BEDROOM",
            "RoomNumber": 3,
            "type": "rect",
            "originX": "center",
            "originY": "center",
            "left": 500,
            "top": topRoom,
            "width": widthRoom,
            "height": heightRoom,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        }, {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "originY": "center",
            "left": 500,
            "top": topRoom,
            "width": widthRoom,
            "height": heightRoom,
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 30,
            "text": "Room 3",
            "textAlign": "left",
            "fontStyle": "normal",
            "lineHeight": 1.16,
        }]
    },*/
    {
        "type": "group",
        "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "type": "rect",
            "originX": "center",
            "RoomType": "TOILET",
            "RoomNumber": 1,
            "originY": "center",
            "left": 0,
            "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        }, {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "originY": "center",
            "left": 0,
            "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "RoomType": "Toilet1",
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 15,
            "text": "Toilet",
            "textAlign": "left",
            "fontStyle": "normal",
            "lineHeight": 1.16,
        }]
    },
    {
        "type": "group",
        "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "type": "rect",
            "RoomType": "TOILET",
            "RoomNumber": 2,
            "originX": "center",
            "originY": "center",
            "left": 250, 
            "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        }, {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "originY": "center",
            "left": 250,
            "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 15,
            "text": "Toilet",
            "textAlign": "left",
            "fontStyle": "normal",
            "lineHeight": 1.16,
        }]
    },
    /* {
        "type": "group",
        "width": widthRoom,
        "height": widthRoom,
        "objects": [{
            "type": "rect",
            "RoomType": "TOILET",
            "RoomNumber": 3,
            "originX": "center",
            "originY": "center",
            "left": 500,
             "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "fill": "gray",
            "shadow": {
                "color": "rgba(94, 128, 191, 0.5)",
                "blur": 5,
                "offsetX": 5,
                "offsetY": 5
            },
            "visible": true,
        }, {
            "type": "text",
            "version": "4.6.0",
            "originX": "center",
            "RoomType": "Toilet3",
            "originY": "center",
            "left": 500,
            "top": topToilet,
            "width": widthToilet,
            "height": heightToilet,
            "visible": true,
            "fontFamily": "Times New Roman",
            "fontWeight": "normal",
            "fontSize": 15,
            "text": "Toilet ",
            "textAlign": "left",
            "fontStyle": "normal",
        }]
    }, */
    ]
}
function get_Monitor(isRoom, callType, roomNumber) {
    var call_Color = { "CALL": "red", "RESET": "gray", "PRESENT": "green" }
    var color = call_Color[callType] || call_Color['RESET'];
    json["objects"].forEach(function (groups, index) {
        groups['objects'].forEach(function (room, index) {

            if (isRoom === true && room['RoomType'] === 'BEDROOM' && room['RoomNumber'] == roomNumber) {
                room['fill'] = color; 
            }

            if (isRoom === false && room['RoomType'] === 'TOILET' && room['RoomNumber'] == roomNumber) { 
                room['fill'] = color; 
            }
        });
    })

}
// Write your JavaScript code.
function drawRoom(callType, isRoom, roomNumber) {
    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 1,
        padding: 1
    });
    get_Monitor(isRoom, callType, roomNumber);
    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas), function (o, object) {
    });

    canvas.on('object:moving', function (options) {
    });
};


(function () {
    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
    });
    drawRoom(null, null,null)
})();