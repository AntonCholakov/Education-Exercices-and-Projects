//playGround variables
var playGround = document.getElementById("playGround");
var ctx = playGround.getContext("2d");

// game variables
var startingScore = 50;
var startingLives = 5;
var continueAnimating = false;
var score;
var lives;

// block variables
var blockWidth = 30;
var blockHeight = 15;
var blockSpeed = 20;
var block = {
    x: 0,
    y: playGround.height - blockHeight,
    width: blockWidth,
    height: blockHeight,
    blockSpeed: blockSpeed
}

// rock variables
var rockWidth = 15;
var rockHeight = 15;
var totalRocks = 20;
var rocks = [];
for (var i = 0; i < totalRocks; i++) {
    addRock();
}

function addRock() {
    var rock = {
        width: rockWidth,
        height: rockHeight
    }
    resetRock(rock);
    rocks.push(rock);
}

// move the rock to a random position near the top-of-playGround
// assign the rock a random speed
function resetRock(rock) {
    rock.x = Math.random() * (playGround.width - rockWidth);
    rock.y = 15 + Math.random() * 30;
    rock.speed = 0.2 + Math.random() * 0.5;
}


//left and right keypush event handlers
document.onkeydown = function (event) {
    if (event.keyCode == 39) {
        block.x += block.blockSpeed;
        if (block.x >= playGround.width - block.width) {
            block.x = playGround.width - block.width;
        }
    } else if (event.keyCode == 37) {
        block.x -= block.blockSpeed;
        if (block.x <= 0) {
            block.x = 0;
        }
    }
}


function animate() {

    // request another animation frame

    if (continueAnimating) {
        requestAnimationFrame(animate);
    }

    // for each rock
    // (1) check for collisions
    // (2) advance the rock
    // (3) if the rock falls below the playGround, reset that rock

    for (var i = 0; i < rocks.length; i++) {

        var rock = rocks[i];

        // test for rock-block collision
        if (isColliding(rock, block)) {
            score -= 100;
            lives -= 1;
            resetRock(rock);

            if (lives == 0) {
                continueAnimating = false;
                $("#result").html("Game Over! <br> Your score is " + score);
            }            
        }

        // advance the rocks
        rock.y += rock.speed;

        // if the rock is below the playGround,
        if (rock.y > playGround.height) {
            resetRock(rock);
            score += 10;
        }

    }

    // redraw everything
    drawAll();

}

function isColliding(a, b) {
    return !(
    b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
}

function drawAll() {

    // clear the playGround
    ctx.clearRect(0, 0, playGround.width, playGround.height);

    // draw the block
    ctx.fillStyle = "brown";
    ctx.fillRect(block.x, block.y, block.width, block.height);
    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(block.x, block.y, block.width, block.height);

    // draw all rocks
    for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        // optionally, drawImage(rocksImg,rock.x,rock.y)
        ctx.fillStyle = "yellow";
        ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
    }

    // draw the score
    ctx.font = "14px Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 15);

    //draw the lives
    ctx.font = "16px Times New Roman";
    ctx.fillStyle = "white";
    ctx.fillText("Lives left: " + lives, 170, 15);
}

// button to start the game
$("#start").click(function () {
    score = startingScore;
    lives = startingLives;
    block.x = 0;
    for (var i = 0; i < rocks.length; i++) {
        resetRock(rocks[i]);
    }
    if (!continueAnimating) {
        continueAnimating = true;
        animate();
    };
});