class Tank{
    protected _canvas: any;
    protected _ctx: any;
    protected _body: Point;
    protected _speed: number;
    protected _bullet: Bullet;
    protected _sizeCell: number;
    protected _sizeBody: number;
    protected _isMove: boolean = false;
    protected _image: HTMLImageElement = new Image; 
    protected _direction: Direction = Direction.Up;

    constructor(canvas: any, context: any, sizeCell: number){
        this._canvas = canvas;
        this._ctx = context;
        this._sizeCell = sizeCell;
        this._sizeBody = this._sizeCell * 2;
        this._speed = 250/this._sizeCell;
        this._image.src = '/static/games/image/tanks/tank.png';
        this._body = {x: 11 * this._sizeCell, y: 4 * this._sizeCell}
    }

    public draw(): void{
        if(this._bullet){
            this._bullet.draw();
        }

        this._ctx.save();
        this._ctx.translate(this._body.x + this._sizeCell, this._body.y + this._sizeCell);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        this._ctx.drawImage(this._image, -this._sizeCell, -this._sizeCell, this._sizeBody, this._sizeBody);       
        this._ctx.restore(); 
    }

    protected _move(): void{
        let count: number = 0;
        setTimeout(tick.bind(this), this._speed)

        function tick(): void{
            switch(this._direction) {
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
            
            if(count < this._sizeCell){
                setTimeout(tick.bind(this), this._speed);
                return;
            }

            this._isMove = false;
        }
    }

    public control(direction: Direction): void{
        if(this._isMove){
            return;
        }

        if(this._direction !== direction){
            this._direction = direction;
            return;
        }

        this._move();
        this._isMove = true;
    }

    public shoot(): void{
        if(this._bullet){
            return;
        }

        this._bullet = new Bullet(this._canvas, this._ctx, {x: this._body.x + this._sizeCell, y: this._body.y + this._sizeCell}, this._direction);
    
        const bulletInterval: number = setInterval(() => {
            if(this._bullet.checkDestroyed()){
                this._bullet = null;
                delete this._bullet;
                clearInterval(bulletInterval);
            }
        }, 10);
    }
}