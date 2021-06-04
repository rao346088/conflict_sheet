import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnChanges {
 
  @Input() showSpinner : boolean;
  constructor() { }

  ngOnChanges(changes : SimpleChanges): void {
    console.log("spinner",changes)
  }

}
