const minutes = $('.minutes');
const seconds = $('.seconds');
const message = $('.message');

const plus = $('.plus');
const minus = $('.minus');

const start = $('.start');
const pause = $('.pause');
const resume = $('.resume');
const reset = $('.reset');

let countSec = 0;
let countMin = 0;
let totalCount = 0;


// sec/min
function innerTime (sec, min) {
	seconds.val(sec);
	minutes.val(min);
}

function plusSec() {
	if (seconds.val() >= 59) {
		seconds.val(0);
		minutes.val(Number(minutes.val()) + 1);
	}
	seconds.val(Number(seconds.val()) + 1);
}

function minusSec() {
	if (seconds.val() > 0) {
		seconds.val(seconds.val() - 1);

	} if (minutes.val() > 0 && seconds.val() <= 0) {
		minutes.val(minutes.val() - 1);
		seconds.val(59);
	}
}

function pauseTime() {
	clearInterval(engine);
	start[0].disabled = false;
}

function resetTime() {
	pauseTime();
	innerTime(0, 0);
	reset[0].disabled = true;
	message.text('');
}

function checkSec() {
	if (seconds.val() == 0 && minutes.val() == 0) {
		pauseTime();
		finishMessage();
	} else if (seconds.val() < 0) {
		seconds.val(59);
		if (minutes.val() != 0) {
			minutes.val(minutes.val() - 1);	
		}	
	}
}

function finishMessage() {
	message.html('<strong>Time is over</strong>');
}

function secReduce(){
	if (seconds.val() >= 60) {
		seconds.val(59)
	}
	if (seconds.val() <= 0 && minutes.val() <= 0) {
		reset.click();
	}
	if (start[0].disabled == true) { 
		seconds.val(seconds.val() - 1);
	}
	checkSec();
}

function run() {
	start[0].disabled = true;
	reset[0].disabled = false;

	message.text('');
	
	pause.show();
	resume.hide();
	
	engine = setInterval(secReduce, 1000);
}

function pauseResume() {
	if (resume.css('display') == "none") {
		pause.hide();
		resume.show();
	
		pauseTime();
	
	} else {
		pause.show();
		resume.hide();
	
		run();
	}
}

(function initiation() {
	pause.click(pauseResume);
	resume.click(pauseResume);

	start.click(run);
	plus.click(plusSec);
	minus.click(minusSec);
	reset.click(resetTime);
})();
