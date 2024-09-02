
export interface Product {
    productId: string;
    name: string;
    description: string;
    price: string;
    quantity: number;
    rozmiar: string;
    kolor: string;
    iloscOdwiedzin: number;
    dataDodania: string; 

    userId?: string;
    markaId?: string;
    categoryId?: string;
    subcategoryId?: string;
    subsubcategoryId?: string;
}
