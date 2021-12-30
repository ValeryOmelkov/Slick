class Bush extends Block{

    constructor(context: any, coordinates: Point, size: number){
        super(context, coordinates, size);
        this._isDestroyed = false;
        this._isTankPass = true;
        this._isPassBullet = true;
        this._image.src = '/static/games/image/tanks/bush.png';
    }
}