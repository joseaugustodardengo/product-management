import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import api from "../services/api";
import { IProduct } from "../types";

interface IProductsProviderProps {
  children: ReactNode;
}

interface IProductsContextData {
  products: IProduct[];
  addProduct: (product: IProduct) => Promise<void>;
  removeProduct: (id: number) => void;
}

const ProductsContext = createContext({} as IProductsContextData);

export function ProductsProvider({ children }: IProductsProviderProps) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get("products").then((response) => setProducts(response.data));
  }, []);

  async function addProduct(product: IProduct) {
    try {
      const response = await api.post("/products", {
        ...product
      });
      setProducts([...products, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function removeProduct(id: number) {
    await api.delete(`/products/${id}`);

    const productsFiltered = products.filter((product) => product.id !== id);

    setProducts(productsFiltered);
  }

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, removeProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  return context;
}
