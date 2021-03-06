class Level{
    public level: Array<Array<number>>;
    protected _ctx: any;

    constructor(context: any){
        this._ctx = context;
        this.level = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,0,1,1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,],
            [1,1,0,0,1,1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,],
            [1,1,0,0,1,1,0,0,0,0,2,2,2,2,2,2,0,0,0,0,1,1,0,0,1,1,],
            [1,1,0,0,1,1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,],
            [1,1,0,0,1,1,0,0,0,0,0,0,2,2,0,0,0,0,0,0,1,1,0,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,],
            [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,],
            [1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1,1,],
            [1,1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1,1,],
            [1,1,0,4,4,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,4,4,0,1,1,],
            [1,1,0,4,4,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,4,4,0,1,1,],
            [1,1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1,1,],
            [1,1,0,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,0,1,1,],
            [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
        ]
    }

    public getLevel(): any{
        const array: Array<Array<any>> = [];
        for(let j = 0; j < this.level.length; j++){
            const local: Array<any> = [];
            for(let i = 0; i < 26; i++){
                switch(this.level[j][i]){
                    case 0: 
                        local.push(undefined);
                        break;
                    case 1: 
                        local.push(new Brick(this._ctx, {x: i + 4, y: j}, 27));
                        break;
                    case 2: 
                        local.push(new Steel(this._ctx, {x: i + 4, y: j}, 27));
                        break;
                    case 3: 
                        local.push(new Water(this._ctx, {x: i + 4, y: j}, 27));
                        break;
                    case 4: 
                        local.push(new Bush(this._ctx, {x: i + 4, y: j}, 27));
                        break;
                }
            }
            array.push(local);
        }

        return array;
    }
}