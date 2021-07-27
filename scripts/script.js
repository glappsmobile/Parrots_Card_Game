function gerarCartas(length){
    defineCards(length);
    let container = document.querySelector(".ctn-cards");

    for(i = 0; i < length; i++){
     container.innerHTML += 
     `<li class="card" onclick="reveal(this)">
        <img src="images/front.png"/>
     </li>`;
    }
}

function askSize(){
    let length = Number(prompt("Com quantas cartas deseja jogar? (Par entre 4 e 14)"));
    let isNumber = typeof(length) == "number";

    if (isNumber){
        let isPair = length % 2 == 0;
        let isCorrectLength = length <= 14 && length >= 4;

        if(isPair && isCorrectLength) {
            gerarCartas(length);
        } else {
            askSize();
        }
    }
}

function reveal(card){
    let img = card.querySelector("img");
    let index = getChildIndex(card)-1;
    img.src = `images/${cards[index]}.gif`;
}

function getChildIndex(child){
    let index = 0;
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

let cards = [];

askSize();
//gerarCartas(10);

