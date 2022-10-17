import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    error$ = new Subject<boolean>();

    show(): void {
        this.error$.next(true);
    }

    hide(): void {
        this.error$.next(false);
    }
}