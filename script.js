var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// завантаження картинок
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// звукові файли
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// оголошення змінних
var gap = 90; // розрив між перешкодами
var score = 0;
// позиція пташки
var xPos = 10;
var yPos = 150;
var grav = 1.3;

// масив для динамічного виставлення блоків
var pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};


// виставлення картинок
function draw() {
    ctx.drawImage(bg, 0, 0);

// динамічне виставлення блоків
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
// перевірка чи не зачепив перешкоду
        if(xPos + bird.width >= pipe[i].x
           && xPos <= pipe[i].x + pipeUp.width
           && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
          || yPos + bird.height >= cvs.height - fg.height) {
                location.reload(); // перезагрузка сторінки
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Рахунок: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);

}

// при нажиманні на будь-яку кнопку  -  пташка підіймається вгору
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos  -= 30;
    fly.play();
}


// картинки виставляються після завантаження останньої
pipeBottom.onload = draw;
