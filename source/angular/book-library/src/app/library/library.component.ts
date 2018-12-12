import {Component} from '@angular/core';
import {Book} from '../model/book.model';
import {BookRepository} from '../model/book.repository';
import {Cart} from '../model/cart.model';

@Component({
  selector: 'library',
  templateUrl: 'library.component.html'
})
export class LibraryComponent {
  public selectedOwnner = null;
  public booksPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: BookRepository,
              private cart: Cart) {
  }

  get books(): Book[] {
    let pageIndex = (this.selectedPage - 1) * this.booksPerPage;
    return this.repository.getBooks(this.selectedOwnner)
      .slice(pageIndex, pageIndex + this.booksPerPage);
  }

  get owners(): string[] {
    return this.repository.getOwners();
  }

  changeOwner(newOwner?: string) {
    this.selectedOwnner = newOwner;
    this.changePage(1);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.booksPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageCount(): number {
    return Math.ceil(this.repository
      .getBooks(this.selectedOwnner).length / this.booksPerPage);
  }

  // get pageNumbers(): number[] {
  //   return Array(Math.ceil(this.repository
  //     .getBooks(this.selectedOwnner).length / this.booksPerPage))
  //     .fill(0).map((x, i) => i + 1);
  // }

  addBookToCart(book: Book) {
    this.cart.addLine(book);
  }
}
