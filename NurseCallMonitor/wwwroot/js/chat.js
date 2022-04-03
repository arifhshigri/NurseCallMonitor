var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


function bootstrap_alert(elem, alert_type, bedNumber, timeout) {
	alert_type_list = {
		"CALL": { type: "alert-danger", message: `Nurse Call - Bed #${bedNumber}` },
		"ATTEND": { type: "alert-info", message: `Nurse has Attended Bed #${bedNumber}` },
		"PRESENT": { type: "alert-info", message: `Nurse has Attended Bed #${bedNumber}` },
		"RESET": { type: "alert-light", message: `Reset Call - Bed #${bedNumber}`, timeout: 1000 },
	}
	curr_alert = alert_type_list[alert_type]
	call_type_dict = {
		'CALL': "Call",
		'ATTEND': "bg-success",
		'PRESENT': "bg-success",
		'RESET': 'bg-primary'
	}
	c = call_type_dict[alert_type]
	$(`#Bed_${bedNumber}`).css({ "fill": c });
	$(`#Bed_${bedNumber}`).parents('div.RoomCls')
		.removeClass('bg-primary')
		.removeClass('bg-success')
		.removeClass('Call')
		.addClass(c)
}


//Disable send button until connection is established
connection.on("ReceiveMessage", function (callType, isRoom , roomNumber) {
    bootstrap_alert('#form_errors', callType, roomNumber);

    //drawRoom && drawRoom(callType, roomNumber, isRoom)
});
function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

setInterval(function () {
	call_type_dict = [
		'CALL' ,
		'ATTEND' ,
		'PRESENT',
		'RESET',
		'CALL',
		'CALL',
	]
	bootstrap_alert('', call_type_dict[randomIntFromInterval(1, 5)], randomIntFromInterval(1,9));
}, 2000);

connection.start().then(function () {
	console.log("connection start")
}).catch(function (err) {
    return console.error(err.toString());
});

 

