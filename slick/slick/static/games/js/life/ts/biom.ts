class Biom{
    protected _name: string;
    protected _conditionLife: number;
    protected _conditionSaveFrom: number;
    protected _conditionSaveTo: number;
    protected _conditionReprod: number;

    constructor(name: string){
        this._name = name;
        switch(this._name){
            case 'sea':
                this._conditionLife = -2; // 2
                this._conditionSaveFrom = -1; // 1 - 2 
                this._conditionSaveTo = -1; // 
                this._conditionReprod = -1; // 2 
                break;
            case 'beach':
                this._conditionLife = 4; // 8
                this._conditionSaveFrom = -1; // 1 - 4
                this._conditionSaveTo = 1;
                this._conditionReprod = -1; // 2
                break;
            case 'forest':
                this._conditionLife = 16; // 20
                this._conditionSaveFrom = 0; // 2 - 3
                this._conditionSaveTo = 0; 
                this._conditionReprod = 0; // 3
                break;
            case 'mountain':
                this._conditionLife = -2; // 2
                this._conditionSaveFrom = 0; // 2 - 5
                this._conditionSaveTo = 2;
                this._conditionReprod = 0; // 3
                break;
        }
    }

    public getName(): string{
        return this._name;
    }

    public getConditionLife(): number{
        return this._conditionLife;
    }

    public getConditionSaveFrom(): number{
        return this._conditionSaveFrom;
    }

    public getConditionSaveTo(): number{
        return this._conditionSaveTo;
    }

    public getConditionReprod(): number{
        return this._conditionReprod;
    }

    public setConditionLife(value: number): void{
        this._conditionLife = value;
    }

    public setConditionSaveFrom(value: number): void{
        this._conditionSaveFrom = value;
    }

    public setConditionSaveTo(value: number): void{
        this._conditionSaveTo = value;
    }

    public setConditionReprod(value: number): void{
        this._conditionReprod = value;
    }
}