function gerarCartas(length){
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
    let randomIndex = Math.floor(Math.random() * parrots.length);
    console.log(randomIndex);
    img.src = `images/${parrots[randomIndex]}.gif`;
}


askSize();
//gerarCartas(10);

