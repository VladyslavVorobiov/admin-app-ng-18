import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  #loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.#loadingSubject.asObservable();

  setLoader(loading: boolean) {
    this.#loadingSubject.next(loading);
  }
}
