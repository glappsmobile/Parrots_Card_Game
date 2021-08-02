function generateFakeRankingData(){
    randomNames.sort(sorter.random());

    for (let i = 0; i < 18; i++){
        const randomScore = Math.floor(Math.random() * 9000 + 1001);
        const randomTime = Math.floor(Math.random() * 30 + randomScore/300 + 10);

        highScores.push({});
        highScores[i].name = randomNames[i];
        highScores[i].score = randomScore;
        highScores[i].time = randomTime;
        highScores[i].id = i;
    }

}

function hideRanking(){
    const ctnRanking = document.querySelector(".ctn-ranking");
    ctnRanking.classList.add("invisible");
    setTimeout(() => {
        ctnRanking.classList.add("behind");
    }, DELAY_OVERLAY);
}

function showRanking(isInputNeeded) {
    const ctnRanking = document.querySelector(".ctn-ranking");
    const listLabels = ctnRanking.querySelector(".content-ranking ul.labels");
    const listRanking = ctnRanking.querySelector(".content-ranking ul.scores");
    highScores.sort(sorter.highestToLowest("score"));

    listLabels.innerHTML =  
    `<li class = "txt-ranking">
    <span id="rank"><strong>${highScoreReference.rank}</strong></span>
    <span id="name"><strong>${highScoreReference.name}</strong></span>
    <span id="score"><strong>${highScoreReference.score}</strong></span>
    <span id="time"><strong>${highScoreReference.time}</strong></span>
    </li>`;

    listRanking.innerHTML = "";

    highScores.forEach((highScore, index) => {
        const isLastAdded = highScore.id === undefined;
        const isInputIndex = isLastAdded && isInputNeeded;

        if (isLastAdded) {
            highScores[index].id = index;
        }

        if (!isInputIndex){
            listRanking.innerHTML += 
            `<li id="rank-row-${index}"class="txt-ranking">
            <span id="rank">${index+1}</span>
            <span id="name">${highScore.name}</span>
            <span id="score">${highScore.score}</span>
            <span id="time">${StringUtils.secondsToMMSS(highScore.time)}</span>
            </li>`;

        } else {
            listRanking.innerHTML += 
            `<li id="rank-row-${index}"class="txt-ranking">
            <span id="rank">${index+1}</span>
            <span id="name">
            <input class="input-rank" type="text" maxlength=12/>
            <button>OK</button>
            </span>
            <span id="score">${highScore.score}</span>
            <span id="time">${StringUtils.secondsToMMSS(highScore.time)}</span>
            </li>`;

            setTimeout(() => {
            const input = listRanking.querySelector(`li#rank-row-${index} input`);
            const btn = listRanking.querySelector(`li#rank-row-${index} button`);
            btn.setAttribute("onClick", `setRankName(${index})`);
            input.focus();
            input.addEventListener("keyup", function(event) {
                // WHEN "ENTER" KEY RELEASED, DO: 
                if (event.keyCode === 13) {
                  event.preventDefault();
                  setRankName(index);
                }
            });
          }, 100);
        }
    });

    ctnRanking.classList.remove("behind");
    ctnRanking.classList.remove("invisible");
}

function setRankName(index){
    const input = document.querySelector(`.content-ranking ul.scores li#rank-row-${index} input`);
    let name = input.value;
    if (StringUtils.isBlank(name)) name = "Você";

    highScores[index].name = name;
    showRanking(false);
}