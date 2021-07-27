let inSelection = false;

let cards = [];
let match = "";
let lastCard;
let block = false;
let score = 0;
let playCount = 0;
let maxScore = 0;

function gerarCartas(length){
    maxScore = length;

    defineCards(length);
    let container = document.querySelector(".ctn-cards");

    for(i = 0; i < length; i++){
     container.innerHTML += 
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

function askSize(){
    let length = Number(prompt("Com quantas cartas deseja jogar? (Par entre 4 e 14)"));
    let isPair = Boolean(length % 2 === 0);
    let isCorrectLength = Boolean(length >= 4 && length <= 14);

    if(isPair && isCorrectLength) {
        maxScore = length;
        console.log(maxScore);
        gerarCartas(length);
    } else {
        askSize();
    }
}

function reveal(card){
    console.log("-----");
    console.log("block: "+block);
    playCount++;
    if (!block){
        let index = getChildIndex(card);
        let cardValue = cards[index];
        card.classList.add("active");
        console.log("last card: ");
        console.log(lastCard);

        if (lastCard !== undefined){
            if (cardValue == match) {
                console.log("MATCH");
                match = "";
                lastCard = undefined;
                score += 2;
                if (score == maxScore) gameOver();

            } else {
                console.log("ERRADO");
                unreveal(card, lastCard);
                blockAction();
            }
            lastCard = undefined;
        }else{
            lastCard = card;
            match = cardValue;
            card.setAttribute( "onClick", "");
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
    setTimeout(() => {  
        alert(`Você ganhou em ${playCount} jogadas!`);
    }, delay/2);
}

function unreveal(card1, card2) {
    setTimeout(() => {  
    card1.classList.remove("active");
    card2.classList.remove("active");
    card1.setAttribute( "onClick", "reveal(this)");
    card2.setAttribute( "onClick", "reveal(this)");
    block = false;
}, delay);

}
/*
function unreveal(card) {
    card.classList.remove("active");
}
*/

function getChildIndex(child){ 
    let index = -1;
    while( (child = child.previousSibling) != null ) index++;

    return index;
}

function doubleArray(array){
    let length = array.length;

    for (i = 0; i < length; i++){
        array[length + i] = array[i];
    }

    return array;
}

function comparador(){
    return Math.random() - 0.5;
}

function getMaxScore(){

}

function defineCards(length){
    let half = length/2 - 1;

    for (i = 0; i <= half; i++){

        let parrotIndex = Math.floor(Math.random() * parrots.length);
        let card = parrots[parrotIndex];

        if (!cards.includes(card)) {
            cards[i] = card;
        } else {
            i --;
        }
    }

    cards = doubleArray(cards);
    cards.sort(comparador);
}


askSize();
//gerarCartas(6);

