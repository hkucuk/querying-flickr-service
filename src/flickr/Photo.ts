/*
Servisten dönen heri bir fotoğrafı temsil eder.
*/
class Photo {
    id: string = '';
    owner: string= '';
    title: string= '';
    license: string= '';
    dateupload: string= '';
    ownername: string= '';
    accuracy: string= '';
    url_t: string= '';
    height_t: string= '';
    width_t: string= '';
    url_s: string= '';
    height_s: string= '';
    width_s: string= '';
    url_m: string= '';
    height_m: string= '';
    width_m: string= '';
    latitude: string= '';
    longitude: string= '';

    constructor(data: Partial<Photo>) {
        //Json nesnesinin değerlerini bu sınıfa ata
        Object.assign(this, data);
    }
}
export default Photo