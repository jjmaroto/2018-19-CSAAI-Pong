
//-- VARIABLES GLOBALES:
var WIDTH = 600,
    HEIGHT = 400;

function main(){
  //console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  var ctx = canvas.getContext("2d");

  //-- RED:
  var i = 0;
  while (i<canvas.height){
    ctx.fillStyle = 'white';
    ctx.fillRect(300, i, 1, 10)
    i += 15;
  }

  //-- RAQUETAS:
  var paddles = {
    init: function(ctx){
      this.ctx = ctx;
    },

    draw: function () {
      ctx.fillStyle = 'white';
      //-- PLAYER:
      ctx.fillRect(50, 180, 10, 50);
      //-- CPU:
      ctx.fillRect(550, 180, 10, 50);
    },
  }

  paddles.init(ctx);
  paddles.draw();

  //-- PUNTUACION:
  var score = {
    score1: 0,
    score2: 0,

    init: function(ctx){
      this.ctx = ctx;
    },

    draw: function (){
      this.ctx.font = "50px Arial";
      this.ctx.fillStyle = 'white';
      //--SCORE1:
      this.ctx.fillText(this.score1, 255,50 );
      //--SCORE2:
      this.ctx.fillText(this.score2, 320,50 );
    },
  }

  score.init(ctx);
  score.draw();

  //-- BOLA:
  var ball = {
    //-- Posicion INICIAL:
    x_ini: 300,
    y_ini: 200,

    //-- Dimensiones:
    width: 10,
    height: 10,

    //-- Coordenadas:
    x: 0,
    y: 0,

    //-- Velocidad:
    vx: 4,
    vy: 1,

    //-- Contexto:
    ctx: null,

    //-- Inicializar la bola:
    init: function(ctx){
      this.ctx = ctx;
      this.reset();
    },

    //-- Dibujar la bola:
    draw: function () {
      this.ctx.fillStyle = 'yellow';
      //-- BOLA CUADRADA:
      //this.ctx.fillRect(this.x, this.y, this.width, this.height)
      //-- BOLA REDONDA:
      this.ctx.arc(this.x,this.y,5,0,(Math.PI/180)*360,true);
      this.ctx.fill()
    },

    //-- Update
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },

    //-- Reset: Set the ball to the initial state
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    },
  }

  ball.init(ctx)
  ball.draw()

  //-- Crear timer para la animación
  //-- Inicialmente a null
  var timer = null;

  var sacar = document.getElementById('sacar');

  //--CÓDIGO PENDIENTE para la PROXIMA SESION!!





}
