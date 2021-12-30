class Block{
    public number: number;
    public color: string = '#ffeea8';

    protected _ctx: any;
    protected _coord: Coordinates;
    protected _place: number;
    protected _timeUpdate: number = 5;
    protected _speedPixel: number = 1;
    protected _font: string = '60px cursive'; // cursive | fantasy
    protected _size: number = 80;

    constructor(context: any, number: number, place: number){
        this._ctx = context;
        this.number = number;
        this._place = place;
        this._coord = {x: 10 + 100 * this._place, y: 100};
    }

    public draw(): void{
        this._ctx.fillStyle = this.color;
        this._ctx.fillRect(this._coord.x, this._coord.y, this._size, this._size);
        this._ctx.fillStyle = '#000000';
        this._ctx.strokeRect(this._coord.x, this._coord.y, this._size, this._size);
        
        this._ctx.font = this._font; 
        this._ctx.fillStyle = '#000000';
        let text = this._ctx.measureText(this.number);
        this._ctx.fillText(this.number, this._coord.x + (this._size - text.width)/2, this._coord.y + 63);
    }

    public changePlace(value: number): void{
        this._place += value;
    }

    public selectionAnimation(): void{ // 700
        this.color = '#efa94a';
        setTimeout(tick.bind(this), this._timeUpdate*50);

        function tick(): void{
            this._coord.y -= this._speedPixel;
            if(this._coord.y > 80){
                setTimeout(tick.bind(this), this._timeUpdate);
            }
        }
    }

    public unselectionAnimation(): void{ // 700
        setTimeout(tick.bind(this), this._timeUpdate*50);

        function tick(): void{
            this._coord.y += this._speedPixel;
            if (this._coord.y < 100){
                setTimeout(tick.bind(this), this._timeUpdate);
            }
            if (this._coord.y >= 98){
                this.color = '#ffeea8';
            }   
        }
    }

    public movingLeftAnimation(): void{ // 2800
        setTimeout(tick.bind(this, 1), this._timeUpdate);

        function tick(stage: number): void{
            if (this._coord.y > 0 && stage === 1){
                this._coord.y -= this._speedPixel;
                setTimeout(tick.bind(this, 1), this._timeUpdate);
            } else if(this._coord.x > (10 + 100 * (this._place) - 100)){
                this._coord.x -= this._speedPixel;
                setTimeout(tick.bind(this, 2), this._timeUpdate);
            } else if (this._coord.y < 100 && stage === 2){
                this._coord.y += this._speedPixel;
                setTimeout(tick.bind(this, 2), this._timeUpdate);
            } else {
                this.color = '#ffeea8';
                this.changePlace(-1);
            }
        }
    }

    public movingRightAnimation(): void{ // 1500
        setTimeout(tick.bind(this), this._timeUpdate*70);

        function tick(): void{
            if(this._coord.y < 100){
                this._coord.y += this._speedPixel;
                setTimeout(tick.bind(this), this._timeUpdate);
            }else if(this._coord.x <= (10 + 100 * this._place) + 100){
                this._coord.x += this._speedPixel;
                setTimeout(tick.bind(this), this._timeUpdate);
            } else {
                this.color = '#ffeea8';
                this.changePlace(1);
            }
        }
    }
}