let circle;
let box = document.getElementById("box");
let score = document.getElementById("score");
let hearts = document.getElementsByClassName("heart");
let topbar = document.getElementById('topbar');
let lives = document.getElementById('lives');
let end_button;
let start_button = document.getElementById('start_button');

let CIRCLE_RADIUS = 50;
let BOX_WIDTH = 800;
let BOX_HEIGHT = 600;
let SCORE = 0;
let HEART_SVG = '<svg class="heart" xmlns="http://www.w3.org/2000/svg" width="50" height="50" stroke="red" fill="red" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>';
let HEART_COUNT = 2;
let TOPBAR_HEIGHT = 70;
let lose_message = "Przegrałeś";
let lose_score;

box.style.width = `${BOX_WIDTH}px`;
box.style.height = `${BOX_HEIGHT}px`;

topbar.style.height = `${TOPBAR_HEIGHT}px`;
topbar.style.width = `${BOX_WIDTH}px`;

start_button.addEventListener('click', start)

function random_circle_pos(){
    let top = Math.floor(Math.random() * (BOX_HEIGHT - 2 * CIRCLE_RADIUS) + CIRCLE_RADIUS);
    let left = Math.floor(Math.random() * (BOX_WIDTH - 2 * CIRCLE_RADIUS) + CIRCLE_RADIUS);
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
}

function start(){
    event.stopPropagation();
    box.innerHTML = '<div id="circle" class="circle"></div>';
    circle = document.getElementById("circle");
    circle.style.width = `${CIRCLE_RADIUS}px`;
    circle.style.height = `${CIRCLE_RADIUS}px`;
    score.innerText = SCORE;

    SCORE = 0;

    circle.addEventListener("click", click_good);
    box.addEventListener("click", click_bad);
    random_circle_pos();
    
    for(let i = HEART_COUNT; i > 0; i--){
        lives.innerHTML += HEART_SVG;
    }
}

function end(){
    circle.removeEventListener("click", click_good);
    box.removeEventListener("click", click_bad);
    circle.remove();

    lose_score = SCORE;
    score.innerText = ''

    box.innerHTML = `
    <div id="end_screen">
    <span id="end_message">${lose_message}</span>
    <span id="end_score">${lose_score}</span>
    <button id="end_button" class='btn'>START</button>
    </div>`

    end_button = document.getElementById('end_button')
    end_button.addEventListener("click", start)
}

function click_good(){
    event.stopPropagation()
    random_circle_pos();
    SCORE += 1;
    score.innerText = SCORE;
};

function click_bad(){
    event.stopPropagation();
    if(hearts.length > 0){
        hearts[0].remove();
        random_circle_pos();
    }
    if(hearts.length == 0){
        end();
    }
}
