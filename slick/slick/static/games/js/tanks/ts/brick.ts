class Brick extends Block {

    constructor(context: any, coordinates: Point, size: number){
        super(context, coordinates, size);
        this._isDestroyed = true;
        this._isTankPass = false;
        this._isPassBullet = false;
        this._image.src = '/static/games/image/tanks/brick.png';
    }
}