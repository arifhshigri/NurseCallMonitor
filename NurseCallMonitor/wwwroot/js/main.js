var WIDTH = 1024,
    HEIGHT = 720;
floorWidth = 450,
    floorHeight = 200,
    floorX = 30,
    floorY = 20;
class MainView {

    constructor() {
    }

    handle_ROLL() {
        console.log("");
    }

    trigger() {
        console.log("");
    }
    bootstrap_alert(elem, alert_type, bedNumber, timeout) {
        call_type_dict = {
            'CALL': "Call",
            'ATTEND': "Attend",
            'PRESENT': "Present",
		    'RESET': 'bg-primary'
        }
        c = call_type_dict[alert_type] 
        $('.bed-rooms').removeClass('bg-primary').addClass(c)
        console.log(`${callType} ${roomNumber}`);
    }

    animate() {
        bed = Math.floor(Math.random() * 25);
        call_type_no = Math.floor(Math.random() * 3);
        call_type_str = ['CALL', 'ATTEND', 'RESET'][call_type_no]
        call_type_dict = {
            'CALL': { color: 'red' },
            'ATTEND': { color: 'green' },
            'RESET': { color: '#fff' }
        }
        bed += 1
        $(`#bed_${bed}`).css({ "fill": call_type_dict[call_type_str]['color'] });
    }
};

var main = new MainView();