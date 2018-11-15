// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
        this.x = x;
        this.y = y + 60;
        this.width = 101;
        this.height = 81;
        this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }

// Update the enemy's position, required method for game
// handles collision with player
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        for(let enemy of allEnemies) {
            this.x += this.speed * dt;

        //if(this.x > this.width * 5) {
            //this.x = - this.width;
        //}
            if(this.x < this.width * 5) {
            this.x += this.speed * dt;
            }
            else{
                this.x = - this.width;
            }
        }
    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.width = 101;
        this.height = 83;
        this.startX = this.width * 2;
        this.startY = (this.height * 4) + 60;
        this.x = this.startX;
        this.y = this.startY;
    }
// check for collisions of the player with the enemies
    update() {
        for(let enemy of allEnemies) {


            if((enemy.x + enemy.width/2 > this.x && enemy.x < this.x + this.width/2) && this.y === enemy.y) {
                // console.log(this.y, enemy.y, this.x, enemy.x);
                this.resetPlayer();
            }
        }
        if(this.y === 60) {
            var that = this;
            setTimeout(function(){
                that.resetPlayer();
                popUp();
            },500);
        }
    }

// draw player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

// moves the player according to the user input (key that was pressed)
    handleInput(input) {
        if(input === 'left') {
            if(this.x > 0) {
                this.x -= this.width;
            }

        }
        else if(input === 'up') {
            if(this.y > this.height) {
                this.y -= this.height;
            }

        }
        else if(input === 'right') {
            if(this.x < this.width * 4) {
                this.x += this.width;
            }

        }
        else if(input === 'down') {
            if(this.y < this.height * 4) {
                this.y += this.height;
            }

        }

    }

// moves player back to initial position on the game board
    resetPlayer() {
            this.x = this.startX;
            this.y = this.startY;
    }
}

//create a end of game modal with a replay button
function popUp() {
    $('#congratsModal').modal('show');
    clickReplay();
}

//replay button
function clickReplay() {
    const startOverBtn = document.getElementsByClassName("replay");
        startOverBtn[0].addEventListener("click", function() {
            $('#congratsModal').modal('hide');
            player.resetPlayer();
        });
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const bug1 = new Enemy(-101, 0, 10);
const bug2 = new Enemy(-101, 0, 20);
const bug3 = new Enemy(-101, 83, 30);
const bug4 = new Enemy(-101, 83, 40);
const bug5 = new Enemy(-101, 83*2, 15);


const allEnemies = [];

// allEnemies.push(bug2);
allEnemies.push(bug1, bug2, bug3, bug4, bug5);

const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

