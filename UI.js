export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 55;
        this.fontFamily = 'Creepster';
        this.livesImage = lives;
        
    }

    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'red';
        context.shadowBlur = 0;

        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score: ' + this.game.score, 20, 80);
        //* timer 
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 140);
        //* lives
        for (let i = 0; i < this.game.lives; i++) {
            
            context.drawImage(this.livesImage, 45*i + 20, 160, 40, 40)
            
        }
        //* game over message 
        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if(this.game.score > this.game.winningScore){

                context.fillText('Boo-yah You won: ',  this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
                context.fillText('Monsters are afraid of this motherfucka',  this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
                
                 context.fillText('Love at first bite?: ',  this.game.width * 0.5, this.game.height * 0.5 - 20);
                 context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
                 context.fillText('Nop better luck next time',  this.game.width * 0.5, this.game.height * 0.5 + 20);

            }
        }
        context.restore();
        }
}