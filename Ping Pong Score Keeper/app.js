const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true
        }
        player.display.textContent = player.score;

    }
}

p1.button.addEventListener('click', function () {
    updateScores(p1, p2)
    // if (!isGameOver) {
    //     p1Score += 1;
    //     if (p1Score === winningScore) {
    //         isGameOver = true;
    //         p1Display.classList.add('has-text-success');
    //         p2Display.classList.add('has-text-danger');
    //         p1Button.disabled = true;
    //         p2Button.disabled = true
    //     }
    //     p1Display.textContent = p1Score;

    // }

})

p2.button.addEventListener('click', function () {
    updateScores(p2, p1)
    // if (!isGameOver) {
    //     p2Score += 1;
    //     if (p2Score === winningScore) {
    //         isGameOver = true;
    //         p2Display.classList.add('has-text-success');
    //         p1Display.classList.add('has-text-danger');
    //         p1Button.disabled = true;
    //         p2Button.disabled = true;
    //     }
    //     p2Display.textContent = p2Score;

    // }

})

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
    // p1.score = 0;
    // p2.score = 0;
    // p1.display.textContent = 0;
    // p2.display.textContent = 0;
    // p1.display.classList.remove('has-text-success', 'has-text-danger');
    // p2.display.classList.remove('has-text-success', 'has-text-danger');
    // p1.button.disabled = false;
    // p2.button.disabled = false;
}