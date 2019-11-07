class Game {
    constructor() {
        this.urlApi = "https://dog.ceo/api";
        this.selectedTileIndex = -1;
        this.selectedTiles = [];
        this.boardSize = document.querySelector('.start-window__level-select');
        this.numberOfPairs = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.resetButton = document.querySelector('.game-board__reset-button')
        this.startSection = document.querySelector('.start-window')
        this.board = document.querySelector('.game-board')
        this.tileContainer = document.querySelector('.tiles-container');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.startSectionOff();
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

        this.resetButton.addEventListener('click', () => {
            this.startSectionOn();
            this.cleartileContainer();
        })
    }

    cleartileContainer = () => {
        this.tileContainer.textContent = "";
    }

    startSectionOff = () => {
        this.startSection.style.display = "none";
        this.board.style.display = "block";
    }
    startSectionOn = () => {
        this.startSection.style.display = "flex";
        this.board.style.display = "none";
    }

    setBoardSize = () => {
        let indexOfSelectedLevel = this.boardSize.selectedIndex;
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

    checkIfMatched = (tile) => {
        if (this.selectedTileIndex === -1) {
            //first tile
            console.log('first tile choosen')
            this.selectedTileIndex = tile.getAttribute('data-index') * 1;
            this.selectedTiles.push(tile);
            console.log(tile.getAttribute('data-index') * 1);
        } else if ((this.selectedTileIndex === tile.getAttribute('data-index') * 1) && tile.dataset.rotated == "false") {
            //matched
            console.log('second tile choosen');
            console.log('win');
            this.selectedTiles.push(tile);
            this.selectedTileIndex = -1;
        } else {
            //unmatched
            console.log('second tile choosen');
            console.log('loose');
            this.selectedTiles.push(tile);
            this.selectedTileIndex = -1;
        }

        if (this.selectedTiles.length < 2) {

        } else {

        }
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
        tile.setAttribute('data-index', indexsOfPair);
        tile.setAttribute('data-image', imageUrl);
        tile.setAttribute('data-rotated', false);
        tile.addEventListener('click', (e) => {
            this.rotateTile(e.target);
            this.checkIfMatched(e.target, this.choosenTileIndex);
        });
        this.tileContainer.appendChild(tile);
    }

    rotateTile = (tile) => {
        tile.classList.toggle('tiles-container__tile--active');
        setTimeout(() => {
            if (tile.dataset.rotated == "false") {
                tile.style.backgroundImage = `url('${tile.dataset.image}')`;
                tile.setAttribute('data-rotated', true);
            } else {
                tile.style.backgroundImage = `url('../IMG/BrainLogo.png')`;
                tile.setAttribute('data-rotated', false);
            }
            tile.style.transform = "scaleX(-1)";
        }, 600, tile);
    }

    setImage = (image) => {
        this.tileTest.style.backgroundImage = `url('${image}')`;
    }

    setTileWidth = (numberOftiles) => {
        let numberOfColoumns = Math.sqrt(numberOftiles);
        numberOfColoumns = Math.floor(numberOfColoumns);
        return `calc((100% / ${numberOfColoumns}))`;
    }

    changeIndex = () => {
        this.choosenTileIndex++;
    }


}
class Pair {
    constructor(url, index) {
        this.url = url
        this.index = index;
    }
}

const game = new Game();