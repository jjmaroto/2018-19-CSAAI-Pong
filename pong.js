
//-- VARIABLES GLOBALES:
var WIDTH = 600,
    HEIGHT = 400;

function main(){

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

  //-- PUNTUACION:
  var score = {
    score1: 0,
    score2: 0,

    init: function(ctx){
      this.ctx = ctx;
    },

    draw: function (){
      this.ctx.font = "50px Arial";
      this.ctx.fillStyle = 'PeachPuff';
      //--SCORE1:
      this.ctx.fillText(this.score1, 255,50 );
      //--SCORE2:
      this.ctx.fillText(this.score2, 320,50 );
    },

    reset: function(){
      this.score1 = 0;
      this.score2 = 0;
    }
  }

  score.init(ctx);
  score.draw();

  //-- RAQUETA del JUGADOR (izq):
  var playerPaddles = {
    //-- Posicion inicial:
    x_init: 50,
    y_init: 180,

    //-- Coordenadas:
    x: 0,
    y: 0,

    //-- Velocidad de la raqueta:
    vy: 2,

    //-- Contexto:
    ctx: null,

    init: function(ctx){
      this.reset();
      this.ctx = ctx;
    },

    draw: function () {
      ctx.fillStyle = 'white';
      //-- PLAYER:
      ctx.fillRect(this.x, this.y, 10, 50);
    },

    reset: function (){
      this.x = this.x_init;
      this.y = this.y_init;
    },
  }

  playerPaddles.init(ctx);
  playerPaddles.draw();

  // -- RAQUETA de la CPU (der):
  var cpuPaddles = {
    //-- Posicion inicial:
    x_ini: 550,
    y_ini: 180,

    //-- Coordenadas:
    x: 0,
    y: 0,

    //-- Velocidad de la raqueta:
    vy: 2,

    //-- Contexto:
    ctx: null,

    init: function(ctx){
      this.reset();
      this.ctx = ctx;
    },

    draw: function () {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x, this.y, 10, 50);
    },

    update: function (){
      this.y = ball.y - 0.25;
    },

    reset: function (){
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  cpuPaddles.init(ctx);
  cpuPaddles.draw();


  //-- BOLA:
  var ball = {
    //-- Posicion INICIAL:
    x_ini: 100,
    y_ini: 200,

    //-- Coordenadas:
    x: 0,
    y: 0,

    //-- Velocidad:
    vx: 5,
    vy: 2,

    //-- Contexto:
    ctx: null,

    //-- Inicializar la bola:
    init: function(ctx){
      this.reset();
      this.ctx = ctx;
    },

    //-- Dibujar la bola:
    draw: function () {
      this.ctx.fillStyle = 'lightblue';

      ctx.beginPath();
      //-- Dibujar un circulo: coordenadas x,y del centro
      //-- Radio, Angulo inicial y angulo final
      ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
      //-- BOLA CUADRADA:
      // this.ctx.fillRect(this.x, this.y, this.width, this.height)
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

  var timer = null;
  var start = document.getElementById('start');

  //-- Comienza la animación!
  start.onclick = () => {

    if (!timer){
      timer = setInterval(() =>{

        ball.update();
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ball.draw();
        console.log("Funciona!")

      }, 20);
    }
  } //-- FIN ONCLICK;
}

  //-- ESCACIO: 32, FLECHA ARRIBA: 38, FLECHA ABAJO: 40
  //-- Para consultar más: https://keycode.info
