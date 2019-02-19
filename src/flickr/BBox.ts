/*
 Coğrafi extent bilgisini tutar
*/
class BBox {
    _minX: number;
    _minY: number;
    _maxX: number;
    _maxY: number;
    constructor(minX: number, minY: number, maxX: number, maxY: number) {
      this._minX = minX;
      this._minY = minY;
      this._maxX = maxX;
      this._maxY = maxY;
    }
    toString() {
      let express= `${this._minX},${this._minY},${this._maxX},${this._maxY}`;
      return express
    }
  }
  
  export default BBox;