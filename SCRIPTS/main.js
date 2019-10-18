class Game {
    constructor() {
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfTiles = 0;
        this.playButton = document.querySelector('.start-window__button');
    }

    setBoardSize = () => {

    }

    test = () => {
        console.log('from test')
    }
}

const game = new Game();