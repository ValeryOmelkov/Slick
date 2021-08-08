class Cell {
    protected _age: number = 0;
    protected _yearOfDeath: number = 4;
    protected _saveFrom: number = 2;
    protected _saveTo: number = 3;
    protected _reprod: number = 3;
    protected _color: string;
    protected _colorsByYear: Array<string>;
    protected _biom: Biom;

    constructor(old?: number, biom?: Biom){
        this._yearOfDeath = old ? old : this._yearOfDeath;
        this._colorsByYear = this._createColors();
        if(biom){
            this._biom = biom;
            this._yearOfDeath += this._biom.getConditionLife();
            this._saveFrom += this._biom.getConditionSaveFrom();
            this._saveTo += this._biom.getConditionSaveTo();
            this._reprod += this._biom.getConditionReprod();
        }
    }

    protected _createColors(): Array<string>{
        const colors: Array<string> = [];
        const step: number = Math.floor(200 / this._yearOfDeath);
        let red: number = 0;
        let green: number = 200;
        colors.push(`#00C800`);
        for(let i: number = 1; i < this._yearOfDeath; i++){
            red += step;
            green -= step;
            colors.push(`#${red.toString(16).toUpperCase()}${green.toString(16).toUpperCase()}00`);
        }
        colors.push(`#C80000`);
        return colors;
    }

    public getColor(): string{
        return this._colorsByYear[this._age];
    }

    public addAge(): void{
        this._age++;
    }

    public getYearOfDeath(): number{
        return this._yearOfDeath;
    }

    public getSaveFrom(): number{
        return this._saveFrom;
    }

    public getSaveTo(): number{
        return this._saveTo;
    }

    public getReprod(): number{
        return this._reprod;
    }

    public checkOld(): boolean{
        return this._age > this._yearOfDeath;
    }
}