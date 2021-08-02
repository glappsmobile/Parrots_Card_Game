const MULTIPLIER_ODDS = "Odds Multiplier";
const MULTIPLIER_TIME = "Time Multiplier";
const MULTIPLIER_PLAYS = "Plays Multiplier";

const ODDS_WEIGHT = 3;
const SCORE_MAX_TIME = 60;
const SCORE_SEEN_DIFFICULTY = 15;

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