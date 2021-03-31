/*
Developed by
Carlos Ivan Hughes Corona
Computer Systems Engineer
Full-Stack
2017
*/

document.addEventListener('keydown', function(evento){
	if (evento.keyCode == 32){

		if(nivel.muerto == false){
		saltar();
		}


		else{
			nivel.velocidad = 7;
			nube.velocidad = 1;
			cactus.x = ancho + 100;
			nube.x = ancho + 100;
			nivel.muerto = false;

		}

	}
});


function touchjump (){

	if(nivel.muerto == false){
		saltar();
		}
		else{
			nivel.velocidad = 9;
			nube.velocidad = 1;
			cactus.x = ancho + 100;
			nube.x = ancho + 100;
			nivel.muerto = false;

		}
}


var imgRex, imgNube, imgCactus, imgSuelo;

function cargarImagenes() {
	imgRex = new Image();
	imgNube = new Image();
	imgCactus = new Image();
	imgSuelo = new Image();

	imgRex.src = 'img/imgRexx.PNG';
	imgNube.src = 'img/imgNube.png';
	imgCactus.src = 'img/imgCactus.PNG';
	imgSuelo.src = 'img/imgSuelo.png';

}


var ancho = 700;
var alto = 300;
var canvas, ctx;
var suelo = 200;

var trex = {y: suelo, vy: 0, gravedad:2, salto:28, vymax:9, saltando:false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = {x: 300 + 100, y: suelo };
var nube = { x: 400, y: 100, velocidad: 1};
var suelog = {x: 0, y: 287};


function inicializa(){

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargarImagenes();




if(screen.width <= 1024 && document.getElementById){
	   document.getElementById('jump').style.visibility = 'visibility';
    }
	else{
		document.getElementById('jump').style.visibility = 'hidden';

	}
}


function borraCanvas(){

canvas.width = ancho;
canvas.height = alto;

}


function dibujaRex(){
	
	ctx.drawImage(imgRex,0,0,63,87,100,trex.y,63,87);
}

//-----------------------------------------------------------------

function dibujaCactus(){
	
	ctx.drawImage(imgCactus,0,0,77,110,cactus.x,cactus.y,77,110);
}


function logicaCactus(){
	
	if(cactus.x < -100){
		cactus.x = ancho + 100;

		nivel.marcador++;

	}
	else {
		cactus.x -= nivel.velocidad;
	}
}
//-----------------------------------------------------------------


function dibujaSuelo(){
	
	ctx.drawImage(imgSuelo,suelog.x,0,700,30,0,suelog.y,700,30);
}


function logicaSuelo(){
	
	if(suelog.x > ancho){
		suelog.x = 0;

	}
	else {
		suelog.x += nivel.velocidad;
	}
}

//-----------------------------------------------------------------
function dibujaNube(){
	
	ctx.drawImage(imgNube,0,0,77,66,nube.x,nube.y,77,66);
}


function logicaNube(){
	
	if(nube.x < -100){
		nube.x = ancho + 100;

	}
	else {
		nube.x -= nube.velocidad;
	}
}

//-----------------------------------------------------------------

function saltar(){
	trex.saltando = true;
	trex.vy = trex.salto;
}

function gravedad(){

	if(trex.saltando == true){

		if(trex.y - trex.vy - trex.gravedad > 200){
			trex.saltando = false;
			trex.vy = 0;
			trex.y = suelo;
		}
		else{
			trex.vy -= trex.gravedad;
			trex.y -= trex.vy;
		}
	}
}



function colision(){

if (cactus.x >= 100 && cactus.x <= 163){
		if(trex.y >= suelo-25){
			nivel.muerto = true;
			nivel.velocidad = 0;
			nivel.marcador = 0;
			nube.velocidad = 0;

		}
	}
}


function puntuacion(){
	ctx.font = "20px impact";
	ctx.fillStyle = '#ff00ff';
	ctx.fillText("Score: " + nivel.marcador, 550,50);



if(screen.width <= 1024 && document.getElementById){
	  
	  if(nivel.muerto == true){
		ctx.font = "50px impact";
		ctx.fillText('GAME OVER', 240,150);
		ctx.fillText('Press S button to Restart', 85,200);
		}
	}
    
    else{
    	 if(nivel.muerto == true){
		ctx.font = "50px impact";
		ctx.fillText('GAME OVER', 240,150);
		ctx.fillText('Press space key to Restart', 85,200);
		}
	
	}




	// if(nivel.muerto == true){
	// 	ctx.font = "50px impact";
	// 	ctx.fillText('GAME OVER', 240,150);
	// 	ctx.fillText('Press space key to Restart', 85,200);
	// }

}

//----------------------
//BUCLE PRINCIPAL
var FPS = 50;
setInterval(function(){
	principal();
}, 1000/FPS);




function principal(){

	borraCanvas();
	gravedad();
	colision();
	logicaSuelo();
	logicaCactus();
	logicaNube();
	dibujaSuelo();	
	dibujaRex();
	dibujaCactus();
	dibujaNube();
	puntuacion();	
}
