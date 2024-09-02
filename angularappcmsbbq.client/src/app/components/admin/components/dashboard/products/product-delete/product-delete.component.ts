import { Component, Inject, OnInit } from '@angular/core';
import { ProductsHandlerService } from '../../../../../../services/products/products-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../../../../models/product';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    public productsService: ProductsHandlerService,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }

  ngOnInit(): void {
  }


}
