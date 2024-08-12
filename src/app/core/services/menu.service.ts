import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  #openedSubject = new BehaviorSubject<boolean>(false);
  public opened$ = this.#openedSubject.asObservable();

  openMenu(opened: boolean) {
    this.#openedSubject.next(opened);
  }
}
