import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';

import { StockValidators } from './stock-inventory.validators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { StockInventoryService } from '../../services/stock-inventory.service';

import { Product, Item } from '../../models/product.interface';

@Component({
  selector: 'stock-inventory',
  styleUrls: ['stock-inventory.component.scss'],
  template: `
    <div class="stock-inventory">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <stock-branch
          [parent]="form">
        </stock-branch>

        <stock-selector
          [parent]="form"
          [products]="products"
          (added)="addStock($event)">
        </stock-selector>

        <stock-products
          [parent]="form"
          [map]="productsMap"
          (removed)="removeStock($event)">
        </stock-products>

        <div class="stock-inventory__price">
          Total: {{ total | currency:'USD':true }}
        </div>

        <div class="stock-inventory__buttons">
          <button 
            type="submit"
            [disabled]="form.invalid">
            Order stock
          </button>
        </div>

      </form>
    </div>
  `
})
export class StockInventoryComponent implements OnInit {

  products: Product[];

  total: number;

  productsMap: Map<number, Product>;

  form = this.fb.group({
    store: this.fb.group({
      branch: [
        '',
        [Validators.required, StockValidators.checkBranch]
      ],
      code: ['', Validators.required]
    }),
    selector: this.createStock({}),
    stock: this.fb.array([])
  }, { validator: StockValidators.checkStockExists });

  constructor(
    private fb: FormBuilder,
    private stockService: StockInventoryService
  ) {}

  ngOnInit() {
    const cart = this.stockService.getCartItems();
    const products = this.stockService.getProducts();

    Observable
      .forkJoin(cart, products)
      .subscribe(([cart, products]: [Item[], Product[]]) => {

        const myMap = products
          .map<[number, Product]>(product => [product.id, product]);

        this.productsMap = new Map<number, Product>(myMap);
        this.products = products;
        cart.forEach(item => this.addStock(item));

        this.calculateTotal(this.form.get('stock').value);
        this.form.get('stock')
          .valueChanges.subscribe(value => this.calculateTotal(value));

      });

  }

  // validateBranch(control: AbstractControl) {
  //   return null;
  //   // return this.stockService
  //   //   .checkBranchId(control.value)
  //   //   .map((response: boolean) => response ? null : { unknownBranch: true });
  // }

  calculateTotal(value: Item[]) {
    const total = value.reduce((prev, next) => {
      return prev + (next.quantity * this.productsMap.get(next.product_id).price);
    }, 0);
    this.total = total;
  }

  createStock(stock) {
    return this.fb.group({
      product_id: parseInt(stock.product_id, 10) || '',
      quantity: stock.quantity || 10
    });
  }

  addStock(stock) {
    const control = this.form.get('stock') as FormArray;
    control.push(this.createStock(stock));
  }

  removeStock({ group, index }: { group: FormGroup, index: number }) {
    const control = this.form.get('stock') as FormArray;
    control.removeAt(index);
  }

  onSubmit() {
    console.log('Submit:', this.form.value);
  }
}
