var WIDTH = 1024,
    HEIGHT = 720;
	floorWidth=450,
	floorHeight=200,
	floorX=30,
	floorY=20;
var MainView = Backbone.View.extend({
	
    initialize: function () {
		//setInterval(this.animate.bind(this), 5000);
		this.bootstrap_alert.bind(this);
    },

	handle_ROLL: function () {
	},
	
	trigger: function () {

		
	},
	bootstrap_alert:function (elem,alert_type,bedNumber, timeout) {
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
		$(`#bed_${bedNumber}`).css({ "fill": c }); 
		$(`#bed_${bedNumber}`).addClass("Call"); 
			console.log(`${callType} ${roomNumber}`);

			var ele_alert = $(alert)
			debugger;
			$(elem).append(ele_alert);
			timeout = timeout || curr_alert.timeout;
			if (timeout || timeout === 0) {
				setTimeout(function () {
					$(ele_alert).alert('close');
				}, timeout);
			}
	},

	animate: function () {
		bed=Math.floor(Math.random() * 25);
		call_type_no=Math.floor(Math.random() * 3);
		call_type_str=['CALL','ATTEND','RESET'][call_type_no]
		call_type_dict={
			'CALL':{color:'red'},
			'ATTEND':{color:'green'},
			'RESET':{color:'#fff'}
		}
		bed+=1
		$(`#bed_${bed}`).css({"fill":call_type_dict[call_type_str]['color']});
		this.bootstrap_alert('#form_errors',call_type_str, bed);
		
		//toastr.success("Hello World!");
	} 
});

var main = new MainView();