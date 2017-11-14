import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating: number;
  starWidth: number;
  constructor() { }

  ngOnChanges(): void {
    this.rating = this.rating * 86 / 5;
  }

}
