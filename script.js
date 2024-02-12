const form = document.getElementById('body').innerHTML;
let shuffledNumbers = resetBall();
let pastnumbers = []
let counter = 25
let players = []

function resetBall(numeros) {
    numeros = new Set();
    while (numeros.size < 50) {
        numeros.add(Math.floor(Math.random() * 50) + 1);
    }
    const shuffledNumberss = Array.from(numeros).sort(() => 0.5 - Math.random());
    return shuffledNumberss;
}


function start() {
    const boardSize = parseInt(document.getElementById('select-size').value);
    const InputNames = document.getElementsByClassName('player-name');
    // const players = [];
    for (const InputName of InputNames) {

        // BUSCAR JUGADOR Y SU SCORE EN LOCAL STORAGE

        let player = { name: InputName.value, carton: createMatrixNxN(boardSize), score: 0 , cartonHTML: ""}; // editar score
        players.push(player);


    }
    document.getElementById('div-form').remove();
    let body = document.getElementById('body');
    // body.innerHTML = form;
    const newDiv = document.createElement('div');
    // newDiv.classList.add('bingo-carton');
    body.innerHTML = `
    <div id="div-game">
    <div id="div-game__upper">
        <div id="cardboard-div">

            <h1 id="bingo-name">BINGO</h1>
            <div class="row">
                <div class="cell">A</div>
                <div class="cell">B</div>
                <div class="cell">C</div>
            </div>
            <div class="row">
                <div class="cell">D</div>
                <div class="cell">E</div>
                <div class="cell">F</div>
            </div>
            <div class="row">
                <div class="cell">G</div>
                <div class="cell">H</div>
                <div class="cell">I</div>
            </div>
        </div>
        <div id="number-div">
            <div id="ball-div">
                <p id="number-p">N</p>
            </div>
        </div>
    </div>
    <div id="buttons-div">

        <div id="counter">
            <h3>Counter</h3>
            <p id="counter-num">25</p>
        </div>
        <div id="right-div">
            <button class="input-button" onclick="quit();">QUIT</button>
            <button class="input-button" onclick="proxima();">PROXIMA BOLA</button>
        </div>
    </div>
</div>
    `
    cardboard = document.getElementById('cardboard-div');
    // cardboard.innerHTML = '<h1 id="bingo-name">BINGO</h1>';

    let cartonesHTML = [];
    const buttons = document.getElementById('right-div')
    for (const player of players) {
        buttons.innerHTML += `<button class="input-button players" onclick="playerChange('${player.name}');" id="${player.name}">${player.name}</button>`;
        let cartonHTML = ""
        for (const i in player.carton) {
            cartonHTML += '<div class="row">'
            console.log(cartonHTML);
            for (const num of player.carton[i]) {
                cartonHTML += `<div class="cell" id='${num}'=>${num}</div>`
            }
            cartonHTML += '</div>';
        }
        cartonesHTML.push(cartonHTML);
        player.cartonHTML = cartonHTML

    }
    cardboard.innerHTML = '<h1 id="bingo-name">BINGO</h1>' + players[0].cartonHTML;
    document.getElementById(players[0].name).style.backgroundColor = "purple"

}

function createMatrixNxN(n) {
    const numbers = new Set();
    while (numbers.size < n * n) {
        numbers.add(Math.floor(Math.random() * 50) + 1);
    }
    const shuffledNumbers = Array.from(numbers).sort(() => 0.5 - Math.random());

    const matrix = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(shuffledNumbers.shift());
        }
        matrix.push(row);
    }

    return matrix;
}

function quit() {
    for (const button of document.getElementsByClassName('players')) {
        button.remove();
    }
    players = [];
    document.getElementById('div-game').remove();
    body.innerHTML = form;
    shuffledNumbers = resetBall();
    counter = 25;
    pastnumbers = [];
}

function proxima() {
    if (counter > 0) {
        counter--;
        document.getElementById('counter-num').innerText = counter;
        let number = shuffledNumbers.shift();
        document.getElementById('number-p').innerText = number
        pastnumbers.push(number);
        let cell = document.getElementById(number);
        if (cell != null) {
            cell.style.backgroundColor = 'purple'//'#308028';
        }
    } else {
        alert('SE ACABO')
        quit()
    }
    
}

function playerChange(name) {
    buttons = document.getElementsByClassName('players');
    for (const button of buttons) {
        button.style.backgroundColor = "#f93416";
    }

    button2 = document.getElementById(name);
    button2.style.backgroundColor = 'purple';

    cardboard = document.getElementById('cardboard-div')

    for (const player of players) {
        if (player.name == name) {
            cardboard.innerHTML = '<h1 id="bingo-name">BINGO</h1>' + player.cartonHTML;
        }
    }

    let cells = document.getElementsByClassName('cell');
    for (const cell of cells) {
        for (const num of pastnumbers) {
            if (cell.id == num) {
                cell.style.backgroundColor = 'purple';
            }
        }
    }
}