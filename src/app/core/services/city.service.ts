import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIs } from '../constants/apis';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  city: Object;
  constructor(public http: HttpClient) { }

  createCity(form: any) {
    console.log(form)
    return this.http.post(APIs.city, { form: form });
  }

  cities() {
    return this.http.get(APIs.city);
  }

  deleteCity(id: any) {
    return this.http.delete(APIs.city + '/' + id)
  }

  editCity(id: any, form: Object) {
    return this.http.put(APIs.city + '/' + id, form);
  }
}
