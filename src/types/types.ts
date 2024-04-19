
export interface User {
    name: string;
    email: string;
    photo: string;
    gender: string;
    role: string;
    dob: Date;
    _id: string;
  }

export interface Product {
  name: string;
  price: number;
  stock: number;
  category: string;
  photo: string;
  _id: string;
}