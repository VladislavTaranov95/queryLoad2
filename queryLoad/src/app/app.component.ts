import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Data } from './object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'queryLoad';
  data = new Data();

  newTodo: Data = {
    meters: "{1321}",
    chId: 2,
    interval: 1440,
    round: 4,
    tsStart: "2021-02-01",
    tsEnd: "2021-02-01",
    inGroup: false
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get('http://91.105.201.52:8099/queryLoadProfileMode')
    .subscribe(data => this.data = {
      meters: (data as any).meters,
      chId:  (data as any).chId,
      interval:  (data as any).interval,
      round:  (data as any).round,
      tsStart:  (data as any).tsStart,
      tsEnd:  (data as any).tsEnd,
      inGroup:  (data as any).inGroup
    });
  }
}
