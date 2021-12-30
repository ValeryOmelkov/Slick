class Level {
    constructor(context) {
        this._ctx = context;
        this.level = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 1, 1,],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
        ];
    }
    getLevel() {
        const array = [];
        for (let j = 0; j < this.level.length; j++) {
            const local = [];
            for (let i = 0; i < 26; i++) {
                switch (this.level[j][i]) {
                    case 0:
                        local.push(undefined);
                        break;
                    case 1:
                        local.push(new Brick(this._ctx, { x: i + 4, y: j }, 27));
                        break;
                    case 2:
                        local.push(new Steel(this._ctx, { x: i + 4, y: j }, 27));
                        break;
                    case 3:
                        local.push(new Water(this._ctx, { x: i + 4, y: j }, 27));
                        break;
                    case 4:
                        local.push(new Bush(this._ctx, { x: i + 4, y: j }, 27));
                        break;
                }
            }
            array.push(local);
        }
        return array;
    }
}
class Block {
    constructor(context, coordinates, size) {
        this._image = new Image;
        this._ctx = context;
        this._coord = coordinates;
        this._size = size;
    }
    draw() {
        this._ctx.drawImage(this._image, this._coord.x * this._size, this._coord.y * this._size, this._size, this._size);
    }
}
class Brick extends Block {
    constructor(context, coordinates, size) {
        super(context, coordinates, size);
        this._isDestroyed = true;
        this._isTankPass = false;
        this._isPassBullet = false;
        this._image.src = '/static/games/image/tanks/brick.png';
    }
}
class Steel extends Block {
    constructor(context, coordinates, size) {
        super(context, coordinates, size);
        this._isDestroyed = false;
        this._isTankPass = false;
        this._isPassBullet = false;
        this._image.src = '/static/games/image/tanks/steel.png';
    }
}
class Water extends Block {
    constructor(context, coordinates, size) {
        super(context, coordinates, size);
        this._isDestroyed = false;
        this._isTankPass = false;
        this._isPassBullet = true;
        this._image.src = '/static/games/image/tanks/water.png';
    }
}
class Bush extends Block {
    constructor(context, coordinates, size) {
        super(context, coordinates, size);
        this._isDestroyed = false;
        this._isTankPass = true;
        this._isPassBullet = true;
        this._image.src = '/static/games/image/tanks/bush.png';
    }
}
class Bullet {
    constructor(canvas, context, coordinates, direction) {
        this._sizeBody = 10;
        this._speedUpdate = 1;
        this._speedPixel = 2;
        this._image = new Image;
        this._canvas = canvas;
        this._ctx = context;
        this._coord = coordinates;
        this._coord.x -= this._sizeBody / 2;
        this._coord.y -= this._sizeBody / 2;
        this._direction = direction;
        this._image.src = '/static/games/image/tanks/bullet.png';
        this._move();
    }
    draw() {
        this._ctx.save();
        this._ctx.translate(this._coord.x + this._sizeBody / 2, this._coord.y + this._sizeBody / 2);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        this._ctx.drawImage(this._image, -this._sizeBody / 2, -this._sizeBody / 2, this._sizeBody, this._sizeBody);
        this._ctx.restore();
    }
    _move() {
        setTimeout(tick.bind(this), this._speedUpdate);
        function tick() {
            switch (this._direction) {
                case Direction.Up:
                    this._coord.y -= this._speedPixel;
                    break;
                case Direction.Down:
                    this._coord.y += this._speedPixel;
                    break;
                case Direction.Right:
                    this._coord.x += this._speedPixel;
                    break;
                case Direction.Left:
                    this._coord.x -= this._speedPixel;
                    break;
            }
            if (!this.checkDestroyed()) {
                setTimeout(tick.bind(this), this._speedUpdate);
            }
        }
    }
    checkDestroyed() {
        if (this._coord.x < -this._sizeBody / 2 + 108 ||
            this._coord.x > this._canvas.width - this._sizeBody / 2 - 108 ||
            this._coord.y < -this._sizeBody / 2 ||
            this._coord.y > this._canvas.height - this._sizeBody / 2) {
            return true;
        }
        return false;
    }
}
class Tank {
    constructor(canvas, context, sizeCell) {
        this._isMove = false;
        this._image = new Image;
        this._direction = Direction.Up;
        this._canvas = canvas;
        this._ctx = context;
        this._sizeCell = sizeCell;
        this._sizeBody = this._sizeCell * 2;
        this._speed = 250 / this._sizeCell;
        this._image.src = '/static/games/image/tanks/tank.png';
        this._body = { x: 11 * this._sizeCell, y: 4 * this._sizeCell };
    }
    draw() {
        if (this._bullet) {
            this._bullet.draw();
        }
        this._ctx.save();
        this._ctx.translate(this._body.x + this._sizeCell, this._body.y + this._sizeCell);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        this._ctx.drawImage(this._image, -this._sizeCell, -this._sizeCell, this._sizeBody, this._sizeBody);
        this._ctx.restore();
    }
    _move() {
        let count = 0;
        setTimeout(tick.bind(this), this._speed);
        function tick() {
            switch (this._direction) {
                case Direction.Up:
                    this._body.y--;
                    break;
                case Direction.Down:
                    this._body.y++;
                    break;
                case Direction.Right:
                    this._body.x++;
                    break;
                case Direction.Left:
                    this._body.x--;
                    break;
            }
            count++;
            if (count < this._sizeCell) {
                setTimeout(tick.bind(this), this._speed);
                return;
            }
            this._isMove = false;
        }
    }
    control(direction) {
        if (this._isMove) {
            return;
        }
        if (this._direction !== direction) {
            this._direction = direction;
            return;
        }
        this._move();
        this._isMove = true;
    }
    shoot() {
        if (this._bullet) {
            return;
        }
        this._bullet = new Bullet(this._canvas, this._ctx, { x: this._body.x + this._sizeCell, y: this._body.y + this._sizeCell }, this._direction);
        const bulletInterval = setInterval(() => {
            if (this._bullet.checkDestroyed()) {
                this._bullet = null;
                delete this._bullet;
                clearInterval(bulletInterval);
            }
        }, 10);
    }
}
class Game {
    constructor() {
        this._sizeX = 26 + 8; // width  = 27 * 34 = 108 + 702 + 180 
        this._sizeY = 26; // height = 27 * 26 = 702
        this._sizeCell = 27;
        this._fps = 60;
        this._keyPress = null;
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._sizeX * this._sizeCell;
        this._canvas.height = this._sizeY * this._sizeCell;
        this._canvas.style.width = this._sizeX * this._sizeCell + 'px';
        this._canvas.style.height = this._sizeY * this._sizeCell + 'px';
        this._ctx = this._canvas.getContext('2d');
        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
        this._tank = new Tank(this._canvas, this._ctx, this._sizeCell);
        this._level = new Level(this._ctx).getLevel();
        this._startGame();
    }
    _startGame() {
        this._gameTimeout = setTimeout(this._render.bind(this), 1000 / this._fps);
    }
    _render() {
        this._drawBackground();
        this._drawGrid();
        this._tank.draw();
        this._drawLevel();
        setTimeout(this._render.bind(this), 1000 / this._fps);
    }
    _drawBackground() {
        this._ctx.fillStyle = '#111111';
        this._ctx.fillRect(0, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, 4 * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillRect(this._sizeX * this._sizeCell - 4 * this._sizeCell, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
    }
    _drawLevel() {
        for (let row of this._level) {
            for (let item of row) {
                if (item) {
                    item.draw();
                }
            }
        }
    }
    // Для дебага
    _drawGrid() {
        this._ctx.fillStyle = '#333333';
        for (let i = 0; i < 26; i++) {
            this._ctx.fillRect(i * this._sizeCell + this._sizeCell * 4, 0, 1, this._canvas.height);
        }
        for (let i = 0; i < 26; i++) {
            this._ctx.fillRect(this._sizeCell * 4, i * this._sizeCell, this._canvas.width - this._sizeCell * 8, 1);
        }
    }
    _onKeyDown(event) {
        if (event.code === KeyControl.Shoot) {
            this._tank.shoot();
            return;
        }
        if (this._keyPress || event.repeat) {
            return;
        }
        this._keyPress = KeyControl[this._getKeyByValue(KeyControl, event.code)];
        if (!this._keyPress) {
            return;
        }
        this._tank.control(Direction[this._getKeyByValue(KeyControl, event.code)]);
        this._keyTimeout = setTimeout(tick.bind(this), 250);
        function tick() {
            this._tank.control(Direction[this._getKeyByValue(KeyControl, event.code)]);
            this._keyTimeout = setTimeout(tick.bind(this), 1);
        }
    }
    _onKeyUp(event) {
        if (event.code === this._keyPress) {
            this._keyPress = null;
            clearTimeout(this._keyTimeout);
        }
    }
    _getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
var KeyControl;
(function (KeyControl) {
    KeyControl["Up"] = "KeyW";
    KeyControl["Right"] = "KeyD";
    KeyControl["Down"] = "KeyS";
    KeyControl["Left"] = "KeyA";
    KeyControl["Shoot"] = "Space";
})(KeyControl || (KeyControl = {}));
const game = new Game();
