import { Component } from "@angular/core";
import { Book } from "../model/book.model";
import { BookRepository } from "../model/book.repository";

@Component({
  selector: "library",
  templateUrl: "library.component.html"
})
export class LibraryComponent {
  constructor(private repository: BookRepository) { }
  get books(): Book[] {
    return this.repository.getBooks();
  }
  get owners(): string[] {
    return this.repository.getOwners();
  }
}
