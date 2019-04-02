
//-- VARIABLES GLOBALES:
var WIDTH = 600,
    HEIGHT = 400;

function makeScore(WIDTH, HEIGHT){
  this.ctx = null;

  this.score1 = 0;
  this.score2 = 0;

  this.width = WIDTH;
  this.height = HEIGHT;

  this.init =  function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function (){
    this.ctx.font = "70px American Typewriter";
    this.ctx.fillStyle = 'gray';
    //--SCORE1:
    this.ctx.fillText(this.score1, 240,60 );
    //--SCORE2:
    this.ctx.fillText(this.score2, 320,60 );

    //-- RED:
    var i = 0;
    while (i < this.height){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(300, i, 1, 10)
      i += 15;
    }
  };

  this.reset = function(){
    this.score1 = 0;
    this.score2 = 0;
  }
}

function makePaddles (x,y, HEIGHT){
  this.ctx = null;

  this.x_ini = x;
  this.y_ini = y;

  this.vy = 0;
  this.speed = 5;

  this.init = function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function () {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.x, this.y, 10, 50);
  };

  this.reset = function (){
    this.x = this.x_ini;
    this.y = this.y_ini;
  };

  this.update = function() {
    this.y += this.vy*this.speed;
  };
}

function makeBall() {
  this.ctx = null;

  this.x_ini = 85;
  this.y_ini = 125;

  this.x = 0;
  this.y = 0;

  this.vx = 5;
  this.vy = 2;

  this.init = function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function () {
    this.ctx.fillStyle = 'plum';
    this.ctx.beginPath();
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    //-- BOLA CUADRADA:
    // this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.fill()
  };

  //-- Update
  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
  };

  //-- Reset: Set the ball to the initial state
  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;

    this.vy = - this.vy;
  };
}

function main(){

  var canvas = document.getElementById('display')
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var ctx = canvas.getContext("2d");

  var score = new makeScore(canvas.width, canvas.height);

  score.init(ctx);
  score.draw();

  var paddle1 = new makePaddles(50, 100, canvas.height);
  var paddle2 = new makePaddles(550, 200, canvas.height);

  paddle1.init(ctx);
  paddle1.draw();

  paddle2.init(ctx);
  paddle2.draw();

  var ball = new makeBall();

  ball.init(ctx);
  ball.draw();


  var timer = null;
  var start = document.getElementById('start');

  //-- Comienza la animación!
  start.onclick = () => {

    if (!timer){
      timer = setInterval(() =>{
        //-- Actualizar elementos:
        paddle1.update();
        paddle2.update();
        ball.update();
        //-- Limpiamos el canvas:
        ctx.clearRect(0,0,canvas.width, canvas.height);
        //-- Dibujamos:
        ball.draw();
        paddle1.draw();
        paddle2.draw();
        score.draw();

      }, 20);
    }
  } //-- FIN ONCLICK;
}

  //-- ESCACIO: 32, FLECHA ARRIBA: 38, FLECHA ABAJO: 40
  //-- Para consultar más: https://keycode.info
