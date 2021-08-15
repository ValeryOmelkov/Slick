class Game {
    protected _canvas: any;
    protected _ctx: any;

    protected _sizeX: number = 17 * 2;
    protected _sizeY: number = 13 * 2;
    protected _sizeCell: number = 27;

    protected _interval: number;
    protected _fps: number = 60;

    protected _tank: Tank;

    constructor(){
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

    protected _startGame(): void{
        this._interval = setTimeout(this._render.bind(this), 1000 / this._fps);
    }

    protected _render(): void{
        this._drawBackground();
        this._drawGrid();
        this._tank.draw();
        setTimeout(this._render.bind(this), 1000 / this._fps);
    }

    protected _drawBackground(): void{
        this._ctx.fillStyle = '#111111';
        this._ctx.fillRect(0, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, 4 * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillRect(this._sizeX * this._sizeCell - 4 * this._sizeCell, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
    }

    // Для дебага
    protected _drawGrid(): void{
        this._ctx.fillStyle = '#ffffff';
        for(let i = 0; i < 26; i++){
            this._ctx.fillRect(i*this._sizeCell + this._sizeCell*4, 0, 1, this._canvas.height);
        }
        for(let i = 0; i < 26; i++){
            this._ctx.fillRect(this._sizeCell*4, i*this._sizeCell, this._canvas.width-this._sizeCell*8, 1);
        }
    }

    protected _onKeyPress(event: any): void {
        switch(event.code){
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

const game = new Game();

