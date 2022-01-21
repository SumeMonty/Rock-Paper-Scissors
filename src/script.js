if (window.matchMedia("(max-width:1000px)").matches) {
    alert('Please Switch to landscape mode for better experience!!')
}
let score = 0;
let timesPlayed = 0;
window.onload = function () {
    createBody();
}
function createBody() {
    document.querySelector('#button-div').style.display = 'none';
    document.getElementById('flex-box-rps-div').innerHTML =
        `
    <img
        id="rock"
        src="src/img/rock.jpg"
        height="150"
        width="150"
        onclick="rpsGame(this)"
        alt="" />
<img
        id="paper"
        src="src/img/paper.png"
        height="150"
        width="150"
        onclick="rpsGame(this)"
        alt="" />
        <img
        id="scissors"
        src="src/img/scissors.png"
        height="150"
        width="150"
        onclick="rpsGame(this)"
        alt="" />
        `
}
function rpsGame(yourChoice) {
    var humanChoice, botChoice;

    timesPlayed++;
    humanChoice = yourChoice.id;
    // console.log("Your Choice:", humanChoice);

    botChoice = numberToChoice(randToRpsInt());
    // console.log("Computer Choice:", botChoice);

    results = decideWinner(humanChoice, botChoice); // [0,1] | human lost, bot won
    // console.log("Results:", results)

    message = finalMessage(results); // You Won!
    // console.log(message)
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 }
    }

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': "You Lost!", 'color': 'red', 'score': 0 }
    } else if (yourScore === 0.5) {
        return { 'message': "Draw!", 'color': 'blue', 'score': 0 };
    } else {
        score++;
        return { 'message': "You Won!", 'color': 'green', 'score': 1 }
    }
}
// const rock = document.getElementById('rock');
// const paper = document.getElementById('paper');
// const scissors = document.getElementById('scissors');
// const flexBoxRpsDiv = document.getElementById('flex-box-rps-div');

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    // const scoreEl = document.getElementById('score-h2');
    //empty the div containing images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    humanDiv.innerHTML = `<img src=${imagesDatabase[humanImageChoice]} height=150 width=150>`;
    messageDiv.innerHTML = `<h1 style="color: ${finalMessage.color}"> ${finalMessage.message}</h1>`;
    botDiv.innerHTML = `<img src=${imagesDatabase[botImageChoice]} height=150 width=150>`;
    // score += finalMessage.score;

    document.querySelector("#score-h2 span:nth-of-type(2)").innerHTML = score;
    document.querySelector("#times-h2 span:nth-of-type(2)").innerHTML = timesPlayed;

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

    document.querySelector('#button-div').style.display = 'block';
    document.querySelector('#play-again-btn').addEventListener('click', createBody);
}
/* light-dark mode toggle */
const toggleSwitch = document.getElementById('toggle-switch');

toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});