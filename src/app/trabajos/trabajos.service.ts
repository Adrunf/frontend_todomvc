import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWork } from './trabajos.model';

//import { SERVER_API_URL } from 'app/app.constants';
//import { createRequestOption } from 'app/shared/util/request-util';
//import { IMaterial } from 'app/shared/model/material.model';

type EntityResponseType = HttpResponse<IWork>;
type EntityArrayResponseType = HttpResponse<IWork[]>;
// decorador Injectable

@Injectable({ providedIn: 'root' })
export class TrabajosService {
  public resourceUrl = 'http://localhost:5000/' + 'works';

  constructor(protected http: HttpClient) { }
  //Añadir un registro
  create(work: IWork): Observable<EntityResponseType> {
    return this.http.post<IWork>(this.resourceUrl, work, { observe: 'response' });
  }
  //Obtener todos los registro
  getAll(): Observable<EntityResponseType> {
    return this.http.get<IWork>(this.resourceUrl, { observe: 'response' });
  }
  //Actualizar un registro
  update(id:number, work: IWork): Observable<EntityResponseType> {
    return this.http.put<IWork>(`${this.resourceUrl}/${id}`, work, { observe: 'response' });
  }
  //Buscar un registro en especifico
  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IWork>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  //Eliminar un registro
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text'});
  }
}