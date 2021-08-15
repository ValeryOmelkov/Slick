class Tank{
    protected _ctx: any;
    protected _sizeCell: number;
    protected _sizeBody: number;
    protected _body: Point;
    protected _speed: number = 3;
    protected _isMove: boolean = false;
    protected _image: HTMLImageElement = new Image; 
    protected _direction: Direction = Direction.Up;

    constructor(context: any, size: number){
        this._ctx = context;
        this._sizeCell = size;
        this._sizeBody = this._sizeCell * 2;
        this._image.src = '/static/games/image/tanks/tank.png';
        this._body = {x: 16 * this._sizeCell, y: 14 * this._sizeCell}
    }

    public draw(): void{
        this._ctx.save();
        this._ctx.translate(this._body.x, this._body.y);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        const offsetX = this._direction > 1 ? -1: 0;
        const offsetY = this._direction > 0 && this._direction < 3 ? -1 : 0;
        this._ctx.drawImage(this._image, offsetX * this._sizeBody, offsetY * this._sizeBody, this._sizeBody, this._sizeBody);       
        this._ctx.restore(); 
    }

    protected _move(): void{
        let count: number = 0;
        setTimeout(tick.bind(this), 250/9)

        function tick(): void{
            switch(this._direction) {
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
            
            if(count < 9){
                setTimeout(tick.bind(this), 250/9);
                return;
            }

            this._isMove = false;
        }
    }

    public control(direction: Direction): void{
        if(!this._isMove){
            if(this._direction !== direction){
                this._direction = direction;
                return;
            }
            if(!this._isMove){
                this._move();
                this._isMove = true;
            }
        }
    }

    protected _shoot(): void{

    }
}