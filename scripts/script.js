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

    gerarCartas(length);
}


function defineCards(length){
    let halfCards = length/2;
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
    let ctnCards = document.querySelector(".ctn-cards");
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
        let index = getChildIndex(card);
        let cardValue = cards[index];
        card.classList.add("active");

        let isComparing = lastCard !== undefined;

        if (isComparing){
            let isRightAnswer = cardValue === match;

            if (isRightAnswer) {
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
    setTimeout(() => {  
        alert(`Você ganhou em ${cPlays} jogadas!`);
    }, delay);
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

//askSize();
gerarCartas(14);

