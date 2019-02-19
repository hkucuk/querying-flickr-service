/*
  Servisten dönen tüm sonucu temsil eder.
*/
import Photo from "./Photo";

class Photos {
  page: number = 0;
  pages: number = 0;
  perpage: number = 0;
  total: string = "";
  photo?: Photo[];

  constructor(data: Partial<Photos>) {
    Object.assign(this, data);
  }

  toString() {
    let express = `${this.page},${this.perpage},${this.total},${this.pages}`;
    return express;
  }

  public GetEntitiById(id: string): Photo {
    var result = this.photo.find(p => {
      return p.id === id;
    });

    return result;
  }

  public GetEntitiesById(idList: string[]): Photo[] {
    var photoList: Array<Photo> = [];
    idList.forEach(id => {
      var findResult = this.GetEntitiById(id);
      if (findResult) photoList.push(findResult);
    });
    return photoList;
  }
}

export default Photos;