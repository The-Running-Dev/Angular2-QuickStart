import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Car } from '../models/index';

@Injectable()
export class CarService {
    constructor(
        private http: Http
    ) {
    }

    public GetCars(): Observable<Car[]> {
        return this.http.get('./app/data/cars.json')
            .map(response => <Car[]>(response.json().data))
            .catch((error: any) => this.HandleHttpError(error));
    }

    private ExtractData(res: Response): any {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad Response Status: ' + res.status);
        }

        let body = res.json();

        return body || {};
    }

    private HandleHttpError(response: Response) {
        let handledResponse = {};

        try {
            if (response.status == 404) {
                handledResponse = {
                    code: 404,
                    message: 'Data Not Found'
                };
            }
            else if (response.status == 500) {
                let responseJson = <any>response.json();

                handledResponse = {
                    IsError: true,
                    Message: responseJson.Message
                };
            }
            else {
                let responseJson = <any>response.json();

                handledResponse = {
                    IsError: true,
                    Message: (responseJson.Message) ? responseJson.Message : response.json()
                };
            }
        } catch (jsonError) {
            handledResponse = {
                code: -1,
                message: 'Something Went Wrong.'
            };
        }

        return Observable.throw(handledResponse);
    }
}