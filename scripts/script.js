let cards = [];
let match = "";
let lastCard = undefined;
let block = false;
let cFlippeds = 0;
let cPlays = 0;
let cCards = 0;

function askSize(){
    let isPair = false;
    let isCorrectLength = false;
    let length;
    
    while(!isPair || !isCorrectLength) {
        length = Number(prompt("Com quantas cartas deseja jogar? \n (Par entre 4 e 14)"));
        isPair = Boolean(length % 2 === 0);
        isCorrectLength = Boolean(length >= 4 && length <= 14);
    } 

    cCards = length;
    gerarCartas(length);
}

function defineCards(length){
    let half = length/2;

    for (i = 0; i < half; i++){

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


function gerarCartas(length){
    cCards = length;

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



function reveal(card){
    if (!block){
        cPlays++;

        let index = getChildIndex(card);
        let cardValue = cards[index];

        card.classList.add("active");
   
        if (lastCard !== undefined){

            if (cardValue == match) {
                card.setAttribute( "onClick", "");
                match = "";
                cFlippeds += 2;
                if (cFlippeds == cCards) gameOver();
            } else {
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
        alert(`Você ganhou em ${cPlays} jogadas!`);
    }, delay);
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




askSize();
//gerarCartas(6);

