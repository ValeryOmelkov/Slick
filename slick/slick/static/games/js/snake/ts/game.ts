class Game {
    protected _canvas: any;
    protected _ctx: any;
    protected _startBtn: HTMLButtonElement;
    protected _pauseBtn: HTMLButtonElement;
    protected _restartBtn: HTMLButtonElement;

    protected _snake: Snake;
    protected _fruit: Point;
    protected _img: HTMLImageElement = new Image();
    
    protected _sizeX: number = 20;
    protected _sizeY: number = 20;
    protected _sizeCell: number = 30;
    protected _speed: number = 100;

    protected _isStarted: boolean = false;
    protected _processInterval: number;
    protected _directionChosen: boolean = false;
    
    constructor() {
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._sizeX * this._sizeCell;
        this._canvas.height = this._sizeY * this._sizeCell; 
        this._canvas.style.width = this._sizeX * this._sizeCell + 'px';
        this._canvas.style.height = this._sizeY * this._sizeCell + 'px';
        this._ctx = this._canvas.getContext('2d');
        
        this._img.src = '/static/games/image/snake/apple.png'

        this._startBtn = document.getElementById('start') as HTMLButtonElement;
        this._startBtn.addEventListener('click', this._startGame.bind(this));
        
        this._pauseBtn = document.getElementById('pause') as HTMLButtonElement;
        this._pauseBtn.addEventListener('click', this._pause.bind(this));
        
        this._restartBtn = document.getElementById('restart') as HTMLButtonElement;
        this._restartBtn.addEventListener('click', this._restart.bind(this));

        document.addEventListener('keypress', this._onKeyPress.bind(this));
        
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, {x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2)});
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
    }
    
    protected _startGame() {
        this._isStarted = true;
        this._pauseBtn.disabled = false;
        this._processInterval = setTimeout (this._render.bind(this), this._speed);
    }

    protected _render(): void{
        this._step();
        this._drawField();
        this._drawFruit();
        this._snake.draw();
        this._directionChosen = false;
        if (this._isStarted){
            setTimeout(this._render.bind(this), this._speed);
        }
    }
    
    protected _pause() {
        this._isStarted = false;
    }
    
    protected _restart() {
        this._isStarted = false;
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, {x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2)});
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
    }

    protected _drawField(): void {
        for(let y: number = 0; y < this._sizeY; y++) {
            for(let x: number = 0; x < this._sizeX; x++) {
                this._ctx.fillStyle = ((x + (y % 2)) % 2 === 0) ? '#AAAAAA' : '#777777';
                this._ctx.fillRect(x * this._sizeCell, y * this._sizeCell, this._sizeCell, this._sizeCell);
            }
        }
    }
    
    protected _createFruit(): void {
        const snake = [this._snake.head, ...this._snake.body];
        let inSnake: boolean = true;
        let x: number;
        let y: number;
        while(inSnake){
            x = Math.floor(Math.random() * (this._sizeX));
            y = Math.floor(Math.random() * (this._sizeY));
            inSnake = snake.some((item) => item.x === x && item.y === y);
        }
        this._fruit = {x, y};
    }
    
    protected _drawFruit(): void {
        this._ctx.drawImage(this._img, this._fruit.x * this._sizeCell, this._fruit.y * this._sizeCell, this._sizeCell, this._sizeCell);
    }

    protected _onKeyPress(event: any): void {
        if (this._directionChosen) {
            return;
        }

        switch(event.code){
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
        
        if(!this._isStarted) {
            this._startGame();
        }
    }
    
    protected _step(): void {
        const head: Point = {...this._snake.head};

        switch(this._snake.direction) {
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
        
        let growing: boolean = false;
        if (this._checkFruit(head)) {
            this._createFruit();
            this._drawFruit();
            growing = true;
        }

        this._snake.move(growing);
    }
    
    protected _checkFruit(head: Point): boolean {
        if (head.x === this._fruit.x && head.y === this._fruit.y) {
            return true;
        }
        return false;
    }
    
    protected _checkIsAlive(point: Point): boolean {
        // Проверка на столкновение со стеной
        if ((point.x < 0) || (point.x >= this._sizeX) || (point.y < 0) || (point.y >= this._sizeY)) {
            return false;
        }
        // Проверка на столкновение с туловищем
        for(const item of this._snake.body) {
            if(item.x === point.x && item.y === point.y){
                return false;
            }
        }
        
        return true;
    }
    
    protected _endGame(): void { 
        alert('Поражение!');
        this._drawField();
        this._snake = new Snake(this._ctx, this._sizeCell, {x: Math.floor(this._sizeX / 2), y: Math.floor(this._sizeY / 2)});
        this._snake.draw();
        this._createFruit();
        this._drawFruit();
        this._isStarted = false;
    }
}

interface Point {
    x: number;
    y: number;
}

enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3
}

const game = new Game;