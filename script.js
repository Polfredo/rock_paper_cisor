function get_result(answer, computer){
    if (answer == computer){return([0,0]);}
    else if ((answer == "rock" && computer == "cisor")
        ||(answer == "paper" && computer =="rock")
        ||(answer == "cisor" && computer == "paper")){
            return([1,0]);
        }
    else {return([0,1]);}
}

function get_computer_answer(){
    let computer = Math.floor(Math.random() * 3);
    const rep = ["rock","paper","cisor"];
    return rep[computer];
}

const fight_display = document.querySelector("#fight_display");
function update_fight(answer, computer, score){

    const emojis = { rock: "✊", paper: "✋", cisor: "✌️" };
    const pEmoji = emojis[answer];
    const cEmoji = emojis[computer]

    let result_txt = null
    if (score[0] == 1){result_txt = "Victory !";}
    else if (score [1] == 1){result_txt = "Defeat !";}
    else {result_txt = "Even";}
    fight_display.textContent = `${pEmoji} vs ${cEmoji} \u2192 ${result_txt}`;
}

const player_score = document.querySelector("#Player #score");
const computer_score = document.querySelector("#Computer #score");
function reset_score(){
    player_score.textContent = 0;
    computer_score.textContent = 0;
}

const overlay = document.querySelector("#game-over-overlay");
const finalStatus = document.querySelector("#final-status");
const finalScoreDisp = document.querySelector("#final-score-display");
const restartBtn = document.querySelector("#restart-btn");
function showGameOver(winner) {
    overlay.style.display = "flex";
    finalStatus.textContent = winner === "player" ? "VICTORY!" : "GAME OVER";
    finalStatus.style.color = winner === "player" ? "var(--primary-color)" : "var(--accent-color)";
    
    finalScoreDisp.textContent = `FINAL SCORE\nYOU: ${player_score.textContent} - CPU: ${computer_score.textContent}`;
}

function update_score(score){
    
    if (score[0] == 1){
        let new_score = parseInt(player_score.textContent) + 1;
        player_score.textContent = new_score;
        if (new_score == 5){
            showGameOver("player");
            reset_score();
        }
    }
    else if(score[1] == 1){
        let new_score = parseInt(computer_score.textContent) + 1;
        computer_score.textContent = new_score;
        if (new_score == 5){
            showGameOver("computer");
            reset_score();
        }
    }
}

// Logic for the Restart Button
restartBtn.addEventListener("click", () => {
    reset_score();
    fight_display.textContent = "..."; // Reset the fight text
    overlay.style.display = "none";    // Hide the pop-up
});

const playerArea = document.querySelector("#player_action");
playerArea.addEventListener("click", (e) => {
    if (e.target.tagName == 'BUTTON'){
        const answer = e.target.id;

        computer = get_computer_answer();
        score = get_result(answer, computer);
        update_fight(answer, computer, score);
        update_score(score);
    }
});
