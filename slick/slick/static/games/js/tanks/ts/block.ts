class Block{
    protected _isDestroyed: boolean;
    protected _isTankPass: boolean;
    protected _isPassBullet: boolean;
    protected _image: HTMLImageElement = new Image;
    protected _coord: Point;
    protected _ctx: any;
    protected _size: number;

    constructor(context: any, coordinates: Point, size: number){
        this._ctx = context;
        this._coord = coordinates;
        this._size = size;
    }

    public draw(): void{
        this._ctx.drawImage(this._image, this._coord.x * this._size, this._coord.y * this._size, this._size, this._size);    
    }
}