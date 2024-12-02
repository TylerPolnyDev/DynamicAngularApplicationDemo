import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapSvgComponent } from "./map-svg/map-svg.component";
import { WorldBankApiService} from "./world-bank-api.service";
import { CountryData } from "./country-data";
import {NgIf, UpperCasePipe} from "@angular/common";
import {GetDataComponent} from "./get-data/get-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MapSvgComponent, NgIf, UpperCasePipe, GetDataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private api: WorldBankApiService) {}
  title = 'Interactive-World-Map';
  selectedId: string = 'us';
  countryData!: CountryData;


  async handleClick(target: any): Promise<void> {
    this.selectedId = target.target.id;
    console.log('ID: ', this.selectedId);
    if (this.selectedId == ''){
      this.countryData = {
        selectedId: '',
        name: 'select a country to begin',
        capital: '',
        region: '',
        income: '',
        longitude: 0,
        latitude: 0
      };
    }else{
      try {
        const data: any = await this.api.search(this.selectedId).toPromise();
        this.countryData = {
          selectedId: this.selectedId,
          name: data[1][0].name,
          capital: data[1][0].capitalCity,
          region: data[1][0].region.value,
          income: data[1][0].incomeLevel.value,
          longitude: data[1][0].longitude,
          latitude: data[1][0].latitude
        };
        console.log('country data', this.countryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  ngOnInit():  void{
  }



}
