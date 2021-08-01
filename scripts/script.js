let cards = [];
let match = "";
let lastCard = undefined;
let isBlocked = false;
let cFlippeds = 0;
let cPlays = 0;
let cCards = 0;
let elapsedSeconds = 0;
let lastTime = 0;
let score = 0;

let intervals = [];


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
    parrots.sort(sorterRandom);

    for (i = 0; i < halfCards; i++){
        cards.push(parrots[i]);
        cards.push(parrots[i]);
    }

    cards.sort(sorterRandom);
}


function gerarCartas(length){
    cCards = length;
    defineCards(length);
    const ctnCards = document.querySelector(".ctn-cards");
    ctnCards.innerHTML = "";

    for(i = 0; i < length; i++){
        ctnCards.innerHTML += 
        `<li class="card"  id="${i}" onclick="reveal(this)">
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
    if (!isBlocked){
        cPlays++;
        const index = card.id;
        const cardValue = cards[index];
        const gif = card.querySelector(".back-face img");

        card.classList.add("active");
        gif.setAttribute("src", gif.src);

        const isComparing = lastCard !== undefined;

        if (isComparing){
            const isRightAnswer = cardValue === match;

            if (isRightAnswer) {
                scoreGenerator();
                card.removeAttribute("onClick");
                cFlippeds += 2;
                if (cFlippeds == cCards) gameOver();

            } else if (!isRightAnswer) {
                isBlocked = true;
                unreveal([card, lastCard]);
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


function unreveal(arrCards) {
    setTimeout(() => {  
        arrCards.forEach(card => {
            card.classList.remove("active");
            card.setAttribute( "onClick", "reveal(this)");
        });
        isBlocked = false;
    }, ONE_SECOND);
}



function sorterRandom(){
    return Math.random() - 0.5;
}

function sortObjectByScore(a, b){
    return parseFloat(b.score) -  parseFloat(a.score);
}

function secondsToMinSec(s){return(s-(s%=60))/60+(9<s?':':':0')+s}


function timer(){
    let tvTimer = document.querySelector(".ctn-status .timer");
    tvTimer.innerHTML = secondsToMinSec(elapsedSeconds);

    let intervalTimer = setInterval( () => {
        elapsedSeconds++;
        tvTimer.innerHTML = secondsToMinSec(elapsedSeconds);

    }, ONE_SECOND);

    intervals.push({id: intervalTimer, name: "timer"});
}

function stopTimer(){
    clearInterval(intervals[0].id);
}

function getMultiplier(multiplier){
    switch(multiplier){
        case MULTIPLIER_ODDS:
            let remainingCards = cCards - cFlippeds - 1;
            let odds = (1 / remainingCards);
            let multiplierOdds = ((1 - odds) + (1/odds)/ODDS_WEIGHT);
            return multiplierOdds;

        case MULTIPLIER_TIME:
            let time = elapsedSeconds - lastTime;
            if (time > SCORE_MAX_TIME) time = SCORE_MAX_TIME;
            let multiplierTime = time/SCORE_MAX_TIME;
            if (multiplierTime < 1) multiplierTime = (multiplierTime-2)*(-1);
            lastTime = elapsedSeconds;
            return multiplierTime;

        case MULTIPLIER_PLAYS:
            let seen =  (cPlays-cFlippeds-2)/2;
            let multiplierPlays = 10 - ((seen/2) * (SCORE_SEEN_DIFFICULTY/cCards));
            if (multiplierPlays < 1) multiplierPlays = 1;
            return multiplierPlays;

        default:
            console.error("Invalid multiplier: "+multiplier);
            return 1;
    }
}


function cleanGame(){
    if (intervals.length > 0) stopTimer();
    elapsedSeconds = 0;
    score = 0;
    cards = [];
    match = "";
    lastCard = undefined;
    isBlocked = false;
    cFlippeds = 0;
    cPlays = 0;
    cCards = 0;
    lastTime = 0;
    intervals = [];

    const tvScore = document.querySelector(".ctn-status .score");
    tvScore.innerHTML = "SCORE: 0"

}

function scoreGenerator(){
    let tvScore = document.querySelector(".ctn-status .score");
    let generatedScore = 100;
    let multiplierOdds = getMultiplier(MULTIPLIER_ODDS);
    let multiplierTime = getMultiplier(MULTIPLIER_TIME);
    let multiplierPlays = getMultiplier(MULTIPLIER_PLAYS);

    generatedScore = (multiplierPlays + multiplierTime + multiplierOdds ) * generatedScore;

    score += Number.parseInt(generatedScore);

    tvScore.innerHTML = `SCORE: ${score}`;
}

function gameOver(){
    stopTimer();
    setTimeout(() => {
        alert(`Você ganhou em ${cPlays} jogadas!`);
        highScores.push({name: "Você", score, time: elapsedSeconds});
        showRanking(true);
    }, ONE_SECOND);
}

function startGame(){
    cleanGame();
    timer();
    askSize();
}

generateFakeRankingData();

startGame();

