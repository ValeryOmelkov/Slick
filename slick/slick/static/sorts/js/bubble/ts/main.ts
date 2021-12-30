class Bubble {
    protected _canvas: any;
    protected _ctx: any;
    
    protected _width: number = 1000;
    protected _height: number = 180;

    protected _fps: number = 60;

    protected _numbers: Array<Block>;

    constructor(){
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._width
        this._canvas.height = this._height; 
        this._canvas.style.width = this._width + 'px';
        this._canvas.style.height = this._height + 'px';
        this._ctx = this._canvas.getContext('2d');

        this._numbers = this._createArray(10);

        this._draw();

        setTimeout(() => {
            this._animation();
        }, 2000);
    }

    protected _createArray(count: number): Array<Block>{
        const array: Array<Block> = [];
        for(let i = 0; i < count; i++){
            let rnd = Math.round(Math.random() * (99 - 1) + 1);
            array[i] = new Block(this._ctx, rnd, i)
        }
        return array;
    }

    protected _draw(): void{
        setTimeout(tick.bind(this), 1000 / this._fps);

        function tick(): void{
            this._ctx.clearRect(0, 0, this._width, this._height);
            for(let i = 0; i < 10; i++){
                this._numbers[i].draw();
            }
            setTimeout(tick.bind(this), 1000 / this._fps);
        }
    }

    protected _animation(): void {
        setTimeout(outer.bind(this, this._numbers.length - 1), 1);

        function outer(j: number): void{
            if(j > 0){
                setTimeout(inner.bind(this, 0, j), 1);
            }
        }

        function inner(i: number, j: number): void{
            this._numbers[i].selectionAnimation();
            this._numbers[i + 1].selectionAnimation();
            
            if(this._numbers[i].number > this._numbers[i + 1].number){
                setTimeout(() => {
                    this._numbers[i].movingRightAnimation();
                    this._numbers[i + 1].movingLeftAnimation();

                    setTimeout(() => {
                        let n = this._numbers[i];
                        this._numbers[i] = this._numbers[i + 1];
                        this._numbers[i + 1] = n;
                    }, 1000/2)
                    
                    setTimeout(repeat.bind(this, i, j), 4000/2);
                }, 2000/2);                
            } else {
                setTimeout(() => {
                    this._numbers[i].unselectionAnimation();
                    this._numbers[i + 1].unselectionAnimation();
                }, 1200/2)
                setTimeout(repeat.bind(this, i, j), 2400/2);
            }
        }

        function repeat(i: number, j: number): void{
            i++;
            if(i < j){
                setTimeout(inner.bind(this, i, j), 1);
            } else {
                this._numbers[j].color = '#98ff98';
                j--;
                if (j === 0) this._numbers[j].color = '#98ff98';
                setTimeout(outer.bind(this, j), 1);
            }
        }
    }
}

interface Coordinates{
    x: number;
    y: number;
}

const bubble = new Bubble();