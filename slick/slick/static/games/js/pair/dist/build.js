class Game {
    constructor() {
        this._divTimer = document.getElementById('divTimer');
        this._divPoint = document.getElementById('divPoint');
        this._points = document.getElementById('point');
        this._field = document.getElementById('cards');
        this._restartButton = document.getElementById('restart');
        this._endGameButton = document.getElementById('endGame');
        this._startGameButton = document.getElementById('startGame');
        this._restartButton.addEventListener('click', this._onClickRestart.bind(this));
        this._endGameButton.addEventListener('click', this._onClickEndGame.bind(this));
        this._startGameButton.addEventListener('click', this._onClickStartGame.bind(this));
        this._typeOfCard = this._createTypeOfCard();
    }
    _onClickRestart() {
        this._currentLevel.endLevelGame(false);
        delete this._currentLevel;
        this._clearField();
        this._onClickStartGame();
    }
    _onClickEndGame(str = 'finish') {
        switch (str) {
            case 'time':
                alert(`Вы проиграли! \nВремя закончилось. \nВы набрали ${this._getPoint()} очков`);
                break;
            case 'congratulation':
                alert(`Поздравляем! \nВы прошли игру. \nИтоговое количество очков: ${this._getPoint()}`);
                break;
            default:
                alert(`Вы завершили игру! \nИтоговое количество очков: ${this._getPoint()}`);
                break;
        }
        this._clearField();
        this._field.hidden = true;
        this._divTimer.hidden = true;
        this._divPoint.hidden = true;
        this._restartButton.hidden = true;
        this._endGameButton.hidden = true;
        this._startGameButton.hidden = false;
        this._points.textContent = '0';
        this._currentLevel.endLevelGame(false);
        delete this._currentLevel;
    }
    _onClickStartGame() {
        this._field.hidden = false;
        this._divTimer.hidden = false;
        this._divPoint.hidden = false;
        this._restartButton.hidden = false;
        this._endGameButton.hidden = false;
        this._startGameButton.hidden = true;
        this._points.textContent = '0';
        this._pointsCount = 0;
        this._numberLevel = 1;
        this._createLevel(this._numberLevel);
    }
    _clearField() {
        this._field.innerHTML = '';
    }
    _createTypeOfCard() {
        const Book =      { name: 'book',      src: 'book.png' };
        const Bug =       { name: 'bug',       src: 'bug.png' };
        const Gear =      { name: 'gear',      src: 'gear.png' };
        const Head =      { name: 'head',      src: 'head.png' };
        const Laptop =    { name: 'laptop',    src: 'laptop.png' };
        const Algorithm = { name: 'algorithm', src: 'algorithm.png' };
        const Loupe =     { name: 'loupe',     src: 'loupe.png' };
        const Men =       { name: 'men',       src: 'men.png' };
        const Phone =     { name: 'phone',     src: 'phone.png' };
        const Tablet =    { name: 'tablet',    src: 'tablet.png' };
        return [Book, Bug, Gear, Head, Laptop, Algorithm, Loupe, Men, Phone, Tablet];
    }
    _setPoint(point) {
        this._pointsCount += point;
        this._points.textContent = this._pointsCount.toString();
    }
    _getPoint() {
        return this._pointsCount;
    }
    _createLevel(numberLevel) {
        this._currentLevel = new level(numberLevel + 1, this._typeOfCard, numberLevel * 20, this);
    }
    _nextLevel() {
        this._numberLevel++;
        if (this._numberLevel == 10) {
            this._onClickEndGame('congratulation');
            return;
        }
        this._clearField();
        delete this._currentLevel;
        this._createLevel(this._numberLevel);
    }
}
;
const game = new Game();
class level {
    constructor(countPairs, typeOfCard, seconds, game) {
        this._isStarted = false;
        this._countFindedPairs = 0;
        this._game = game;
        this._seconds = seconds;
        this._timer = document.getElementById('timer');
        this._timer.textContent = this._exchangeOfSeconds(this._seconds);
        this._field = document.getElementById('cards');
        this._field.style.width = `${140 * countPairs}px`;
        this._cards = this._createArrayCards(countPairs, this._shuffle(typeOfCard, 3));
        this._createElementCards();
    }
    _createElementCards() {
        for (let i = 0; i < this._cards.length; i++) {
            const divScene = this._createDivBlock('scene col p-0 m-1');
            const divCard = this._createDivBlock('card');
            divCard.style.border = '0px';
            divCard.id = `${i}`;
            divCard.addEventListener('click', this._onClickCard.bind(this));
            const divFront = this._createDivBlock('rounded card__face card__face--front border border-dark', `<img src="/static/games/image/pair/back.png" style="height: auto; width: 100%;">`);
            const divBack = this._createDivBlock('rounded card__face card__face--back border border-dark', `<img src="/static/games/image/pair/${this._cards[i].src}" style="height: auto; width: 100%;">`);
            this._field.append(divScene);
            divScene.append(divCard);
            divCard.append(divFront);
            divCard.append(divBack);
        }
    }
    _createDivBlock(className, html) {
        const divBlock = document.createElement('div');
        divBlock.className = className;
        divBlock.innerHTML = html ? html : '';
        return divBlock;
    }
    _createArrayCards(countPairs, typeOfCard) {
        let array = [];
        for (let i = 0; i < countPairs; i++) {
            array[i] = typeOfCard[i];
            array[countPairs + i] = typeOfCard[i];
        }
        return this._shuffle(array, 3);
    }
    _shuffle(array, count = 1) {
        for (let i = 0; i < count; i++)
            array.sort(() => Math.random() - 0.5);
        return array;
    }
    _onClickCard(e) {
        if (!this._isStarted) {
            this._timerInterval();
            this._isStarted = true;
        }
        if (e.currentTarget.classList.contains('finded') || this._firstClickedElement == e.currentTarget) {
            return;
        }
        e.currentTarget.classList.toggle('is-flipped');
        if (!this._firstClickedElement) {
            this._firstClickedElement = e.currentTarget;
            return;
        }
        const firstClickedElement = this._firstClickedElement;
        const secondClickedElement = e.currentTarget;
        if (this._cards[firstClickedElement.id].name == this._cards[secondClickedElement.id].name) {
            firstClickedElement.classList.add('finded');
            secondClickedElement.classList.add('finded');
            this._countFindedPairs++;
            this._game._setPoint(20);
            let visible = 1;
            setTimeout(() => {
                const intervalOpacity = setInterval(() => {
                    firstClickedElement.parentNode.style.opacity = visible;
                    secondClickedElement.parentNode.style.opacity = visible;
                    visible -= 0.02;
                    if (visible < -0.01)
                        clearInterval(intervalOpacity);
                }, 10);
                firstClickedElement.style.cursor = 'default';
                secondClickedElement.style.cursor = 'default';
            }, 500);
            if (this._countFindedPairs == this._cards.length / 2) {
                if (this._cards.length == 20) {
                    this.endLevelGame(true);
                    return;
                }
                setTimeout(() => {
                    this._game._setPoint(this._seconds);
                    const result = confirm(`Вы прошли уровень.\nТекущее количество очков: ${this._game._getPoint()}\nИграем дальше?`);
                    result ? this.endLevelGame(true) : this._game._onClickEndGame('finish');
                }, 1100);
            }
        }
        else {
            this._timer.style.color = 'red';
            this._seconds -= 5;
            setTimeout(() => {
                firstClickedElement.classList.remove('is-flipped');
                secondClickedElement.classList.remove('is-flipped');
                this._timer.style.color = 'black';
            }, 500);
        }
        this._firstClickedElement = undefined;
    }
    _timerInterval() {
        this.intervalTimer = setInterval(() => {
            this._seconds--;
            this._timer.textContent = this._exchangeOfSeconds(this._seconds);
            if (this._seconds < 1) {
                this.endLevelGame(false);
                this._game._onClickEndGame('time');
            }
        }, 1000);
    }
    _exchangeOfSeconds(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return sec > 9 ? `0${min}:${sec}` : `0${min}:0${sec}`; // 01:25
    }
    endLevelGame(next) {
        clearInterval(this.intervalTimer);
        this._timer.textContent = '00:00';
        if (next)
            this._game._nextLevel();
    }
}
