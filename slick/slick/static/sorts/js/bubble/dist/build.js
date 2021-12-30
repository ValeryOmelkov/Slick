class Block {
    constructor(context, number, place) {
        this.color = '#ffeea8';
        this._timeUpdate = 5;
        this._speedPixel = 1;
        this._font = '60px cursive'; // cursive | fantasy
        this._size = 80;
        this._ctx = context;
        this.number = number;
        this._place = place;
        this._coord = { x: 10 + 100 * this._place, y: 100 };
    }
    draw() {
        this._ctx.fillStyle = this.color;
        this._ctx.fillRect(this._coord.x, this._coord.y, this._size, this._size);
        this._ctx.fillStyle = '#000000';
        this._ctx.strokeRect(this._coord.x, this._coord.y, this._size, this._size);
        this._ctx.font = this._font;
        this._ctx.fillStyle = '#000000';
        let text = this._ctx.measureText(this.number);
        this._ctx.fillText(this.number, this._coord.x + (this._size - text.width) / 2, this._coord.y + 63);
    }
    changePlace(value) {
        this._place += value;
    }
    selectionAnimation() {
        this.color = '#efa94a';
        setTimeout(tick.bind(this), this._timeUpdate * 50);
        function tick() {
            this._coord.y -= this._speedPixel;
            if (this._coord.y > 80) {
                setTimeout(tick.bind(this), this._timeUpdate);
            }
        }
    }
    unselectionAnimation() {
        setTimeout(tick.bind(this), this._timeUpdate * 50);
        function tick() {
            this._coord.y += this._speedPixel;
            if (this._coord.y < 100) {
                setTimeout(tick.bind(this), this._timeUpdate);
            }
            if (this._coord.y >= 98) {
                this.color = '#ffeea8';
            }
        }
    }
    movingLeftAnimation() {
        setTimeout(tick.bind(this, 1), this._timeUpdate);
        function tick(stage) {
            if (this._coord.y > 0 && stage === 1) {
                this._coord.y -= this._speedPixel;
                setTimeout(tick.bind(this, 1), this._timeUpdate);
            }
            else if (this._coord.x > (10 + 100 * (this._place) - 100)) {
                this._coord.x -= this._speedPixel;
                setTimeout(tick.bind(this, 2), this._timeUpdate);
            }
            else if (this._coord.y < 100 && stage === 2) {
                this._coord.y += this._speedPixel;
                setTimeout(tick.bind(this, 2), this._timeUpdate);
            }
            else {
                this.color = '#ffeea8';
                this.changePlace(-1);
            }
        }
    }
    movingRightAnimation() {
        setTimeout(tick.bind(this), this._timeUpdate * 70);
        function tick() {
            if (this._coord.y < 100) {
                this._coord.y += this._speedPixel;
                setTimeout(tick.bind(this), this._timeUpdate);
            }
            else if (this._coord.x <= (10 + 100 * this._place) + 100) {
                this._coord.x += this._speedPixel;
                setTimeout(tick.bind(this), this._timeUpdate);
            }
            else {
                this.color = '#ffeea8';
                this.changePlace(1);
            }
        }
    }
}
class Bubble {
    constructor() {
        this._width = 1000;
        this._height = 180;
        this._fps = 60;
        this._canvas = document.getElementById('canvas');
        this._canvas.width = this._width;
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
    _createArray(count) {
        const array = [];
        for (let i = 0; i < count; i++) {
            let rnd = Math.round(Math.random() * (99 - 1) + 1);
            array[i] = new Block(this._ctx, rnd, i);
        }
        return array;
    }
    _draw() {
        setTimeout(tick.bind(this), 1000 / this._fps);
        function tick() {
            this._ctx.clearRect(0, 0, this._width, this._height);
            for (let i = 0; i < 10; i++) {
                this._numbers[i].draw();
            }
            setTimeout(tick.bind(this), 1000 / this._fps);
        }
    }
    _animation() {
        setTimeout(outer.bind(this, this._numbers.length - 1), 1);
        function outer(j) {
            if (j > 0) {
                setTimeout(inner.bind(this, 0, j), 1);
            }
        }
        function inner(i, j) {
            this._numbers[i].selectionAnimation();
            this._numbers[i + 1].selectionAnimation();
            if (this._numbers[i].number > this._numbers[i + 1].number) {
                setTimeout(() => {
                    this._numbers[i].movingRightAnimation();
                    this._numbers[i + 1].movingLeftAnimation();
                    setTimeout(() => {
                        let n = this._numbers[i];
                        this._numbers[i] = this._numbers[i + 1];
                        this._numbers[i + 1] = n;
                    }, 1000 / 2);
                    setTimeout(repeat.bind(this, i, j), 4000 / 2);
                }, 2000 / 2);
            }
            else {
                setTimeout(() => {
                    this._numbers[i].unselectionAnimation();
                    this._numbers[i + 1].unselectionAnimation();
                }, 1200 / 2);
                setTimeout(repeat.bind(this, i, j), 2400 / 2);
            }
        }
        function repeat(i, j) {
            i++;
            if (i < j) {
                setTimeout(inner.bind(this, i, j), 1);
            }
            else {
                this._numbers[j].color = '#98ff98';
                j--;
                if (j === 0)
                    this._numbers[j].color = '#98ff98';
                setTimeout(outer.bind(this, j), 1);
            }
        }
    }
}
const bubble = new Bubble();
