class Bullet{
    protected _canvas: any;
    protected _ctx: any;
    protected _coord: Point;
    protected _sizeBody: number = 10;
    protected _speedUpdate: number = 1;
    protected _speedPixel: number = 2;
    protected _direction: Direction;
    protected _image: HTMLImageElement = new Image;
    
    constructor(canvas: any, context: any, coordinates: Point, direction: Direction){
        this._canvas = canvas;
        this._ctx = context;
        this._coord = coordinates;
        this._coord.x -= this._sizeBody/2;
        this._coord.y -= this._sizeBody/2;
        this._direction = direction;
        this._image.src = '/static/games/image/tanks/bullet.png';
        this._move();
    }

    public draw(): void{
        this._ctx.save();
        this._ctx.translate(this._coord.x + this._sizeBody/2, this._coord.y + this._sizeBody/2);
        this._ctx.rotate((90 * this._direction) * Math.PI / 180);
        this._ctx.drawImage(this._image, -this._sizeBody/2, -this._sizeBody/2, this._sizeBody, this._sizeBody);       
        this._ctx.restore(); 
    }

    protected _move(): void{
        setTimeout(tick.bind(this), this._speedUpdate);

        function tick(): void{
            switch(this._direction) {
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

            if(!this.checkDestroyed()){
                setTimeout(tick.bind(this), this._speedUpdate);
            }
        }
    }

    public checkDestroyed(): boolean{
        if( this._coord.x < -this._sizeBody/2 + 108 || 
            this._coord.x > this._canvas.width - this._sizeBody/2 - 108 ||
            this._coord.y < -this._sizeBody/2 || 
            this._coord.y > this._canvas.height - this._sizeBody/2
        ){
            return true;
        }

        return false;
    }
}