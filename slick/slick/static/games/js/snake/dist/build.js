class Snake {
    constructor(context, size, startPoint) {
        this.body = [];
        this.direction = Direction.Up;
        this._ctx = context;
        this._sizeCell = size;
        this.head = startPoint;
        this.body.push({ x: this.head.x, y: (this.head.y + 1) }, { x: this.head.x, y: (this.head.y + 2) });
    }
    draw() {
        this._ctx.fillStyle = '#008800';
        this._ctx.fillRect(this.head.x * this._sizeCell, this.head.y * this._sizeCell, this._sizeCell, this._sizeCell);
        for (let i = 0; i < this.body.length; i++) {
            this._ctx.fillStyle = '#008800';
            this._ctx.fillRect(this.body[i].x * this._sizeCell, this.body[i].y * this._sizeCell, this._sizeCell, this._sizeCell);
            this._ctx.fillStyle = '#00BB00';
            this._ctx.fillRect(this.body[i].x * this._sizeCell + 2, this.body[i].y * this._sizeCell + 2, this._sizeCell - 4, this._sizeCell - 4);
        }
    }
    move(growing) {
        const oldHead = Object.assign({}, this.head);
        this.body.unshift(oldHead);
        if (!growing)
            this.body.pop();
        switch (this.direction) {
            case Direction.Up:
                this.head.y--;
                break;
            case Direction.Down:
                this.head.y++;
                break;
            case Direction.Right:
                this.head.x++;
                break;
            case Direction.Left:
                this.head.x--;
                break;
        }
    }
    up() {
        this.direction = this.direction != Direction.Down ? Direction.Up : Direction.Down;
    }
    left() {
        this.direction = this.direction != Direction.Right ? Direction.Left : Direction.Right;
    }
    down() {
        this.direction = this.direction != Direction.Up ? Direction.Down : Direction.Up;
    }
    right() {
        this.direction = this.direction != Direction.Left ? Direction.Right : Direction.Left;
    }
}
class Game {
    constructor() {
        this._img = new Image();
        this._sizeX = 20;
        this._sizeY = 20;
        this._sizeCell = 30;
        this._speed = 100;
        this._isStarted = false;
        this._directionChosen = false;
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._sizeX * this._sizeCell;
        this._canvas.height = this._sizeY * this._sizeCell;
        this._canvas.style.width = this._sizeX * this._sizeCell + 'px';
        this._canvas.style.height = this._sizeY * this._sizeCell + 'px';
        this._ctx = this._canvas.getContext('2d');
        this._img.src = '/static/games/image/snake/apple.png';
        this._startBtn = document.getElementById('start');
        this._startBtn.addEventListener('click', this._startGame.bind(this));
        this._pauseBtn = document.getElementById('pause');
        this._pauseBtn.addEventListener('click', this._pause.bind(this));
        this._restartBtn = document.getElementById('restart');
        this._restartBtn.addEventListener('click', this._restart.bind(this));
        document.addEventListener('keypress', this._onKeyPress.bind(this));
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, { x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2) });
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
    }
    _startGame() {
        this._isStarted = true;
        this._pauseBtn.disabled = false;
        this._processInterval = setTimeout(this._render.bind(this), this._speed);
    }
    _render() {
        this._step();
        this._drawField();
        this._drawFruit();
        this._snake.draw();
        this._directionChosen = false;
        if (this._isStarted) {
            setTimeout(this._render.bind(this), this._speed);
        }
    }
    _pause() {
        this._isStarted = false;
    }
    _restart() {
        this._isStarted = false;
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, { x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2) });
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
    }
    _drawField() {
        for (let y = 0; y < this._sizeY; y++) {
            for (let x = 0; x < this._sizeX; x++) {
                this._ctx.fillStyle = ((x + (y % 2)) % 2 === 0) ? '#AAAAAA' : '#777777';
                this._ctx.fillRect(x * this._sizeCell, y * this._sizeCell, this._sizeCell, this._sizeCell);
            }
        }
    }
    _createFruit() {
        const snake = [this._snake.head, ...this._snake.body];
        let inSnake = true;
        let x;
        let y;
        while (inSnake) {
            x = Math.floor(Math.random() * (this._sizeX));
            y = Math.floor(Math.random() * (this._sizeY));
            inSnake = snake.some((item) => item.x === x && item.y === y);
        }
        this._fruit = { x, y };
    }
    _drawFruit() {
        this._ctx.drawImage(this._img, this._fruit.x * this._sizeCell, this._fruit.y * this._sizeCell, this._sizeCell, this._sizeCell);
    }
    _onKeyPress(event) {
        if (this._directionChosen) {
            return;
        }
        switch (event.code) {
            case 'KeyW':
                this._snake.up();
                break;
            case 'KeyA':
                this._snake.left();
                break;
            case 'KeyS':
                this._snake.down();
                break;
            case 'KeyD':
                this._snake.right();
                break;
            default: return;
        }
        this._directionChosen = true;
        if (!this._isStarted) {
            this._startGame();
        }
    }
    _step() {
        const head = Object.assign({}, this._snake.head);
        switch (this._snake.direction) {
            case Direction.Up:
                head.y--;
                break;
            case Direction.Down:
                head.y++;
                break;
            case Direction.Right:
                head.x++;
                break;
            case Direction.Left:
                head.x--;
                break;
        }
        if (!this._checkIsAlive(head)) {
            this._endGame();
            return;
        }
        let growing = false;
        if (this._checkFruit(head)) {
            this._createFruit();
            this._drawFruit();
            growing = true;
        }
        this._snake.move(growing);
    }
    _checkFruit(head) {
        if (head.x === this._fruit.x && head.y === this._fruit.y) {
            return true;
        }
        return false;
    }
    _checkIsAlive(point) {
        // Проверка на столкновение со стеной
        if ((point.x < 0) || (point.x >= this._sizeX) || (point.y < 0) || (point.y >= this._sizeY)) {
            return false;
        }
        // Проверка на столкновение с туловищем
        for (const item of this._snake.body) {
            if (item.x === point.x && item.y === point.y) {
                return false;
            }
        }
        return true;
    }
    _endGame() {
        alert('Поражение!');
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, { x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2) });
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
        this._isStarted = false;
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
const game = new Game;
