import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { CountryData } from "../country-data";
import { NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-get-data',
  standalone: true,
  imports: [UpperCasePipe, NgIf],
  templateUrl: './get-data.component.html',
  styleUrl: './get-data.component.css'
})
export class GetDataComponent implements OnInit{
  @Input() countryData!: CountryData;
  constructor() { }
  ngOnInit(): void {
    console.log(this.countryData)
  }

}
