import { Observable } from 'rxjs';

export default class TimerTickService {
    constructor() {
        this.timerTickObservable = Observable.create(observer => {
            let timer = Observable.timer(1000, 1000);
            this.timerSubscription = timer.subscribe(t=> {
                observer.next(0);
            });
            return () => {
                this.timerSubscription.unsubscribe();
                this.timerSubscription = null;
            };
        });
    }
}
