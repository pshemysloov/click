let box = document.getElementById("box");
let hearts = document.getElementsByClassName("heart");
let topbar = document.getElementById('topbar');
let start_button = document.getElementById('start-button');
let timer_bar; // start() | DOM Element
let circle; // start() | DOM Element
let score; // start() | DOM Element
let lives; // start() | DOM Element
let end_button; // end() | DOM Element
let countdown; // timer_flow_reset() | setInterval

let HEART_SVG = '<svg class="heart" xmlns="http://www.w3.org/2000/svg" width="50" height="50" stroke="red" fill="red" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>';
let CIRCLE_RADIUS = 50; //px
let BOX_WIDTH = 1000; //px
let BOX_HEIGHT = 500; //px
let HEART_COUNT = 6;
let LOSE_MESSAGE = "Przegrałeś";
let TIMER_TIME = 1000 // ms
let TIMER_WIDTH = 0;
let SCORE; // start()
let LOSE_SCORE; // end()

box.style.width = `${BOX_WIDTH}px`;
box.style.height = `${BOX_HEIGHT}px`;

topbar.style.width = `${BOX_WIDTH}px`;

start_button.addEventListener('click', start)

function random_circle_pos(){
    let top = Math.floor(Math.random() * (BOX_HEIGHT - 2 * CIRCLE_RADIUS) + CIRCLE_RADIUS);
    let left = Math.floor(Math.random() * (BOX_WIDTH - 2 * CIRCLE_RADIUS) + CIRCLE_RADIUS);
    circle.style.top = `${top}px`;
    circle.style.left = `${left}px`;
}

function timer_flow(){
    TIMER_WIDTH += 1
    timer_bar.style.width = `${TIMER_WIDTH}%`
    if(TIMER_WIDTH == 100){
        losing_heart();
        timer_flow_reset();
    }
}

function timer_flow_reset(){
    clearInterval(countdown);
    TIMER_WIDTH = 0;
    timer_bar.style.width = TIMER_WIDTH;
    countdown = setInterval(timer_flow, TIMER_TIME/100);
}

function losing_heart(){
    if(hearts.length > 0){
        hearts[0].remove();
        random_circle_pos();
    }
    if(hearts.length == 0){
        end();
    }
}

function getting_point(){
    SCORE += 1;
    score.innerText = SCORE;
}

function start(){
    event.stopPropagation();
    topbar.innerHTML = `
    <div id="lives"></div>
    <div id="timer-bar-container">
        <div id="timer-bar"></div>
    </div>
    <span id="score"></span>`

    lives = document.getElementById('lives')
    timer_bar = document.getElementById('timer-bar')
    score = document.getElementById("score")

    box.innerHTML = '<div id="circle" class="circle"></div>';
    circle = document.getElementById("circle");
    circle.style.width = `${CIRCLE_RADIUS}px`;
    circle.style.height = `${CIRCLE_RADIUS}px`;
    
    SCORE = 0;
    score.innerText = SCORE;

    circle.addEventListener("click", click_good);
    box.addEventListener("click", click_bad);
    random_circle_pos();
    
    for(let i = HEART_COUNT; i > 0; i--){
        lives.innerHTML += HEART_SVG;
    }

    timer_flow_reset();
}

function end(){
    circle.removeEventListener("click", click_good);
    box.removeEventListener("click", click_bad);
    circle.remove();

    LOSE_SCORE = SCORE;
    topbar.innerHTML = '';

    box.innerHTML = `
    <div id="end-screen">
    <span id="end-message">${LOSE_MESSAGE}</span>
    <span id="end-score">${LOSE_SCORE}</span>
    <button id="end-button" class='btn'>START</button>
    </div>`

    clearInterval(countdown)

    end_button = document.getElementById('end-button')
    end_button.addEventListener("click", start)
}

function click_good(){
    event.stopPropagation()
    random_circle_pos();
    getting_point()
    timer_flow_reset()
};

function click_bad(){
    event.stopPropagation();
    losing_heart()
    timer_flow_reset()
}
