import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';


@Injectable()
export class BooksService {
  private API_PATH = 'http://localhost:3000/api/books';

  constructor(private http: Http) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get(`${this.API_PATH}`).pipe(
      map((res) => {
        const resJson = res.json();

        if (resJson && resJson.status !== 'error') {
            return resJson || [];
        }
      }));
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post(`${this.API_PATH}`, book).pipe(
      map((res) => {
        const resJson = res.json();

        if (resJson && resJson.status !== 'error') {
            return resJson[0] || [];
        }
      }));
  }

  removeBook(bookIsbn: string): Observable<string> {
    return this.http.delete(`${this.API_PATH}/${bookIsbn}`, bookIsbn).pipe(
      map((res) => {
        const resJson = res.json();

        if (resJson && resJson.status !== 'error') {
            return resJson || [];
        }
      }));
  }
}
