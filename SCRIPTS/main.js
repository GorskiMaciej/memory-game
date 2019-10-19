class Game {
    constructor() {
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfTiles = 0;
        this.playButton = document.querySelector('.start-window__button');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
        })
    }

    setBoardSize = () => {
        this.numberOfTiles = this.boardSize.value * 2;
        console.log(this.numberOfTiles);
    }

}

const game = new Game();