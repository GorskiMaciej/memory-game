class Game {
    constructor() {
        this.urlApi = "https://dog.ceo/api";
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfPairs = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.tileTest = document.querySelector('.tileTest');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
            this.setGame(this.numberOfPairs)
                // .then(res1 => console.log(res1)) // tablic ze zdjęciami jest wyświatlana
                .then(array => this.mixArray(array))
                .then(res2 => console.log(res2))
        })
    }

    setBoardSize = () => {
        this.numberOfTiles = this.boardSize.value * 2;
        this.numberOfPairs = this.boardSize.value;
    }

    addImageToArray = (img, indexOfPair, array) => {
        const pair = new Pair(img, indexOfPair)
        array.push(pair);
        array.push(pair);
    }

    setGame = (numberOfPairs) => {
        const listOfImages = [];
        let indexOfPair = 0;
        for (let i = 0; i < numberOfPairs; i++) {
            this.getImage()
                .then(res => {
                    this.addImageToArray(res, indexOfPair, listOfImages)
                    indexOfPair++;
                })
        }
        return Promise.resolve(listOfImages)
    }

    getImage = () => {
        return fetch(`${this.urlApi}/breeds/image/random`)
            .then(response => response.json())
            .then(res => res.message)
    }

    mixArray = (oldArrayParameter) => {
        const initialArrayLength = oldArrayParameter.length; // wartość =0, a powinna być długość tablicy
        const oldArray = oldArrayParameter;
        const newArray = [];
        for (let i = 0; i < initialArrayLength; i++) {
            let randomIndex = Math.floor(Math.random() * oldArray.length);
            newArray.push(oldArray[randomIndex])
            oldArray.splice(randomIndex, 1);
        }
        console.log(oldArrayParameter) // wyświatla się poprawnia cała stara tablica
        return oldArrayParameter;
    }

    // setImage = (image) => {
    //     this.tileTest.style.backgroundImage = `url("${image}")`;
    // }

    // createTile = (imageUrl, indexOfPair) => {
    //     const tile = document.createElement('div');
    //     tile.setAttribute()
    // }
}
class Pair {
    constructor(url, index) {
        this.url = url
        this.index = index;
    }
}


const game = new Game();