
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

  this.width = 10;
  this.height = 50;

  this.vy = 0;
  this.speed = 5; //-- Nivel de dificultad: EASY, NORMAL, HARD

  this.init = function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function () {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  };

  this.reset = function (){
    this.x = this.x_ini;
    this.y = this.y_ini;
  };

  this.update = function() {
    //-- Movimiento de la pala según el nivel de dificultad:
    this.y += this.vy*this.speed;
    //-- Para que no se salgan del canvas:
    if (this.y > HEIGHT - this.height){
      this.y = HEIGHT - this.height;
    } else if (this.y < 0){
      this.y = 0;
    }
  };
}

function makeBall() {
  this.ctx = null;

  //-- Inicialmente saca el Jugador1:
  this.x_ini = 85;
  this.y_ini = 125;

  this.x = 0;
  this.y = 0;

  this.width = 5;
  this.height = 5;

  this.vx = 5;
  this.vy = 2;
  this.speed = 1; //-- Nivel de dificultad: EASY, NORMAL, HARD

  this.init = function(ctx){
    this.reset();
    this.ctx = ctx;
  };

  this.draw = function () {
    this.ctx.fillStyle = 'yellow';
    this.ctx.beginPath();
    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    //-- BOLA CUADRADA:
    // this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.fill()
  };

  this.update = function () {
    this.x += this.vx*this.speed;
    this.y += this.vy*this.speed;

    if (this.y > HEIGHT - this.height || this.y < this.height){
      this.vy = -this.vy;
    }
  };

  this.reset = function() {
    this.x = this.x_ini;
    this.y = this.y_ini;
  };
}

function movePaddles(paddle1, paddle2) {
  window.onkeydown = (e) => {
    e.preventDefault();
    switch (e.key) {
      case 'w':
          paddle1.vy = -1;
          break;
      case 's':
          paddle1.vy = 1;
          break;
      case 'ArrowUp':
          paddle2.vy = -1;
          break;
      case 'ArrowDown':
          paddle2.vy = 1;
          break;
      default:
          break;
    }
  }
  window.onkeyup = (e) => {
    e.preventDefault();
    switch (e.key) {
      case 'w':
          paddle1.vy = 0;
          break;
      case 's':
          paddle1.vy = 0;
          break;
      case 'ArrowUp':
          paddle2.vy = 0;
          break;
      case 'ArrowDown':
          paddle2.vy = 0;
          break;
      default:
          break;
    }
  }
}

//-- Función para el REBOTE de la bola:
function pushBall(paddle1, paddle2, ball){
  if (ball.x <= (paddle1.x + paddle1.width) && ball.x >= paddle1.x) {
    if (ball.y >= paddle1.y && ball.y <= (paddle1.y + paddle1.height)){
      ball.vx = -ball.vx;
    }
  };

  if ((ball.x + ball.width) >= paddle2.x && (ball.x+ ball.width) <= (paddle2.x + paddle2.width)){
    if ((ball.y + ball.height) <= (paddle2.y + paddle2.height) && (ball.y + ball.height) >= paddle2.y){
      ball.vx = -ball.vx;
    }
  };
}

function restartBall(player, ball, paddle1, paddle2){
  //-- Marca el Jugador1 -> saca 2:
  if (player == 'Jugador1'){
    ball.x_ini = 550;
    ball.y_ini = 200;

    //ball.vx = -ball.vx;

  } else if (player == 'Jugador2'){
    ball.x_ini = 50;
    ball.y_ini = 100;

    //ball.vx = -ball.vx;
  };

  ball.reset();
  paddle1.reset();
  paddle2.reset();
  ball.draw();
  paddle1.draw();
  paddle2.draw();
}

function makeDifficulty(ball, paddle1, paddle2){
  var dif = document.querySelector('input[name="dif"]:checked').value;

  switch (dif) {
    case 'easy':
        ball.speed = 1;
        paddle1.speed = 4;
        paddle2.speed = 4;
        break;
    case 'normal':
        ball.speed = 1.5;
        paddle1.speed = 6;
        paddle2.speed = 6;
        break;
    case 'hard':
        ball.speed = 2;
        paddle1.speed = 8;
        paddle2.speed = 8;
        break;
    default:
        break;
  }
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
    //-- Score selected:
    var points = document.querySelector('input[name="points"]:checked').value;

    if (!timer){
      timer = setInterval(() =>{
        //-- En función de la dificultad escogida:
        makeDifficulty(ball, paddle1, paddle2);

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

        movePaddles(paddle1, paddle2);
        pushBall(paddle1, paddle2, ball);

        if (ball.x > canvas.width - ball.width){
          score.score1++;
          //-- Saca Jugador2:
          restartBall('Jugador1', ball, paddle1, paddle2);

          ball.vx = -ball.vx;

        } else if (ball.x < ball.width){
          score.score2++;
          //-- Saca Jugador1:
          restartBall('Jugador2', ball, paddle1, paddle2);

          ball.vx = -ball.vx;
        }

        //-- En función de la puntuación máxima:
        if (score.score1 == points || score.score2 == points){

          if (score.score1 == points){
            alert("Player1 WINS - Congratulations!")
          } else if (score.score2 == points){
            alert("Player2 WINS - Congratulations!")
          }

          clearInterval(timer);
          timer = null;
          //-- Limpiamos el canvas:
          ctx.clearRect(0,0,canvas.width, canvas.height);
          //-- Reseteamos y dibujamos:
          ball.reset();
          paddle1.reset();
          paddle2.reset();
          score.reset();

          ball.draw();
          paddle1.draw();
          paddle2.draw();
          score.draw();
        }
      }, 20);
    }
  } //-- FIN ONCLICK;
}

  //-- ESCACIO: 32, FLECHA ARRIBA: 38, FLECHA ABAJO: 40
  //-- Para consultar más: https://keycode.info
