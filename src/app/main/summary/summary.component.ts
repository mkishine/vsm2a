import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() title:string;
  @Input() type:string;
  @Input() data:[string, number][];
  @Input() selectionTitle:string;
  @Input() selectionValue:string;
  @Output() onSummarySelected = new EventEmitter<[string,string]>();

  private id:string;
  private control:FormControl;
  private formGroup:FormGroup;

  ngOnInit() {
    this.id = this.title + this.type;
    this.control = new FormControl();
    this.control.registerOnChange(() => {
      console.log(`registerOnChange: ${this.control.value}`);
    });
    let controls = {};
    controls[this.id] = this.control;
    this.formGroup = new FormGroup(controls);
  }

  private onChange() {
    // TODO: figure out how to get radio button value without timeout
    setTimeout(()=> {
      this.onSummarySelected.emit([this.title, this.control.value]);
    }, 0);
  }

  ngOnChanges(changes:SimpleChanges) {
    if (!this.control) {
      return;
    }
    if (!changes['selectionValue']) {
      return;
    }
    const newTitle = changes['selectionTitle'] ? changes['selectionTitle'].currentValue : this.title;
    const newValue = newTitle == this.title ? changes['selectionValue'].currentValue : '';
    if ( newValue == this.control.value ) {
      return;
    }
    this.control.reset(newValue);
  }
}