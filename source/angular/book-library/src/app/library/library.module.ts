import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ModelModule } from "../model/model.module";
import { LibraryComponent } from "./library.component";
@NgModule({
  imports: [ModelModule, BrowserModule, FormsModule],
  declarations: [LibraryComponent],
  exports: [LibraryComponent]
})
export class LibraryModule { }
