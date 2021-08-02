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
    parrots.sort(sorter.random());

    for (i = 0; i < halfCards; i++){
        cards.push(parrots[i]);
        cards.push(parrots[i]);
    }
    cards.sort(sorter.random());
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

function timer(){
    let tvTimer = document.querySelector(".ctn-status .timer");
    tvTimer.innerHTML = StringUtils.secondsToMMSS(elapsedSeconds);

    let intervalTimer = setInterval( () => {
        elapsedSeconds++;
        tvTimer.innerHTML = StringUtils.secondsToMMSS(elapsedSeconds);

    }, ONE_SECOND);

    intervals.push({id: intervalTimer, name: "timer"});
}

function stopTimer(){
    clearInterval(intervals[0].id);
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

function onLoad(){
    generateFakeRankingData();
    startGame();
}



