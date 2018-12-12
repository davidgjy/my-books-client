import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { LibraryComponent } from "./library.component";
import { CounterDirective } from './counter.directive';
import {CartSummaryComponent} from './cartSummary.component';

@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule],
  declarations: [LibraryComponent, CounterDirective, CartSummaryComponent],
  exports: [LibraryComponent]
})

export class LibraryModule { }
