import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  filterForm: FormGroup;

  allCategories = ['Наукова фантастика', 'Романтика', 'Антиутопія', 'Художня література', 'Класика'];
  sortByOptions = [
    { value: 'priceAsc', viewValue: 'За зростанням ціни' },
    { value: 'priceDesc', viewValue: 'За спаданням ціни' },
    { value: 'ratingDesc', viewValue: 'За рейтингом' }
  ];

  minPriceValue = 0;
  maxPriceValue = 20;
  minRatingValue = 0;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: ['All'],
      sortBy: ['priceAsc'],
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }

  onPriceSliderChange(value: number, type: 'min' | 'max') {
    if (type === 'min') {
      this.minPriceValue = value;
    } else {
      this.maxPriceValue = value;
    }
    this.emitFilters();
  }

  onRatingSliderChange(value: number) {
    this.minRatingValue = value;
    this.emitFilters();
  }

  clearFilters() {
    this.filterForm.reset({ category: 'All', sortBy: 'priceAsc' });
    this.minPriceValue = 0;
    this.maxPriceValue = 20;
    this.minRatingValue = 0;
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      category: this.filterForm.get('category')?.value,
      sortBy: this.filterForm.get('sortBy')?.value,
      minPrice: this.minPriceValue,
      maxPrice: this.maxPriceValue,
      minRating: this.minRatingValue,
    });
  }
}
