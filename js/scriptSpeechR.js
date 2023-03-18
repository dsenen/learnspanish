import { numeroALetras } from './nal.js';

$(document).ready(function() {      
    var template = $('#basic-template1').html();    
    var templateScript = Handlebars.compile(template);    
    var context = {
        "name00": "Los números",
        "link00": "http://www.aprender-espanol.eu5.net/numbers/index.html",
        "name01": "10 Reglas",
        "link01": "http://www.aprender-espanol.eu5.net/numbers/numbersrules.html",
        "name02": "De números a palabras",
        "link02": "http://www.aprender-espanol.eu5.net/numbers/numberstowords.html",
        "name03": "De palabras a números",
        "link03": "http://www.aprender-espanol.eu5.net/numbers/wordstonumbers.html",
        "name04": "Exámenes",
        "name05": "Examen: del 0 al 20",
        "link05": "http://www.aprender-espanol.eu5.net/numbers/numberstotwenty.html",
        "name06": "Examen: del 0 al 30",
        "link06": "http://www.aprender-espanol.eu5.net/numbers/numberstothirty.html",
        "name06a": "Examen: del 0 al 100",
        "link06a": "http://www.aprender-espanol.eu5.net/numbers/numberstoonehundred.html",
        "name06b": "Examen: del 0 al 1.000",
        "link06b": "http://www.aprender-espanol.eu5.net/numbers/numberstoonethousand.html",
        "name06c": "Examen: del 0 al 1.000.000",
        "link06c": "http://www.aprender-espanol.eu5.net/numbers/numberstoonemillion.html",
        "name06d": "Examen: del 0 al 100.000.000",
        "link06d": "http://www.aprender-espanol.eu5.net/numbers/numberstoonehundredmillion.html",
        "name07": "Hablar",
        "name08": "Del 0 al 20",
        "link08": "./to20.html",
        "name09": "Del 0 al 30",
        "link09": "./to30.html",
        "name10": "Del 0 al 100",
        "link10": "./index.html",
        "name11": "Del 0 al 1.000",
        "link11": "./to1000.html",
        "name12": "Del 0 al 100.000",
        "link12": "./to100000.html",
        "name13": "Del 0 a 1.000.000",
        "link13": "./toMillion.html"
    };
    var html = templateScript(context);    
    $('#handlerbarsNavbar').append(html);    
});

let randomNumber;

const maxNum = document.getElementById('butt').value;

const feedbacks = [
  "  ¡¡Eso es!!",
  "  ¡¡Tu respuesta es correcta!!",
  "  ¡¡Magnífico!!",
  "  ¡¡Has dado en el clavo!!",
  "  ¡¡Excelente!!",
  "  ¡¡Lo has bordado!!",
  "  ¡¡Así es!!",
  "  ¡¡Muy bien!!",
  "  ¡¡Fantástico!!",
  "  ¡¡Esa es la contestación!!",
  "  ¡¡Genial!!",
  "  ¡¡Estupendo!!"
];

const imagesLinks = [
	'./images/feedback/1F44C_color.png',
	'./images/feedback/1F44D_color.png',
	'./images/feedback/1F44F_color.png',
	'./images/feedback/1F603_color.png',
	'./images/feedback/1F920_color.png',
	'./images/feedback/1F973_color.png'
]

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'es';


recognition.addEventListener('result', e => {
	const transcript = Array.from(e.results)
		.map(result => result[0])
		.map(result => result.transcript)
		.join('');

	if (e.results[0].isFinal) {
		// console.log(transcript.toLowerCase(), numeroALetras(randomNumber).toLowerCase());
		checkAnswer(transcript.toLowerCase(), numeroALetras(randomNumber).toLowerCase());
	}

});

let isBroken = true;

function startProcess () {
	document.querySelector('#butt').disabled = true;
	isBroken = true;
	removeRobotImage();
  
	setTimeout(function(){
		if (isBroken == true && document.querySelector('#feedBack').innerHTML === '') {
				document.querySelector('#butt').classList.remove("talkNow");
				document.querySelector('#butt').innerHTML = '¡Otro número, por favor!';
			    document.querySelector('#number').innerHTML = '¿¿??';
				document.querySelector('#feedBack').innerHTML = 'Lo siento, algo ha ido mal, prueba con otro número...';
				let robot = document.createElement('img');
				document.getElementById('clapFB').appendChild(robot);
				robot.setAttribute('class', 'feedbackImage');
				robot.setAttribute('id', 'robot');
				robot.setAttribute('src', './images/feedback/1F916_color.png');
				robot.setAttribute('alt', 'It went wrong :(');
				recognition.stop();
				document.querySelector('#butt').classList.remove("charging");
		} else {
			if (document.querySelector('#butt').innerHTML == '¡Contesta ahora!') {
				document.querySelector('#butt').innerHTML = '¡Contesta ahora!';
			} else {
				document.querySelector('#butt').innerHTML = '¡Otro número, por favor!';
				document.querySelector('#butt').classList.remove("talkNow");
				document.querySelector('#butt').classList.remove("charging");
			}
		}
		document.querySelector('#butt').disabled = false;
				document.querySelector('#butt').innerHTML = '¡Otro número, por favor!';
				document.querySelector('#butt').classList.remove("talkNow");
				document.querySelector('#butt').classList.remove("charging");
	}, 8000);
		document.querySelector('#feedBack').innerHTML = '';
		document.querySelector('#butt').innerHTML = '¡Contesta ahora!';
		document.querySelector('#butt').setAttribute("class", "talkNow");			
		randomNumber = numberGenerator();
		document.querySelector('#number').innerHTML = randomNumber;
		recognition.start();
}

function removeRobotImage () {
	if ((document.querySelector('#robot') == undefined) == false) {
		document.querySelector('#robot').remove();
	}
}

function numberGenerator () {
	const numb = Math.round(Math.random() * maxNum);
	return numb;
}

function checkAnswer(a, b) {

	if (a == b) {
		removeRobotImage();
		document.querySelector('#number').innerHTML = randomNumber;
		let feedbackImage = imagesLinks[Math.floor(Math.random() * imagesLinks.length)];
		document.querySelector('#feedBack').innerHTML = feedbacks[Math.floor(Math.random() * feedbacks.length)];
		let clap = document.createElement('img');
		document.getElementById('clapFB').appendChild(clap);
		if (feedbackImage === './images/feedback/1F44F_color.png') {
		  clap.setAttribute('class', 'clapA');	
		} else {
			clap.setAttribute('class', 'feedbackImage');
		}
		clap.setAttribute('id', 'clap');
		clap.setAttribute('src', feedbackImage);
		clap.setAttribute('alt', 'Well done!!');
		setTimeout(cleaner, 2500);
	} else {
		document.querySelector('#feedBack').innerHTML = '¡Lo siento, este número no es el ' + a + ', es el ' + b + '!';
	}
	document.querySelector('#butt').classList.remove("talkNow");
	document.querySelector('#butt').innerHTML = '¡Un momento, por favor!';
	document.querySelector('#butt').setAttribute('class', 'charging');

	if (document.querySelector('#butt').disabled == false) {
		document.querySelector('#butt').innerHTML = '¡Otro número, por favor!';
		document.querySelector('#butt').classList.remove("charging");	
	}
	isBroken = false;
}

function cleaner(){
	document.querySelector('#clap').remove();
}

document.getElementById('headSentence').innerHTML = "Di los números del 0 al " + maxNum + " en español.";

document.getElementById('butt').addEventListener('click', startProcess);