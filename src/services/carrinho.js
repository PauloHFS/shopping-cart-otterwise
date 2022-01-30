export const getCarrinho = () => JSON.parse(localStorage.getItem('carrinho'));

export const setCarrinho = carrinho =>
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

export const addProduto = produto => {
  const carrinho = getCarrinho();
  if (carrinho === null) {
    setCarrinho([produto]);
  } else if (carrinho.some(({ uuid }) => uuid === produto.uuid)) {
    setCarrinho(
      carrinho.map(({ uuid, amount }) => {
        return {
          uuid,
          amount: uuid === produto.uuid ? amount + produto.amount : amount,
        };
      })
    );
  } else {
    setCarrinho([...carrinho, produto]);
  }
};

export const removeProduto = uuid => {
  const carrinho = getCarrinho();
  if (carrinho !== null) {
    localStorage.setItem(
      'carrinho',
      JSON.stringify(carrinho.filter(produto => produto.uuid !== uuid))
    );
  }
};

export const changeProductAmountByUUID = (uuid, newAmount) => {
  const carrinho = getCarrinho();

  if (carrinho !== null) {
    setCarrinho(
      carrinho.map(({ amount, ...rest }) => {
        return { ...rest, amount: rest.uuid === uuid ? newAmount : amount };
      })
    );
  }
};
