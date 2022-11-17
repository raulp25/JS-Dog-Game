import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import { UI } from './UI.js';
 
/** @type {HTMLCanvasElement}  */

window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 500;

class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.groundMargin = 40;
        this.speed = 0;
        this.maxSpeed = 3;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.enemies = [];
        this.particles = [];
        this.collisions = [];
        this.flaotingMessages = [];
        this.maxParticles = 50;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.debug = false;
        this.score = 0;
        this.winningScore = 50;
        this.fontColor = 'black';
        this.time = 0;
        this.maxTime = 30000;
        this.gameOver = false;
        this.lives = 5;
        this.player.currentState = this.player.states[0];
        this.player.currentState.enter();
    } 

    update(deltaTime) {
        this.time += deltaTime;
        if(this.time > this.maxTime) this.gameOver = true;
        this.background.update();
        this.player.update(this.input.keys, deltaTime);
        //* handleEnemies
        if (this.enemyTimer > this.enemyInterval){
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }
     
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
            
        } )
        //* handle floatingMesssages
        this.flaotingMessages.forEach(message => {
            message.update();
        } )
        // *handle particles
        this.particles.forEach((particle, index) => {
            particle.update();
            
        });
        if(this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }

        // *handle collision sprites
        this.collisions.forEach((collision, index) => {
            collision.update(deltaTime);
            
        })
          
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        this.particles = this.particles.filter(particle => !particle.markedForDelition);
        this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
        this.flaotingMessages = this.flaotingMessages.filter(message => !message.markedForDeletion);
        
    }
    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.enemies.forEach(item => {
            item.draw(context);
        });
        this.particles.forEach(particle => {
           particle.draw(context);
        });
        this.collisions.forEach(collisions => {
            collisions.draw(context);
        });
        //* handle floatingMesssages
        this.flaotingMessages.forEach(message => {
            message.draw(context);
        });
        this.ui.draw(context);

    }
    addEnemy() {
        if (this.speed > 0 && Math.random() + 0.2 < 0.5)  this.enemies.push(new GroundEnemy(this));
        if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
        this.enemies.push(new FlyingEnemy(this));       
    }
}

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

 function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if(!game.gameOver)requestAnimationFrame(animate);   
    }
    animate(0);
})






