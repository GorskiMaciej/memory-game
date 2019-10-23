class Game {
    constructor() {

        let listOfImages = [];

        this.urlApi = "https://dog.ceo/api";
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfPairs = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.tileTest = document.querySelector('.tileTest');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
            console.log("Number of tiles: " + this.numberOfTiles);
            this.createBoard(listOfImages);
            this.getImage()
                .then(image => {
                    this.setImage(image)
                })
        })
    }

    setBoardSize = () => {
        this.numberOfTiles = this.boardSize.value * 2;
        this.numberOfPairs = this.boardSize.value;
    }

    getImage = () => {
        return fetch(`${this.urlApi}/breeds/image/random`)
            .then(response => response.json())
            .then(image => image.message)
    }

    setImage = (image) => {
        this.tileTest.style.backgroundImage = `url("${image}")`;
    }

    createTile = (imageUrl, indexOfPair) => {
        const tile = document.createElement('div');
        tile.setAttribute()
    }

    shuffleArray = () => {}

    createBoard = (listOfImages) => {
        let indexOfPair = 0;
        for (let i = 0; i < this.numberOfPairs; i++) {
            this.getImage()
                .then(img => {
                    const pair = new Pair(img, indexOfPair)
                    listOfImages.push(pair);
                    listOfImages.push(pair);
                    indexOfPair++;
                    return listOfImages;
                })
                .then(promise => console.log(promise))
        }
    }

}
class Pair {
    constructor(url, index) {
        this.url = url
        this.index = index;
    }
}




const game = new Game();