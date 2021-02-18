import { Component, Inject, Input } from '@angular/core';
import { Data } from './object';
import { DataService } from './app.service';
import { MatSelectChange } from '@angular/material/select';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './format-datepicker';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS, MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR } from '@angular/material/radio'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    DataService,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    }
  ]
})
export class AppComponent {
  title = 'queryLoad';
  backData: Data;
  textValue: string;
  public groupValue: boolean;

  constructor(public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() { }

  getDataFromAPI() {
    this.dataService.getData().subscribe(
      data => {
        console.log("Get Data: " + JSON.stringify(data));
      }
    )
  }

  setDataToAPI() {
    this.dataService.logString = 
    `{
         "in_meters" : "{${this.dataService.inputText}}", 
         "in_ch_id" : ${this.dataService.selectedChId},  
         "in_interval" : ${this.dataService.selectedInterval},   
         "in_round" : ${this.dataService.selectedRound},    
         "in_ts_start" : "${this.dataService.dateStart}",   
         "in_ts_end" : "${this.dataService.dateEnd}",    
         "in_group" : ${Boolean(this.groupValue)}    
     }`;

     console.log(this.dataService.logString)

    this.dataService.addData()
    .subscribe(
      data => { 
        return this.dialog.open(DialogDataDialog, {
          width: '600px', 
          data: {
            res: data,
            group: this.groupValue
          }
        }).afterClosed();
       }
    )
  }

  selectedChIdValue(event: MatSelectChange) {
    this.dataService.selectedChId = event.value;
  }

  selectedIntervalValue(event: MatSelectChange) {
    this.dataService.selectedInterval = event.value;
  }

  selectedRoundValue(event: MatSelectChange) {
    this.dataService.selectedRound = event.value;
  }

  onBlurInputText() {
    this.dataService.inputText = this.textValue;
  }

  selectedDateStart(event) {
    let selectedDate = event.value.toLocaleDateString();
    let formatSelectedDate = selectedDate.split('.');
    this.dataService.dateStart = formatSelectedDate[2] + '-' + formatSelectedDate[1] + '-' + formatSelectedDate[0];
    
  }

  selectedDateEnd(event) {
    let selectedDate = event.value.toLocaleDateString();
    let formatSelectedDate = selectedDate.split('.');
    this.dataService.dateEnd = formatSelectedDate[2] + '-' + formatSelectedDate[1] + '-' + formatSelectedDate[0];
    
  }
}

@Component({
  selector: 'dialog-data-dialog',
  templateUrl: '/dialog.data/dialog-data.html',
  styleUrls: ['/dialog.data/dialog-data.scss'],
})
export class DialogDataDialog {

  displayedColumns: string[] = ['m_id', 'ts', 'vlcf'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { res: any, group: boolean }) {}

  ngOninit() {
  }
}
