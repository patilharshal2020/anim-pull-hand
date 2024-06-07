import { Component, ElementRef, ViewChild } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from '../categories-list/categories-list.component';
import { SharedService } from '../../services/shared.service';
import { CategoryItemsComponent } from '../category-items/category-items.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, MatSelect, MatOption, MatLabel, MatFormFieldModule, CommonModule, CategoriesListComponent, CategoryItemsComponent],
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
      transition('hidden => visible', animate('6s ease-out'))
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
      transition('waiting => walking', animate('3s ease-out')),
      transition('walking => waiting', animate('3s ease-out')),
      transition('walking => dragCategory', animate('6s ease-out'))
    ])
  ]
})
export class HomeComponent {
  @ViewChild('charactor') charactor!: ElementRef;
  categories: any;
  selectedCategory: string;
  charectorState: string = 'waiting';
  slideState: string = 'hidden';

  constructor(private sharedService: SharedService){};

  ngOnInit(){
    this.sharedService.getCategoriesList().subscribe(data => {
      this.categories = data;
    })
  }
  onCategorySelected() {
    this.sharedService.setSelectedCategory(this.selectedCategory);
    this.charectorState = 'walking';
    setTimeout(() => {
      this.slideState = 'visible';
      this.charectorState = 'dragCategory';
      this.charactor.nativeElement.classList.add('character-rev');
    }, 3000);
    setTimeout(()=>{
      this.charactor.nativeElement.classList.add('jump-character');
    },1000)
  }
}
