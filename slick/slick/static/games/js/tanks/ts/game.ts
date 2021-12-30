class Game {
    protected _canvas: any;
    protected _ctx: any;

    protected _sizeX: number = 26 + 8;     // width  = 27 * 34 = 108 + 702 + 180 
    protected _sizeY: number = 26;         // height = 27 * 26 = 702
    protected _sizeCell: number = 27;

    protected _gameTimeout: number;
    protected _fps: number = 60;

    protected _keyTimeout: number;
    protected _keyPress: KeyControl = null;

    protected _tank: Tank;
    protected _level: Array<Array<any>>;

    constructor(){
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

    protected _startGame(): void{
        this._gameTimeout = setTimeout(this._render.bind(this), 1000 / this._fps);
    }

    protected _render(): void{
        this._drawBackground();
        this._drawGrid();
        this._tank.draw();
        this._drawLevel();
        setTimeout(this._render.bind(this), 1000 / this._fps);
    }

    protected _drawBackground(): void{
        this._ctx.fillStyle = '#111111';
        this._ctx.fillRect(0, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillStyle = '#000000';
        this._ctx.fillRect(0, 0, 4 * this._sizeCell, this._sizeY * this._sizeCell);
        this._ctx.fillRect(this._sizeX * this._sizeCell - 4 * this._sizeCell, 0, this._sizeX * this._sizeCell, this._sizeY * this._sizeCell);
    }

    protected _drawLevel(): void{
        for(let row of this._level){
            for(let item of row){
                if(item){
                    item.draw();
                }
            }
        }
    }

    // Для дебага
    protected _drawGrid(): void{
        this._ctx.fillStyle = '#333333';
        for(let i = 0; i < 26; i++){
            this._ctx.fillRect(i*this._sizeCell + this._sizeCell*4, 0, 1, this._canvas.height);
        }
        for(let i = 0; i < 26; i++){
            this._ctx.fillRect(this._sizeCell*4, i*this._sizeCell, this._canvas.width-this._sizeCell*8, 1);
        }
    }

    protected _onKeyDown(event: any): void {
        if(event.code === KeyControl.Shoot){
            this._tank.shoot();
            return;
        }

        if(this._keyPress || event.repeat){
            return;
        }

        this._keyPress = KeyControl[this._getKeyByValue(KeyControl, event.code)];

        if(!this._keyPress){
            return;
        }

        this._tank.control(Direction[this._getKeyByValue(KeyControl, event.code)]);

        this._keyTimeout = setTimeout(tick.bind(this), 250);
        function tick(): void{
            this._tank.control(Direction[this._getKeyByValue(KeyControl, event.code)]);
            this._keyTimeout = setTimeout(tick.bind(this), 1);
        }
    }

    protected _onKeyUp(event: any): void{
        if (event.code === this._keyPress){
            this._keyPress = null;
            clearTimeout(this._keyTimeout);
        }
    }

    protected _getKeyByValue(object: object, value: string): string{
        return Object.keys(object).find(key => object[key] === value);
    }
}

interface Point {
    x: number;
    y: number;
}

enum Direction {
    Up    = 0,
    Right = 1,
    Down  = 2,
    Left  = 3
}

enum KeyControl {
    Up    = 'KeyW',
    Right = 'KeyD',
    Down  = 'KeyS',
    Left  = 'KeyA',
    Shoot = 'Space'
}

const game = new Game();

