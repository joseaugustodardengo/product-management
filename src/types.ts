export interface IProduct {
  id: number,
  codSKU: number,
  name: string,
  category: 'Leite' | 'Doce' | 'Iogurte',
  price: string,
}