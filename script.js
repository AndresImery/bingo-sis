const menu = document.getElementById('div-form');

function start() {
    const boardSize = parseInt(document.getElementById('select-size').value);
    const InputNames = document.getElementsByClassName('player-name');
    const players = [];
    for (const InputName of InputNames) {

        // BUSCAR JUGADOR Y SU SCORE EN LOCAL STORAGE

        let player = { name: InputName.value, carton: createMatrixNxN(boardSize), score: 0 }; // editar score
        players.push(player);

    }
    menu.hidden()
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