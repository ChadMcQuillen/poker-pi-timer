import { Observable, timer } from 'rxjs';

export default class TimerTickService {
    constructor() {
        this.timerTickObservable = Observable.create(observer => {
            var timerSource = timer(1000, 1000);
            this.timerSubscription = timerSource.subscribe(t=> {
                observer.next(0);
            });
            return () => {
                this.timerSubscription.unsubscribe();
                this.timerSubscription = null;
            };
        });
    }
}
