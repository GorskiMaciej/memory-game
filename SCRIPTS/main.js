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
            // this.createBoard(listOfImages);
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

    getImages = (numberOfPairs) => {
        let gettingImages = new Promise(() => {
            for (let i = 0; i < numberOfPairs; i++) {
                let indexOfPair = 0;
                fetch(`${this.urlApi}/breeds/image/random`)
                    .then(response => response.json())
                    .then(res => res.message)
                    .then(img => {
                        const pair = new Pair(img, indexOfPair)
                        listOfImages.push(pair);
                        listOfImages.push(pair);
                        indexOfPair++;
                    })
            }
        })
        return gettingImages;

    }

    fillArrayWithDogsPhotos = (numberOfPairs) => {
        const arrayWithPairs = [];
    }

    mixArray = (oldArrayParameter) => {
        const initialArrayLength = oldArrayParameter.length;
        const oldArray = oldArrayParameter;
        const newArray = [];
        for (let i = 0; i < initialArrayLength; i++) {
            let randomIndex = Math.floor(Math.random() * oldArray.length);
            newArray.push(oldArray[randomIndex])
            oldArray.splice(randomIndex, 1);
        }
        return newArray;
    }

    setImage = (image) => {
        this.tileTest.style.backgroundImage = `url("${image}")`;
    }

    createTile = (imageUrl, indexOfPair) => {
        const tile = document.createElement('div');
        tile.setAttribute()
    }

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
                .then(array => this.mixArray(array))
                .then(promise => console.log(promise));
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