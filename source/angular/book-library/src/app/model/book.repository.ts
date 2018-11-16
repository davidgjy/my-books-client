import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class BookRepository {
  private books: Book[] = [];
  private owners: string[] = [];

  constructor(private dataSource: StaticDataSource) {
    dataSource.getBooks().subscribe(data => {
      this.books = data;
      this.owners = data.map(p => p.owner).filter((c, index, array) => array.indexOf(c) === index).sort();
    });
  }

  getBooks(owner: string = null): Book[] {
    return this.books.filter(p => owner == null || p.owner === owner);
  }

  getBook(id: number): Book {
    return this.books.find(p => p.id === id);
  }

  getOwners(): string[] {
    return this.owners;
  }
}
