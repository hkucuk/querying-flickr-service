import { Observable, from } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import BBox from "./bbox";
import { mergeMap, delay } from "rxjs/operators";

class FlickrService {
  apiKey = "b2d13e9471ee6925208023ba7c852c74";
  apiRoot = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
  resultFields = "geo,owner_name,date_upload,license,url_t,url_s,url_m,title";
  privacyFilter = "1";
  hasGeo = "1";
  format = "json";

  private getAccuracy(zoomLevel: number): number {
    /*
      World level is 1
      Country is ~3
      Region is ~6
      City is ~11
    Street is ~16
    */
    if (zoomLevel >= 1 && zoomLevel <= 3) return 1;
    else if (zoomLevel >= 4 && zoomLevel <= 6) return 3;
    else if (zoomLevel >= 7 && zoomLevel <= 11) return 6;
    else if (zoomLevel >= 12 && zoomLevel <= 16) return 11;
    else return 16;
  }
  public search(
    box?: BBox,
    zoomLevel: number = 16,
    query?: string,
    perPage: string = "250",
    pageIndex: string = "1"
  ): Observable<AjaxResponse> {

    var accuracy = this.getAccuracy(zoomLevel);
    let apiURL = `${this.apiRoot}&has_geo=${
      this.hasGeo
    }&accuracy=${accuracy}&extras=${this.resultFields}&privacy_filter=${
      this.privacyFilter
    }&per_page=${perPage}&page=${pageIndex}&api_key=${this.apiKey}&format=${
      this.format
    }&nojsoncallback=1`;

    if (box != null) apiURL = apiURL + "&bbox=" + box.toString();

    if (query != null) apiURL = apiURL + "&text=" + query;

    return ajax(apiURL).pipe();
  }

  public getAllPhotos(
    pageNumbers: number[],
    box?: BBox,
    zoomLevel: number = 16,
    query?: string,
    perPage: string = "250"
  ): Observable<AjaxResponse> {
    return from(pageNumbers).pipe(
      mergeMap(
        pageNumber =>
          <Observable<AjaxResponse>>(
            this.search(box, zoomLevel, query, perPage, pageNumber.toString())
          )
      )
    );
  }
}
export default FlickrService;