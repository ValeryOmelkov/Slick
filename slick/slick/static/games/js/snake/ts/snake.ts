class Snake {
    protected _ctx: any;
    protected _sizeCell: number;
    public head: Point;
    public body: Point[] = [];
    public direction: Direction = Direction.Up;
    
    constructor(context: any, size: number, startPoint: Point) {
        this._ctx = context;
        this._sizeCell = size;
        this.head = startPoint;
        this.body.push({x:this.head.x, y:(this.head.y + 1)}, {x:this.head.x, y:(this.head.y + 2)})
    }
    
    public draw() {
        this._ctx.fillStyle = '#008800';
        this._ctx.fillRect(this.head.x * this._sizeCell, this.head.y * this._sizeCell, this._sizeCell, this._sizeCell);
        for(let i: number = 0; i < this.body.length; i++) {
            this._ctx.fillStyle = '#008800';
            this._ctx.fillRect(this.body[i].x * this._sizeCell, this.body[i].y * this._sizeCell, this._sizeCell, this._sizeCell);
            this._ctx.fillStyle = '#00BB00';
            this._ctx.fillRect(this.body[i].x * this._sizeCell + 2, this.body[i].y * this._sizeCell + 2, this._sizeCell - 4, this._sizeCell - 4);
        }
    }
    
    public move(growing: boolean) {
        const oldHead = {...this.head};
        this.body.unshift(oldHead);
        if (!growing) this.body.pop();
        
        switch(this.direction) {
            case Direction.Up: 
                this.head.y--; 
                break;
            case Direction.Down: 
                this.head.y++; 
                break;
            case Direction.Right: 
                this.head.x++; 
                break;
            case Direction.Left: 
                this.head.x--; 
                break;
        }
    }

    public up(): void{
        this.direction = this.direction != Direction.Down ? Direction.Up : Direction.Down;
    }
    
    public left(): void{
        this.direction = this.direction != Direction.Right ? Direction.Left : Direction.Right;
    }
    
    public down(): void{
        this.direction = this.direction != Direction.Up ? Direction.Down : Direction.Up;
    }
    
    public right(): void{
        this.direction = this.direction != Direction.Left ? Direction.Right : Direction.Left;
    }
}