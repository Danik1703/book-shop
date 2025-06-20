export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  popularity: number;
  releaseDate: Date;
  author?: string;
}