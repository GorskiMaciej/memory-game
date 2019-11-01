class Game {
    constructor() {
        this.urlApi = "https://dog.ceo/api";
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfPairs = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.tileContainer = document.querySelector('.tiles-container');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
            this.setGame(this.numberOfPairs)
                .then(array => this.mixArray(array, this.numberOfPairs * 2))
                .then(mixedArray => {
                    this.tileContainer.textContent = "";
                    mixedArray.forEach(element => {
                        this.createTile(element.url, element.index, mixedArray.length);
                    })
                })
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

    setGame = async (numberOfPairs) => {
        const listOfImages = [];
        let indexOfPair = 0;
        for (let i = 0; i < numberOfPairs; i++) {
            await this.getImage()
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
        const initialArrayLength = oldArrayParameter.length;
        let oldArray = oldArrayParameter
        const newArray = [];
        for (let i = 0; i < initialArrayLength; i++) {
            let randomIndex = Math.floor(Math.random() * oldArray.length);
            newArray.push(oldArray[randomIndex]);
            oldArray.splice(randomIndex, 1);
        }
        return newArray;
    }

    createTile = (imageUrl, indexsOfPair, arrayLenght) => {
        const tile = document.createElement('div');
        let tileSize = 0;
        tile.classList.add('tiles-container__tile')
        tile.setAttribute('data-index', indexsOfPair);
        tile.setAttribute('data-image', imageUrl);
        tile.setAttribute('data-rotated', false);
        tile.addEventListener('click', (e) => {
            this.rotateTile(e.target)
        });
        this.tileContainer.appendChild(tile);
    }

    rotateTile = (tile) => {
        tile.classList.add('active');
        setTimeout(() => {
            if (tile.dataset.rotated == "false") {
                tile.style.backgroundImage = `url('${tile.dataset.image}')`;
                tile.setAttribute('data-rotated', true);
            } else {
                tile.style.backgroundImage = `url('../IMG/BrainLogo.png')`;
                tile.setAttribute('data-rotated', false);
            }
        }, 600, tile);
    }

    setImage = (image) => {
        this.tileTest.style.backgroundImage = `url('${image}')`;
    }

    // setTileWidth = (numberOftiles) => {
    //     let numberOfColoumns = Math.sqrt(numberOftiles);
    //     if ((numberOfColoumns - Math.floor(numberOfColoumns)) < 0.5) {
    //         numberOfColoumns = Math.floor(numberOfColoumns);
    //     } else {
    //         numberOfColoumns = Math.floor(numberOfColoumns) + 1;
    //     }
    //     return `calc((100% / ${numberOfColoumns}) - 5px)`;
    // }

}
class Pair {
    constructor(url, index) {
        this.url = url
        this.index = index;
    }
}


const game = new Game();

// const array = game.mixArray([1, 2, 3, 4, 5, 6])
// console.log(array)