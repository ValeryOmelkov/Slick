class PerlinNoise{
    protected _dimension: number = 2;
    protected _octaves: number = 1;
    protected _tile: Array<number>;
    protected _unbias: boolean = false;
    protected _scaleFactor: number = 2 * Math.pow(this._dimension, -0.5);
    public _gradient = new Map();

    constructor(tile: Array<number>, octaves?: number, unbias?: boolean){
        this._tile = tile;
        this._tile.push(0, 0);
        this._octaves = octaves ? octaves : this._octaves;
        this._unbias = unbias ? unbias : this._unbias;
    }

    protected _generateGradient(): Array<number>{
        let randomPoint: Array<number> = [];
        for (let i: number = 0; i < this._dimension; i++){
            randomPoint.push(this._randomGauss(0, 1));
        }
        
        let sum: number;
        let scale = randomPoint.map(i => sum += Math.pow(i, 2), sum = 0).reverse()[0]
        scale = Math.pow(scale, -0.5);

        let vector: Array<number> = [];
        for(let coord of randomPoint){
            vector.push(coord * scale);
        }

        return vector;
    }

    protected _getPlainNoise(point: Array<number>): number{
        let gridCoords: Array<Array<number>> = [];
        for(let coord of point){
            const minCoord = Math.floor(coord);
            const maxCoord = minCoord + 1;
            gridCoords.push([minCoord, maxCoord]);
        }

        let product: Array<Array<number>> = [];
        for(let item of gridCoords[0]){
            product.push([item, gridCoords[1][0]])
            product.push([item, gridCoords[1][1]])
        }

        let dots: Array<number> = [];
        for(let gridPoint of product){
            let exist: boolean = false;
            for(let keys of this._gradient.keys()){
                if(keys && gridPoint[0] === keys[0] && gridPoint[1] === keys[1]){
                    exist = true;
                    break;
                }
            }
            if(!exist){
                this._gradient.set(gridPoint, this._generateGradient());
            }

            let gradient: Array<number> = []
            for(let keys of this._gradient.keys()){
                if(keys && gridPoint[0] === keys[0] && gridPoint[1] === keys[1]){
                    gradient = this._gradient.get(keys);
                    break;
                }
            }

            let dot: number = 0;
            for(let i: number = 0; i < this._dimension; i++){
                dot += gradient[i] * (point[i] - gridPoint[i]);
            }
            dots.push(dot);
        }

        let dim: number = this._dimension;
        while(dots.length > 1){
            dim -= 1;
            const s: number = this._smoothstep(point[dim] - gridCoords[dim][0])

            const nextDots: Array<number> = [];
            while(dots.length > 0){
                nextDots.push(this._lerp(s, dots.shift(), dots.shift()));
            }
            dots = nextDots;
        }

        return dots[0] * this._scaleFactor;
    }

    public getPointNoise(point: Array<number>): number{
        let ret: number = 0;
        for(let oct: number = 0; oct < this._octaves; oct++){
            const octTwo: number = 1 << oct;
            const newPoint: Array<number> = [];
            for(let i: number = 0; i < point.length; i++){
                let coord: number = point[i];
                coord *= octTwo;
                if(this._tile[i]){
                    coord %= this._tile[i] * octTwo;
                }
                newPoint.push(coord);
            }
            ret += this._getPlainNoise(newPoint) / octTwo;
        }
        ret /= 2 - Math.pow(2, (1 - this._octaves));

        if(this._unbias){
            let r: number = (ret + 1) / 2;
            for(let i: number = 0; i < Math.floor(this._octaves / 2 + 0.5); i++){
                r = this._smoothstep(r);
            }
            ret = r * 2 - 1;
        }

        return ret;
    }

    protected _randomGauss(mean: number, stdDev: number): number{
        const u1 = 1 - Math.random();
        const u2 = 1 - Math.random();
        const stdNormal = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2)
        const randNormal = mean + stdDev * stdNormal;
        return randNormal;
    }

    protected _smoothstep(t: number): number{
        return t * t * (3 - 2 * t);
    }

    protected _lerp(t: number, a: number, b: number): number{
        return a + t * (b - a);
    }
}