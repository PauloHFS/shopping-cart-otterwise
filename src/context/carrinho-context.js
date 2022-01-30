import { createContext, useContext, useReducer } from 'react';

const CarrinhoContext = createContext(null);

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, dispatch] = useReducer(carrinhoReducer, []);

  return (
    <CarrinhoContext.Provider value={{ carrinho, dispatch }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);

const carrinhoReducer = (carrinho, action) => {
  switch (action.type) {
    case 'ADD':
      return [...carrinho, action.produto];
    case 'LOAD':
      return [...action.carrinho];
    case 'UPDATE':
      return carrinho.map(produto =>
        produto.uuid === action.produto.uuid ? action.produto : produto
      );
    case 'REMOVE':
      return carrinho.filter(({ uuid }) => uuid !== action.uuid);
    default:
      return carrinho;
  }
};
