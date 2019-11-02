class Game {
    constructor() {
        this.urlApi = "https://dog.ceo/api";
        this.boardSize = document.querySelector('.start-window__level-select');
        this.numberOfPairs = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.tileContainer = document.querySelector('.tiles-container');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
            this.setGame(this.numberOfPairs)
                .then(array => this.mixArray(array))
                .then(mixedArray => {
                    this.tileContainer.textContent = "";
                    mixedArray.forEach(element => {
                        this.createTile(element.url, element.index, mixedArray.length);
                    })
                })
        })
    }

    setBoardSize = () => {
        let indexOfSelectedLevel = this.boardSize.selectedIndex;
        console.log(this.boardSize.options[indexOfSelectedLevel].text)
        if (indexOfSelectedLevel === 0) {
            this.numberOfPairs = 2;
        } else if (indexOfSelectedLevel === 1) {
            this.numberOfPairs = 8;
        } else if (indexOfSelectedLevel === 2) {
            this.numberOfPairs = 18;
        } else {
            this.numberOfPairs = 32;
        }
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

    createTile = (imageUrl, indexsOfPair, numberOfTils) => {
        const tile = document.createElement('div');
        let tileSize = this.setTileWidth(numberOfTils);
        tile.classList.add('tiles-container__tile');
        tile.style.width = `${tileSize}`;
        // tile.style.height = `${tileSize}`;
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

    setTileWidth = (numberOftiles) => {
        let numberOfColoumns = Math.sqrt(numberOftiles);
        // if ((numberOfColoumns - Math.floor(numberOfColoumns)) < 0.5) {
        //     numberOfColoumns = Math.floor(numberOfColoumns);
        // } else {
        //     numberOfColoumns = Math.floor(numberOfColoumns) + 1;
        // }
        numberOfColoumns = Math.floor(numberOfColoumns);
        return `calc((100% / ${numberOfColoumns}))`;
        // return `calc((100% / ${numberOfColoumns}) - 10px)`;
        // return "100%";
    }

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