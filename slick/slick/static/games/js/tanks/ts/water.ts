class Water extends Block{
    
    constructor(context: any, coordinates: Point, size: number){
        super(context, coordinates, size);
        this._isDestroyed = false;
        this._isTankPass = false;
        this._isPassBullet = true;
        this._image.src = '/static/games/image/tanks/water.png';
    }
}