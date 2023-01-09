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

    //event listener / to track mouse-clickevents 
    const attachEventListener = () => {
        canvas.addEventListener('mousemove', (e) => {
            positions.mouseX = e.pageX
            positions.mouseY = e.pageY
        });

        canvas.addEventListener('mousedown', () => (mouseClicked = true));
        canvas.addEventListener('mouseup', () => (mouseClicked = false));
    };

    //------------

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
    
    //set the mouse position to the coordinates 
    const eventLPositions = () => {
        canvas.addEventListener('mousemove', (e) => {
            positions.mouseX = e.pageX; 
            positions.mouseY = e.pageY;
        });
    };

    const loop = () => {
        //clla the loop f indefinitely and redraw the scrren every fraame 
        requestAnimationFrame(loop);
        anchorPoint();
    };

    window.addEventListener('load', () => {
        eventLPositions();
        loop();
    });

    // to create new Fw is necesary a constructor class
    class Firework {
        constructor() {
            const init = () => {
                
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
                
            }
            init();
        }
    }
})();
