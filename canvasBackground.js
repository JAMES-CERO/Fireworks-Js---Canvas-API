
(() => {

const canvas = document.getElementById('background');
const context = canvas.getContext('2d');

//get document's width & height
const width = window.innerWidth;
const height = window.innerHeight;

// set background to be fullscreen

canvas.width = width;
canvas.height = height;
// stars variables 

const stars = 50;
// helper function to generate random numbers
const random = (min,max) => Math.random() * (max - min) + min;


//IIFE.  inmediatly invoke function expression 


//An IIFE is composed of three main components:

// A grouping operator: The first pair of parentheses ()
// A function: Enclosed within the grouping operator
// An invocator: The last pair of parentheses ()

const drawBackground = () => {
    // The inner circle is at x=0, y=0, with radius=height
    // The outer circle is at x=0, y=0, with radius=width
    const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);
    //offset and color 
    gradient.addColorStop(0, '#002D62');
    gradient.addColorStop(0.5, '#0066b2');
    gradient.addColorStop(1, '#6699CC');


    // MAKE CANVAS THE COLOR OF GRADIENT
    context.fillStyle = gradient;
    
    //top-left corner at (0,0) 
    context.fillRect(0, 0, width, height);
};

drawBackground();

const drawForeground = () => {
    context.fillStyle = '#13274F';
    context.fillRect(0, height * 0.95, width, height);
    
    context.fillStyle = '#002D62';
    context.fillRect(0, height * 0.955, width, height);
  };

const drawStars = () => {
    let countStars = stars;

    context.fillStyle = '#E6E6FA';

    while(countStars--){

        const x = random(15, width - 50);
        const y = random(15, height * 0.5);
        const size = random(1, 4);

        context.fillRect(x, y, size, size);

    }
}

  drawBackground();
  drawForeground();
  drawStars();
  })();
