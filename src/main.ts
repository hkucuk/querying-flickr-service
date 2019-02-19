import { switchMap } from "rxjs/operators";
import FlickrService from "./flickr/FlickrService";
import { AjaxResponse, AjaxError } from "rxjs/ajax";
import Photos from "./flickr/Photos";
import { fromEvent } from "rxjs";
import BBox from "./flickr/bbox";


function $g(id:string):HTMLElement {
    return document.getElementById(id);
}

function getPhotos(evt: any) {
  $g("loading-messagge").classList.remove("d-none");
  $g("loading-messagge").classList.add("d-block");
  const currentBBox: BBox = new BBox(0, 0, 0, 0);
  const currentZoomLevel: number = 16;
  return new FlickrService().search(currentBBox, currentZoomLevel, evt.target.value, "100","1");
}

function showData(result: AjaxResponse) {
  const currentPhotoList = new Photos(result.response.photos);
  const totalPageCount = currentPhotoList.pages;
  const totalRowCount = Number(currentPhotoList.total);

  let html: string = "";
  currentPhotoList.photo.forEach(photo => {
    html += generateImage(photo.url_m, photo.title);
  });
  document.getElementById("image-container").innerHTML = html;
  
  $g("loading-messagge").classList.remove("d-block");
  $g("loading-messagge").classList.add("d-none");
}

function errorHandler(arg: AjaxError) {
  console.log(arg);
  $g("loading-messagge").classList.remove("d-block");
  $g("loading-messagge").classList.add("d-none");
}

function generateImage(url: string, title: string): string {
  var caruselHtml: string = `
    <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="${url}" alt="${title}">
        </a>
  </div>
    `;
  return caruselHtml;
}

fromEvent(document.getElementById("text-search"), "keyup")
  .pipe(switchMap(getPhotos))
  .subscribe(showData, errorHandler);
