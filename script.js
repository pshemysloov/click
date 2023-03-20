let CIRCLE_RADIUS = 50;
let circle = document.getElementById("circle");
let box = document.getElementById("box");
let score = document.getElementById("score");

circle.style.width = `${CIRCLE_RADIUS}px`
circle.style.height = `${CIRCLE_RADIUS}px`

let WIDTH = 800 - CIRCLE_RADIUS;
let HEIGHT = 600 - CIRCLE_RADIUS;

box.style.width = `${WIDTH}px`
box.style.height = `${HEIGHT}px`
box.style.padding = `${CIRCLE_RADIUS}px`

let SCORE = 0;
score.innerHTML = SCORE;

function click_good(){
    let top = Math.floor(Math.random() * HEIGHT);
    let left = Math.floor(Math.random() * WIDTH);
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
    
    SCORE += 1;
    score.innerHTML = SCORE;

    event.stopPropagation();
}
function click_bad(){
    hearts = document.getElementsByClassName("heart")
    hearts[0].remove()
    if(hearts.length == 0){
        circle.removeAttribute("onclick");
    }

    event.stopPropagation();
}

click_good();