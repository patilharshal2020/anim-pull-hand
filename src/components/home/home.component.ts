import { Component, ElementRef, ViewChild } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from '../categories-list/categories-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, MatSelect, MatOption, MatLabel, MatFormFieldModule, CommonModule, CategoriesListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideIn', [
      state('hidden', style({
        right: '-100%'
      })),
      state('visible', style({
        right: '0'
      })),
      transition('hidden => visible', animate('8s ease-out'))
    ]),
    trigger('charectorAnimation', [
      state('waiting', style({
        right: 'calc(50%)'
      })),
      state('walking', style({
        right: '0'
      })),
      state('dragCategory', style({
        right: 'calc(100%)'
      })),
      transition('waiting => walking', animate('4s ease-out')),
      transition('walking => waiting', animate('4s ease-out')),
      transition('walking => dragCategory', animate('8s ease-out'))
    ])
  ]
})
export class HomeComponent {
  @ViewChild('charactor') charactor!: ElementRef;
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  selectedCategory: string;
  charectorState: string = 'waiting';
  slideState: string = 'hidden';

  onCategorySelected() {
    this.charectorState = 'walking';
    setTimeout(() => {
      this.slideState = 'visible';
      this.charectorState = 'dragCategory';
      this.charactor.nativeElement.classList.add('character-rev');
    }, 4000); // This should match the duration of the 'walking' animation
  }
}
