import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root', 
})
export class ProductsService {
 private products: Product[] = [
  {
    id: '1',
    name: 'Автостопом по галактике',
    description: 'Комедийная научно-фантастическая серия Дугласа Адамса.',
    price: 15.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    category: 'Научная фантастика',
    rating: 4.5,
    popularity: 100,
    releaseDate: new Date('1979-10-12'),
  },
  {
    id: '2',
    name: 'Гордость и предубеждение',
    description: 'Роман нравов, написанный Джейн Остин.',
    price: 12.50,
    imageUrl: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
    category: 'Романтика',
    rating: 4.8,
    popularity: 90,
    releaseDate: new Date('1813-01-28'),
  },
  {
    id: '3',
    name: '1984',
    description: 'Дистопический научно-фантастический роман Джорджа Оруэлла.',
    price: 10.00,
    imageUrl: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    category: 'Антиутопия',
    rating: 4.7,
    popularity: 120,
    releaseDate: new Date('1949-06-08'),
  },
  {
    id: '4',
    name: 'Убить пересмешника',
    description: 'Роман Харпер Ли, опубликованный в 1960 году.',
    price: 14.75,
    imageUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    category: 'Художественная литература',
    rating: 4.9,
    popularity: 110,
    releaseDate: new Date('1960-07-11'),
  },
  {
    id: '5',
    name: 'Великий Гэтсби',
    description: 'Роман 1925 года американского писателя Ф. Скотта Фицджеральда.',
    price: 11.20,
    imageUrl: 'https://covers.openlibrary.org/b/id/7352167-L.jpg',
    category: 'Классика',
    rating: 4.6,
    popularity: 85,
    releaseDate: new Date('1925-04-10'),
  },
  {
    id: '6',
    name: 'Мастер и Маргарита',
    description: 'Роман Михаила Булгакова с элементами фантастики и философии.',
    price: 13.40,
    imageUrl: 'https://covers.openlibrary.org/b/id/8231852-L.jpg',
    category: 'Классика',
    rating: 4.8,
    popularity: 130,
    releaseDate: new Date('1967-01-01'),
  },
  {
    id: '7',
    name: 'Преступление и наказание',
    description: 'Роман Фёдора Достоевского о моральной борьбе и искуплении.',
    price: 14.00,
    imageUrl: 'https://covers.openlibrary.org/b/id/8231857-L.jpg',
    category: 'Классика',
    rating: 4.9,
    popularity: 125,
    releaseDate: new Date('1866-01-01'),
  },
  {
    id: '8',
    name: 'Сумерки',
    description: 'Роман Стефани Майер о любви между человеком и вампиром.',
    price: 9.99,
    imageUrl: 'https://covers.openlibrary.org/b/id/8225631-L.jpg',
    category: 'Романтика',
    rating: 4.1,
    popularity: 95,
    releaseDate: new Date('2005-10-05'),
  },
  {
    id: '9',
    name: 'Гарри Поттер и философский камень',
    description: 'Начало приключений Гарри Поттера в школе волшебства Хогвартс.',
    price: 16.50,
    imageUrl: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    category: 'Фэнтези',
    rating: 4.9,
    popularity: 200,
    releaseDate: new Date('1997-06-26'),
  },
  {
    id: '10',
    name: 'Властелин колец: Братство кольца',
    description: 'Эпическое фэнтези Дж. Р. Р. Толкина.',
    price: 17.00,
    imageUrl: 'https://covers.openlibrary.org/b/id/8235111-L.jpg',
    category: 'Фэнтези',
    rating: 4.8,
    popularity: 180,
    releaseDate: new Date('1954-07-29'),
  },
];
  
  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter((p) => p.category === category));
  }
}
