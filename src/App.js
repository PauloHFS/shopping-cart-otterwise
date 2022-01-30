import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/HomePage';
import Carrinho from './routes/Carrinho';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CarrinhoProvider } from './context/carrinho-context';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/carrinho"
          element={
            <CarrinhoProvider>
              <Carrinho />
            </CarrinhoProvider>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </BrowserRouter>
  );
}

export default App;
