var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


function bootstrap_alert (elem, alert_type, bedNumber, timeout) {
	alert_type_list = {
		"CALL": { type: "alert-danger", message: `Nurse Call - Bed #${bedNumber}` },
		"ATTEND": { type: "alert-info", message: `Nurse has Attended Bed #${bedNumber}` },
		"PRESENT": { type: "alert-info", message: `Nurse has Attended Bed #${bedNumber}` },
		"RESET": { type: "alert-light", message: `Reset Call - Bed #${bedNumber}`, timeout: 1000 },
	}
	curr_alert = alert_type_list[alert_type]
	alert_id = `alert_bed_${bedNumber}`;
	alert_exists = $(`#${alert_id}`);
	if (alert_exists.length) {
		$(`#${alert_id}`).delay(3000).fadeOut().alert('close');
	}
	var alert = `<div class="alert ${curr_alert["type"]}" id="${alert_id}" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
					${curr_alert["message"]}
	  				</div>`;
	//call_type_str = ['CALL', 'ATTEND', 'PRESENT', 'RESET'][alert_type]
	call_type_dict = {
		'CALL': { color: 'red' },
		'ATTEND': { color: 'green' },
		'PRESENT': { color: 'green' },
		'RESET': { color: '#fff' }
	}
	c = call_type_dict[alert_type]['color']
	$(`#bed_${bedNumber}`).css({ "fill":c  });
	console.log(`${alert_type} ${bedNumber}`);

	var ele_alert = $(alert)
	$(elem).append(ele_alert);
	timeout = timeout || curr_alert.timeout;
	if (timeout || timeout === 0) {
		setTimeout(function () {
			$(ele_alert).alert('close');
		}, timeout);
	}
}


//Disable send button until connection is established
connection.on("ReceiveMessage", function (callType, isRoom , roomNumber) {
    bootstrap_alert('#form_errors', callType, roomNumber);

    //drawRoom && drawRoom(callType, roomNumber, isRoom)
});

connection.start().then(function () {
    console.log("connection start")
    console.log("connection start")
    console.log("connection start")
	console.log("connection start")
}).catch(function (err) {
    return console.error(err.toString());
});

 

