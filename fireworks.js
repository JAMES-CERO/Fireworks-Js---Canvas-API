(() => {
    const canvas = document.getElementById('fireworks'); 
    const context = canvas.getContext('2d'); 
  
    
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    // set background to be fullscreen
    canvas.width = width;
    canvas.height = height;

    const positions = {
        mouseX:0,
        mouseY:0,
        anchorX:0,
        anchorY:0
    };

    //variables for the shooting
    const fireworks = [];
    const shoots = [];
    const shoots2 = [];
    const shoots3 = [];
    const shootsTotal = 25;

    const random = (min, max) => Math.random()*(max-min)+ min;

    // distance betwwen 2 points  - pythagorean theorem 
    // d = √x² + y², where x = x1 - x2, and y = y1 - y2
    const distance = (x1, y1, x2, y2) => {
        const xDistance = x1 - x2;
        const yDistance = y1 - y2;

        return Math.sqrt(Math.pow(xDistance, 2 )+ Math.pow(yDistance, 2));
    };

    let mouseClicked = false;


    const anchorPoint = () => {
        //get the anchor position on canvas 
        positions.anchorX = width / 2;
        positions.anchorY = height * 0.9;

        //erase the pixels in a rectangular area
        context.clearRect(0, 0, width, height);

        //save content to remove transformnation afterwards 
        context.save();

        // trnalation / tranformation to teh current matrix moving canvas on the grid
        context.translate(positions.anchorX, positions.anchorY);

        // restores the empty context state
        context.restore();
    };

     //event listener / to track mouse-clickevents 
     const attachEventListener = () => {
        canvas.addEventListener('mousemove', (e) => {
            positions.mouseX = e.pageX
            positions.mouseY = e.pageY
        });

        canvas.addEventListener('mousedown', () => (mouseClicked = true));
        canvas.addEventListener('mouseup', () => (mouseClicked = false));
    };
    
    //set the mouse position to the coordinates 
    const eventLPositions = () => {
        canvas.addEventListener('mousemove', (e) => {
            positions.mouseX = e.pageX; 
            positions.mouseY = e.pageY;
        });
    };

    const loop = () => {
        //call the loop  indefinitely and redraw the scrren every fraame 
        requestAnimationFrame(loop);
        anchorPoint();
        if (mouseClicked) {
            fireworks.push(new Firework());
        }

        let fireworkIndex = fireworks.length;
        while (fireworkIndex--){
            fireworks[fireworkIndex]. draw(fireworkIndex);
        }

        let shootIndex = shoots.length;
        while(shootIndex--){
            shoots[shootIndex].draw(shootIndex);
        }

        let shootIndex2 = shoots2.length;
        while(shootIndex2--){
            shoots2[shootIndex2].draw(shootIndex2);
        }

        let shootIndex3 = shoots3.length;
        while(shootIndex3--){
            shoots3[shootIndex3].draw(shootIndex3);
        }
    };

    window.addEventListener('load', () => {
        attachEventListener();
        loop();
    });

    // to create new Fw is necesary a constructor class
    class Firework {
        constructor() {
            const init = () => {
                let fireworksLength = 8;
                
                //current coordinates
                this.x = positions.anchorX;
                this.y = positions.anchorY;
                
                //target coordinates
                this.target_x = positions.mouseX;
                this.target_y = positions.mouseY;

                //distance from the starting point to the target
                this.distanceToTarget= distance(
                    this.x,
                    this.y,
                    this.target_x,
                    this.target_y
                );
                this.distanceTotal = 0;

                this.coordinates = [];
                this.angle = Math.atan2(
                    this.target_x - positions.anchorX,
                    this.target_y - positions.anchorY
                );
                this.speed = 15;
                this.friction = 0.99;
                this.hue = random(0, 360);

                while( fireworksLength--) {
                    this.coordinates.push([this.x, this.y]);
                }
            };

            this.animate = (index) => {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);

                this.speed += this.friction;

                let velocity_x = Math.cos(this.angle) * this.speed;
                let velocity_y = Math.sin(this.angle) * this.speed;

                this.distanceTotal = distance(
                    positions.anchorX,
                    positions.anchorY,
                    this.x + velocity_x,
                    this.y = velocity_y
                );

                if(this.distanceTotal >= this.distanceToTarget) {
                    let i = shootsTotal;

                    while(i--){
                        shoots.push(new Shooting(this.target_x, this.target_y));
                        shoots2.push(new Shooting(this.target_x + 50, this.target_y - 50));
                        shoots3.push(new Shooting(this.target_x - 100, this.target_y - 50));
                    } //This will add the shoots to their corresponding arrays and position them relative to each other when the firework or better to say its trail, itself will get drawn.
                   
                    fireworks.splice(index, 1);
                } else {
                    this.x += velocity_x;
                    this.y += velocity_y;
                }

            }

            this.draw = (index) => { // take the index from the fw array
                context.beginPath();
                context.moveTo(
                    this.coordinates[this.coordinates.length - 1][0],
                    this.coordinates[this.coordinates.length - 1][1]
                );
                context.lineTo(this.x, this.y);

                context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;//saturation / brightness
                context.stroke();

                this.animate(index);
            };
            init();
        }
    }

    class Shooting{
        constructor(x, y) {
            const init = () => {
                this.x = x;
                this.y = y;

                let shootLenght = 7;
                this.coordinates = [];
                this.angle = random(0, Math.PI * 2);
                this.speed = random(1, 10);
			
                this.friction = 0.95;
                this.gravity = 2;
			
                this.hue = random(0, 360);
                this.alpha = 1;
                this.decay = random(0.015, 0.03);
			
      while ( shootLenght--) {
        this.coordinates.push([this.x, this.y]);
            }
        }
        this.animate = (index) => {
            this.coordinates.pop();
            this.coordinates.unshift([this.x, this.y]);

            this.speed += this.friction;
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed + this.gravity;

            this.alpha -= this.decay;

            if (this.alpha <= this.decay) {
                shoots.splice(index, 1);
                shoots2.splice(index, 1);
                shoots3.splice(index, 1);
            }
        };
        this.draw = (index) => {
            context.beginPath();
            context.moveTo(
              this.coordinates[this.coordinates.length - 1][0],
              this.coordinates[this.coordinates.length - 1][1]
            );
            context.lineTo(this.x, this.y);
              
            context.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
            context.stroke();
            //note the same logic that is used for the fireworks trail is applied. The only difference is, that the strokeStyle also contains an alpha value to fade out the shoots / flecks over tim
              
            this.animate(index);
          };
          
          init();
        }
    }

})();
