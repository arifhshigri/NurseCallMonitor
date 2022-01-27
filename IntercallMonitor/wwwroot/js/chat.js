var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
connection.on("ReceiveMessage", function (callType,roomNumber,isRoom) {
    drawRoom && drawRoom(callType, roomNumber, isRoom)
});

connection.start().then(function () {
    console.log("connection start")
}).catch(function (err) {
    return console.error(err.toString());
});

 

