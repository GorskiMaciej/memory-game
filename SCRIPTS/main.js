class Game {
    constructor() {

        let listOfImages = [];

        this.urlApi = "https://dog.ceo/api";
        this.boardSize = document.querySelector('.start-window__tile-number');
        this.numberOfTiles = 0;
        this.playButton = document.querySelector('.start-window__button');
        this.tileTest = document.querySelector('.tileTest');

        this.playButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.setBoardSize();
            console.log(this.numberOfTiles);
            for (let i = 0; i < this.numberOfTiles; i++) {
                this.getImage()
                    .then(img => {
                        listOfImages.push(img);
                        listOfImages.push(img);
                        console.log(listOfImages)
                    })
            }
            this.getImage()
                .then(image => {
                    this.setImage(image)
                })
        })
    }

    setBoardSize = () => {
        this.numberOfTiles = this.boardSize.value * 2;
    }

    getImage = () => {
        return fetch(`${this.urlApi}/breeds/image/random`)
            .then(response => response.json())
            .then(image => image.message)
    }

    setImage = (image) => {
        this.tileTest.style.backgroundImage = `url("${image}")`;
    }

    createTile = () => {

    }

}




const game = new Game();