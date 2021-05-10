import { BrowserRouter as Router } from 'react-router-dom';
import { ProductsProvider } from './hooks/useProducts';

import Routes from './routes';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <Routes />
      </ProductsProvider>
    </Router>
  );
}

export default App;
