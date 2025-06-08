//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2; 
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight,
}

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//game physics
let velocityX = -2; //pipes move left at this speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;
let gameOver = false;
let score = 0;

window.onload = function() {
    board = document.getElementById('board');
    board.width = boardWidth; //setting the width of the canvas
    board.height = boardHeight; //setting the height of the canvas
    context = board.getContext('2d'); //used for drawing on the board

    //load flappy bird image
    birdImg = new Image(); //Image object creates html image element just like <img>
    birdImg.src = './assets/flappybird.png';
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = './assets/toppipe.png';
    bottomPipeImg = new Image();
    bottomPipeImg.src = './assets/bottompipe.png';

    requestAnimationFrame(update); //request the first frame
    setInterval(placePipes, 1500); //place pipes every 1.5 seconds

    document.addEventListener("keydown", handleKey);
}

function update(){
    requestAnimationFrame(update); //keeps requesting next frames so it becomes a loop
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, boardWidth, boardHeight); //clear the frame

    //drawing bird in each frame
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0) // limiting the bird.y to top of canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //game over if bird touches the bottom of canvas
    if(bird.y > board.height){
        gameOver = true;
    }

    //drawing pipes in each frame
    for(let i = 0; i < pipeArray.length; i++){
        let pipe = pipeArray[i];
        pipe.x += velocityX; //move the pipe left by updating its x position
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        //updating score if bird passes a pipe
        if(!pipe.passed && bird.x > pipe.x + pipe.width){
            score += 0.5;
            pipe.passed = true;
        }

        //detect if bird collides with pipe
        if(detectCollision(bird,pipe)){
            gameOver = true;
        }
    }

    //clear pipes as they move beyond the canvas
    while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
        pipeArray.shift(); //removes first element from array
    }

    //score
    context.fillStyle = "white";
    context.font = "45px sans-serif";
    context.fillText(score,5,45);

    if (gameOver) {
        context.fillStyle = "black";
        context.fillRect(30, 160, 300, 120);
        context.fillStyle = "red";
        context.font = "45px sans-serif";
        context.fillText("GAME OVER", 45, 200);
        context.fillStyle = "white";
        context.font = "25px sans-serif";
        context.fillText("Score: " + score, 130, 230);
        context.fillText("Press Enter to start again", 40, 260);
    }
}

function placePipes() {
    if(gameOver){
        return;
    }

    //pipe height will vary between 3/4th and 1/4th of the height of pipe
    let randomPipeY = pipeY-pipeHeight/4 - Math.random()*(pipeHeight/2); //randomize the y position of the top pipe

    //gap between top and bottom pipe
    let gap = board.height/4;

    let topPipe ={
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe); //add top pipe to the array

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + gap, //bottom pipe is placed below the top pipe with a gap
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe); //add bottom pipe to the array 
}

//Key Controls
function handleKey(e) {
    // controls to move the bird
    if ((e.code === "Space" || e.code === "ArrowUp") && !gameOver) {
        velocityY = -6;
    }

    // restart game when Enter is pressed
    if (e.code === "Enter" && gameOver) resetGame();
}

//
function resetGame() {  
    bird.y      = birdY;
    velocityY   = 0;
    pipeArray   = [];
    score       = 0;
    gameOver    = false;
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}