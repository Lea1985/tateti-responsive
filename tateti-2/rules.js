// Variables

const jugadores = ['😼', '🐶'];

const reset = document.querySelector('#reset');

let fichas = document.querySelectorAll('.grid-item');

let clicks = 0;

const partida = {
    fichas: [],
    clicks: 0
}


//  Listeners

document.addEventListener('DOMContentLoaded', cargarLiseners)

function cargarLiseners() {

    fichas.forEach((ficha) => {
        ficha.addEventListener('click', fichar);
    });

    reset.addEventListener('click', resetear);

    actualizarStorage();

}


// Funciones

function actualizarStorage() {

    const partidaStorage = localStorage.getItem('Partida');

    const partidaParse = JSON.parse(partidaStorage);

    partidaParse.fichas.forEach((contenido, i) => {

        fichas[i].firstElementChild.textContent = contenido;

    });

    fichas.forEach((ficha) => {

        if (!ficha.firstElementChild.textContent == "") {

            ficha.firstElementChild.classList.add('ocupado')
        }

    });

    clicks = partidaParse.clicks;

}


function resetear() {

    fichas.forEach((ficha) => {
        ficha.firstElementChild.textContent = "";
        ficha.firstElementChild.classList.remove('ocupado');
    })

    clicks = 0;

    localStorage.removeItem('Partida');

}


function fichar(e) {

    if (!e.target.firstElementChild.classList.contains('ocupado') && clicks > -1) {

        clicks += 1;

        e.target.firstElementChild.classList.add('ocupado');

        if ((clicks % 2) === 0) {

            e.target.firstElementChild.textContent = jugadores[0];

        } else {

            e.target.firstElementChild.textContent = jugadores[1];

        }

        partida.clicks = clicks;

        validar();

    }
}


function validar() {

    let array = [...fichas];

    let aux = [];

    array.forEach((ficha, i) => {
        aux[i] = ficha.firstElementChild.textContent;
    })

    partida.fichas = aux;

    localStorage.setItem('Partida', JSON.stringify(partida));

    comparador(array.slice(0, 3));
    comparador(array.slice(3, 6));
    comparador(array.slice(6));
    array = [fichas[0], fichas[3], fichas[6]];
    comparador(array);
    array = [fichas[1], fichas[4], fichas[7]];
    comparador(array);
    array = [fichas[2], fichas[5], fichas[8]];
    comparador(array);
    array = [fichas[0], fichas[4], fichas[8]];
    comparador(array);
    array = [fichas[2], fichas[4], fichas[6]];
    comparador(array);

}


function comparador(triada) {
    if (clicks > 1) {

        if (triada[0].firstElementChild.classList.contains('ocupado') && triada[1].firstElementChild.classList.contains('ocupado') && triada[2].firstElementChild.classList.contains('ocupado')) {

            if (triada[0].firstElementChild.textContent === triada[1].firstElementChild.textContent && triada[1].firstElementChild.textContent === triada[2].firstElementChild.textContent) {
                clicks = -10;
                animacion(triada);

            }
        }
    }
}


function animacion(triada) {

    triada.forEach((elemento) => {
        elemento.style.backgroundColor = "#82ff59";
        setTimeout(() => {
            elemento.style.backgroundColor = "#ebfbed";
            resetear();
        }, 2000)
    });

}