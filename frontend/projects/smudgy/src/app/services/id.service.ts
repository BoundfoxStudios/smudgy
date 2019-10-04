import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v1';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  generate(): string {
    return uuid();
  }
}
