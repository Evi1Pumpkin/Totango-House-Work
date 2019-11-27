import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book } from '../../models/book.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/store-reducers';
import { getBooks } from 'src/app/reducers/books.reducer';
import * as BookActions from '../../actions/book.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.less']
})
export class AddBookComponent implements OnInit {
  reactiveForm: FormGroup;
  authorsError: string;
  isbnError: string;
  titleError: string;
  descriptionError: string;
  publishDateError: string;
  thumbnailUrlError: string;
  genreError: string;
  priceError: string;
  books: Array<Book>;
  error: string;
  newBook: Book = {
    isbn: '',
    title: '',
    authors: [],
    publishedDate: '',
    description: '',
    thumbnailUrl: '',
    genre: '',
    price: 0
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBookComponent>,
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildForm();
    this.store.select(getBooks).subscribe(books => (this.books = books));
  }

  buildForm() {
    this.reactiveForm = this.formBuilder.group({
      authors: [null, Validators.required],
      title: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+')
        ])
      ],
      isbn: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+')
        ])
      ],
      description: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      thumbnailUrl: [
        '',
        Validators.compose([])
      ],
      genre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+')
        ])
      ],
      price: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+')
        ])
      ],
      publishDate: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(0?[1-9]|[12]\d|3[01])\-(0?\d|1[12])\-(\d?\d?\d?\d)$/
          )
        ])
      ]
    });

    this.reactiveForm.valueChanges.subscribe(data => this.validateForm());
  }

  validateForm() {
    this.authorsError = '';
    this.titleError = '';
    this.publishDateError = '';
    this.isbnError = '';
    this.descriptionError = '';
    this.thumbnailUrlError = '';
    this.genreError = '';
    this.priceError = '';

    const title = this.reactiveForm.get('title');
    const authors = this.reactiveForm.get('authors');
    const publishDate = this.reactiveForm.get('publishDate');
    const isbn = this.reactiveForm.get('isbn');
    const description = this.reactiveForm.get('description');
    const thumbnailUrl = this.reactiveForm.get('thumbnailUrl');
    const genre = this.reactiveForm.get('genre');
    const price = this.reactiveForm.get('price');

    if (authors.invalid && authors.dirty) {
      this.authorsError = 'Author is required';
    }

    {
      const result = this.books.filter(
        book =>
          book.isbn.toLowerCase().trim() === isbn.value.toLowerCase().trim()
      );
      if (result.length >= 1) {
        isbn.setErrors({ isbnValid: true });
      }
    }

    if (isbn.invalid && isbn.dirty) {
      if (isbn.errors.required) {
        this.isbnError = 'The isbn is required';
      }
      if (isbn.errors.isbnValid) {
        this.isbnError = 'This isbn code already exists';
      }
      if (isbn.errors.pattern) {
        this.isbnError = 'No special characters are allowed';
      }
    }

    if (title.invalid && title.dirty) {
      if (title.errors.required) {
        this.titleError = 'The title is required';
      }
      if (title.errors.pattern) {
        this.titleError = 'No special characters are allowed';
      }
    }

    if (publishDate.invalid && publishDate.dirty) {
      if (publishDate.invalid && publishDate.dirty) {
        this.publishDateError = 'Please enter data like YYYY-MM-DD';
      }
      if (publishDate.errors.pattern) {
        this.publishDateError =
          'Date should be in valid date format YYYY-MM-DD';
      }
    }
  }

  onSubmit(value: any) {
    value.authors = [value.authors];

    this.store.dispatch(new BookActions.Add(value));
    this.router.navigate(['/']);  }
}
