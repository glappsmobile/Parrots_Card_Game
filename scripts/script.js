let cards = [];
let match = "";
let lastCard = undefined;
let block = false;
let cFlippeds = 0;
let cPlays = 0;
let cCards = 0;
let elapsedSeconds = 0;
let lastTime = 0;
let score = 0;

const intervals = [];


function askSize(){
    let isPair = false;
    let isCorrectLength = false;
    let length;
    
    while(!isPair || !isCorrectLength) {
        length = Number(prompt("Com quantas cartas deseja jogar? \n (Par entre 4 e 14)"));
        isPair = Boolean(length % 2 === 0);
        isCorrectLength = Boolean(length >= 4 && length <= 14);
    } 

    gerarCartas(length);
}


function defineCards(length){
    const halfCards = length/2;
    parrots.sort(randomSorter);

    for (i = 0; i < halfCards; i++){
        cards.push(parrots[i]);
        cards.push(parrots[i]);
    }

    cards.sort(randomSorter);
}


function gerarCartas(length){
    cCards = length;
    defineCards(length);
    const ctnCards = document.querySelector(".ctn-cards");
    ctnCards.innerHTML = "";

    for(i = 0; i < length; i++){
        ctnCards.innerHTML += 
        `<li class="card" onclick="reveal(this)">
            <div class="front-face face">
                <img src="images/front.png"/>
            </div>
            <div class="back-face face">
                <img src="images/${cards[i]}.gif"/>
            </div>
        </li>`;
    }
}

function reveal(card){
    if (!block){
        cPlays++;
        const index = getChildIndex(card);
        const cardValue = cards[index];
        card.classList.add("active");

        const isComparing = lastCard !== undefined;

        if (isComparing){
            const isRightAnswer = cardValue === match;

            if (isRightAnswer) {
                scoreGenerator();
                card.removeAttribute("onClick");
                cFlippeds += 2;
                if (cFlippeds == cCards) gameOver();

            } else if (!isRightAnswer) {
                unreveal([card, lastCard]);
                blockAction();
            }

            match = "";
            lastCard = undefined;

        } else if (!isComparing){
            lastCard = card;
            match = cardValue;
            card.removeAttribute("onClick");
        }
    }

}

function blockAction(){
    block = true;
    setTimeout(() => {  
        block = false;
    }, delay);
}

function gameOver(){
    setTimeout(alert, delay, `Você ganhou em ${cPlays} jogadas!`);
}

function unreveal(arrCards) {
    setTimeout(() => {  
        arrCards.forEach(card => {
            card.classList.remove("active");
            card.setAttribute( "onClick", "reveal(this)");
        });
        block = false;
    }, delay);
}

function getChildIndex(child){ 
    let index = 0;
    while( (child = child.previousSibling) != null ) index++;

    return index;
}

function randomSorter(){
    return Math.random() - 0.5;
}

function secondsToMinSec(s){return(s-(s%=60))/60+(9<s?':':':0')+s}


function timer(){
    let tvTimer = document.querySelector(".ctn-status .timer");
    tvTimer.innerHTML = elapsedSeconds;

    let intervalTimer = setInterval( () => {
        elapsedSeconds++;
        tvTimer.innerHTML = secondsToMinSec(elapsedSeconds);

    }, 1000);

    intervals.push({id: intervalTimer, name: "timer"});
}


function getMultiplier(multiplier){
    switch(multiplier){
        case MULTIPLIER_ODDS:
            let remainingCards = cCards - cFlippeds - 1;
            let odds = (1 / remainingCards);
            let multiplierOdds = ((1 - odds) + 1/odds);
            return multiplierOdds;

        case MULTIPLIER_TIME:
            let time = elapsedSeconds - lastTime;
            if (time > 20) time = 20;
            let multiplierTime = time/20;
            if (multiplierTime < 1) multiplierTime = (multiplierTime-2)*(-1);
            lastTime = elapsedSeconds;
            return multiplierTime;

        case MULTIPLIER_PLAYS:
            let seen =  (cPlays-cFlippeds-2)/2;
            let multiplierPlays = 10 - ((seen/2) * (20/cCards));
            return multiplierPlays;

        default:
            console.error("Invalid multiplier: "+multiplier);
            return 1;
    }
}


function scoreGenerator(){
    let tvScore = document.querySelector(".ctn-status .score");
    let generatedScore = 100;
    let multiplierOdds = getMultiplier(MULTIPLIER_ODDS);
    let multiplierTime = getMultiplier(MULTIPLIER_TIME);
    let multiplierPlays = getMultiplier(MULTIPLIER_PLAYS);

    generatedScore = (multiplierTime * multiplierPlays * generatedScore) + (generatedScore * multiplierOdds);

    score += Number.parseInt(generatedScore);

    tvScore.innerHTML = `SCORE: ${score}`;
    
    console.log(`multiplierOdds = ${multiplierOdds}`);
    console.log(`multiplierTime = ${multiplierTime}`);
    console.log(`multiplierPlays = ${multiplierPlays}`);
}


function startGame(){
    timer();
    //askSize();
    gerarCartas(10);
}

startGame();

