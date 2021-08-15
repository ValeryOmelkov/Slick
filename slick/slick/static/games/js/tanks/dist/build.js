class Tank {
    constructor(context, size) {
        this._speed = 3;
        this._isMove = false;
        this._image = new Image;
        this._direction = Direction.Up;
        this._ctx = context;
        this._sizeCell = size;
        this._sizeBody = this._sizeCell * 2;
        this._image.src = '/static/games/image/tanks/tank.png';
        this._body = { x: 16 * this._sizeCell, y: 14 * this._sizeCell };
    }
    draw() {
        this._ctx.save();
        this._ctx.translate(this._body.x, this._body.y);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        const offsetX = this._direction > 1 ? -1 : 0;
        const offsetY = this._direction > 0 && this._direction < 3 ? -1 : 0;
        this._ctx.drawImage(this._image, offsetX * this._sizeBody, offsetY * this._sizeBody, this._sizeBody, this._sizeBody);
        this._ctx.restore();
    }
    _move() {
        let count = 0;
        setTimeout(tick.bind(this), 250 / 9);
        function tick() {
            switch (this._direction) {
                case Direction.Up:
                    this._body.y -= this._speed;
                    break;
                case Direction.Down:
                    this._body.y += this._speed;
                    break;
                case Direction.Right:
                    this._body.x += this._speed;
                    break;
                case Direction.Left:
                    this._body.x -= this._speed;
                    break;
            }
            count++;
            if (count < 9) {
                setTimeout(tick.bind(this), 250 / 9);
                return;
            }
            this._isMove = false;
        }
    }
    control(direction) {
        if (!this._isMove) {
            if (this._direction !== direction) {
                this._direction = direction;
                return;
            }
            if (!this._isMove) {
                this._move();
                this._isMove = true;
            }
        }
    }
    _shoot() {
    }
}
class Game {
    constructor() {
        this._sizeX = 17 * 2;
        this._sizeY = 13 * 2;
        this._sizeCell = 27;
        this._fps = 60;
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._sizeX * this._sizeCell;
        this._canvas.height = this._sizeY * this._sizeCell;
        this._canvas.style.width = this._sizeX * this._sizeCell + 'px';
        this._canvas.style.height = this._sizeY * this._sizeCell + 'px';
        this._ctx = this._canvas.getContext('2d');
        document.addEventListener('keydown', this._onKeyPress.bind(this));
        this._tank = new Tank(this._ctx, this._sizeCell);
        this._startGame();
    }
    _startGame() {
        this._interval = setTimeout(this._render.bind(this), 1000 / this._fps);
    }
    _render() {
        this._drawBackground();
        this._drawGrid();
        this._tank.draw();
        setTimeout(this._render.bind(this), 1000 / this._fps);
    }
    _drawBackground() {
        this._ctx.fillStyle = '#111111';
        this._ctx.fillRect(0, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, 4 * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillRect(this._sizeX * this._sizeCell - 4 * this._sizeCell, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
    }
    // Для дебага
    _drawGrid() {
        this._ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 26; i++) {
            this._ctx.fillRect(i * this._sizeCell + this._sizeCell * 4, 0, 1, this._canvas.height);
        }
        for (let i = 0; i < 26; i++) {
            this._ctx.fillRect(this._sizeCell * 4, i * this._sizeCell, this._canvas.width - this._sizeCell * 8, 1);
        }
    }
    _onKeyPress(event) {
        switch (event.code) {
            case 'KeyW':
                this._tank.control(Direction.Up);
                break;
            case 'KeyA':
                this._tank.control(Direction.Left);
                break;
            case 'KeyS':
                this._tank.control(Direction.Down);
                break;
            case 'KeyD':
                this._tank.control(Direction.Right);
                break;
            default: return;
        }
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
const game = new Game();
