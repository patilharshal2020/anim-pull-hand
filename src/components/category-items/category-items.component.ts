import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-items.component.html',
  styleUrl: './category-items.component.css'
})
export class CategoryItemsComponent implements OnInit {

  selectedCategory: string;
  products$: Observable<any>;
  constructor(private sharedService: SharedService){}


  ngOnInit() {
    this.products$ = this.sharedService.productsByCategory$;
  }

}
