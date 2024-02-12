const form = document.getElementById('body').innerHTML;
let shuffledNumbers = resetBall();
let counter = 25

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
    const players = [];
    for (const InputName of InputNames) {

        // BUSCAR JUGADOR Y SU SCORE EN LOCAL STORAGE

        let player = { name: InputName.value, carton: createMatrixNxN(boardSize), score: 0 }; // editar score
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
    for (const player of players) {
        
        let cartonHTML = ""
        for (const i in player.carton) {
            cartonHTML += '<div class="row">'
            console.log(cartonHTML);
            for (const num of player.carton[i]) {
                cartonHTML += '<div class="cell">' + num + '</div>'
            }
            cartonHTML += '</div>';
        }
        cartonesHTML.push(cartonHTML);
    }
    cardboard.innerHTML = '<h1 id="bingo-name">BINGO</h1>' + cartonesHTML[0];

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
    document.getElementById('div-game').remove();
    body.innerHTML = form;
    shuffledNumbers = resetBall();
}

function proxima() {
    if (counter > 0) {
        counter--;
        document.getElementById('counter-num').innerText = counter;
        document.getElementById('number-p').innerText = shuffledNumbers.shift()
    } else {
        alert('BLAHBLAH')
        quit()
    }
    
}