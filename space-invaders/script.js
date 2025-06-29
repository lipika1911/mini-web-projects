//board dimensions
let tileSize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = rows * tileSize;
let boardHeight = columns * tileSize;
let context;

//ship dimensions
let shipWidth = tileSize * 2;
let shipHeight = tileSize;
let shipX = tileSize * columns/2 - tileSize;
let shipY = tileSize * rows - tileSize * 2;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipVelocityX = tileSize; //ship moving speed

//aliens
let alienArray =[];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;
let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; //number of aliens to defeat
let alienVelocityX = 1; //alien moving speed

//bullets
let bulletArray = [];
let bulletVelocityY = -10; //bullet moving speed;

let score = 0;
let gameOver = false;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d"); //used for drawing on board

    //draw initial ship
    shipImg = new Image();
    shipImg.src = "./assets/ship.png";
    shipImg.onload = function(){
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    alienImg = new Image();
    alienImg.src = "./assets/alien.png"
    createAliens();

    requestAnimationFrame(update);
    document.addEventListener("keydown",moveShip);
    document.addEventListener("keyup", shoot);
    document.addEventListener("keydown", function(e) {
        if (gameOver && e.code === "KeyR") {
            restartGame();
        }
    });

}

function update(){
    requestAnimationFrame(update);

    if (gameOver){
        return;
    }

    //clear canvas so multiple frames don't stack on each other
    context.clearRect(0,0,board.width, board.height);

    //ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //alien
    for(let i = 0; i < alienArray.length; i++){
        let alien = alienArray[i];
        if(alien.alive){
            alien.x += alienVelocityX;

            //to make sure aliens don't move out of frame
            if(alien.x + alien.width >= board.width || alien.x <= 0){
                alienVelocityX *= -1;
                alien.x += alienVelocityX * 2;

                //move all aliens down by one row
                for(let j = 0; j < alienArray.length; j++){
                    alienArray[j].y += alienHeight;
                }
            }
            context.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);

            // game over condition
            if (alien.y >= ship.y) {
                gameOver = true;
            }
        }

        if (gameOver) {
            //white background box
            const boxWidth = 240;
            const boxHeight = 100;
            const boxX = boardWidth / 2 - boxWidth / 2;
            const boxY = boardHeight / 2 - boxHeight / 2;
            context.fillStyle = "white";
            context.fillRect(boxX, boxY, boxWidth, boxHeight);

            context.fillStyle = "black";
            context.font = "32px Courier";
            context.fillText("GAME OVER", boxX + 25, boxY + 40);
            context.font = "16px Courier";
            context.fillText("Press R to Restart", boxX + 30, boxY + 70);
        }
    }

    //bullets
    for(let i = 0; i < bulletArray.length; i++){
        let bullet = bulletArray[i];
        bullet.y += bulletVelocityY;
        context.fillStyle = "White" //to change pen color
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        //bullet collision with aliens
        for (let j = 0; j < alienArray.length; j++) {
            let alien = alienArray[j];
            if (!bullet.used && alien.alive && detectCollision(bullet, alien)) {
                bullet.used = true;
                alien.alive = false;
                alienCount--;
                score += 100;
            }
        }
    }

    //clear bullets
    while(bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y <0)){
        bulletArray.shift() //removes first element of array
    }
    
    //next level
    if (alienCount == 0) {
        //increase the number of aliens in columns and rows by 1
        score += alienColumns * alienRows * 100; //bonus points :)
        alienColumns = Math.min(alienColumns + 1, columns/2 -2); //cap at 16/2 -2 = 6
        alienRows = Math.min(alienRows + 1, rows-4);  //cap at 16-4 = 12
        if (alienVelocityX > 0) {
            alienVelocityX += 0.2; //increase the alien movement speed towards the right
        }
        else {
            alienVelocityX -= 0.2; //increase the alien movement speed towards the left
        }
        alienArray = [];
        bulletArray = [];
        createAliens();
    }

    //score
    context.fillStyle="white";
    context.font="16px courier";
    context.fillText(score, 5, 20);

}

function moveShip(e){
    if (gameOver){
        return;
    }
    if(e.code == "ArrowLeft" && ship.x - shipVelocityX >=0){ //conditions so that ship does not go out of frame from left side
        ship.x -= shipVelocityX; //move ship to the left by one tile
    }
    else if(e.code == "ArrowRight" && ship.x + shipVelocityX + ship.width <= board.width){ //conditions so that ship does not go out of frame from right side
        ship.x += shipVelocityX; //move ship to the right by one tile
    }
}

function createAliens(){
    for(let c = 0; c < alienColumns; c++){
        for(let r = 0; r < alienRows; r++){
            let alien = {
                img : alienImg,
                x : alienX + c * alienWidth,
                y : alienY + r * alienHeight,
                width : alienWidth,
                height : alienHeight,
                alive : true
            }
            alienArray.push(alien);
        }
    }
    alienCount = alienArray.length;
}

function shoot(e){
    if (gameOver){
        return;
    }
    if(e.code == "Space"){
        //shoot
        let bullet = {
            x : ship.x + shipWidth * 15/32,
            y : ship.y,
            width : tileSize/8,
            height : tileSize/2,
            used : false
        }
        bulletArray.push(bullet);
    }
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function restartGame() {
    // reset game variables
    alienArray = [];
    bulletArray = [];
    alienColumns = 3;
    alienRows = 2;
    alienVelocityX = 1;
    score = 0;
    gameOver = false;

    // reset ship position
    ship.x = shipX;
    ship.y = shipY;

    // recreate aliens
    createAliens();
}
