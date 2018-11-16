import { Injectable } from "@angular/core";
import { Book } from "./book.model";
import { Observable, from } from "rxjs";

@Injectable()
export class StaticDataSource {
  private books: Book[] = [
    new Book(1, "Java 8实战", "JAVA", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(2, "Spring微服务实战", "MicroService", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(3, "Akka实战：快速构建高可用分布式应用", "BigData", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(4, "Docker实战", "DevOps", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(5, "Java虚拟机规范", "JAVA", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(6, "MySQL技术内幕：InnoDB存储引擎（第2版）", "Database", "ADC", "PAPER BOOK", "8F", "Digital"),
    new Book(7, "PHP7内核剖析", "PHP", "ADC", "PAPER BOOK", "8F", "Digital"),
    new Book(8, "响应式架构：消息模式Actor实现与Scala、Akka应用集成", "BigData", "ADC", "PAPER BOOK", "8F", "EDG"),
    new Book(9, "码出高效：Java开发手册", "JAVA", "KG", "PAPER BOOK", "", ""),
    new Book(10, "Spring Cloud与Docker微服务架构实战", "MicroService", "KG", "PAPER BOOK", "", "" )
  ];

  getBooks(): Observable<Book[]> {
    return from([this.books]);
  }
}
