import { Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { numberToBRL } from 'src/helpers/Format';
import * as Carrinho from 'src/services/carrinho';
import { getProdutoByUUID } from 'src/services/produtos';
import ShoppingCartRow from '../ShoppingCartRow';

export default function ShoppingCartTable() {
  const [Produtos, setProdutos] = useState([]);

  useEffect(() => {
    const carrinho = Carrinho.getCarrinho();
    const produtos = carrinho.map(({ uuid, amount }) => {
      const produto = getProdutoByUUID(uuid);

      return {
        ...produto,
        amount: amount,
        total: amount * produto.price.value,
      };
    });
    setProdutos(produtos);
  }, []);

  const handleDeleteOnClick = uuid => {
    Carrinho.removeProduto(uuid);
    setProdutos(Produtos.filter(produto => produto.uuid !== uuid));
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Nome</Th>
          <Th>Preço</Th>
          <Th>Quantidade</Th>
          <Th>Total</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {!!Produtos &&
          Produtos.map(produto => (
            <ShoppingCartRow
              key={produto.uuid}
              product={produto}
              deleteOnClick={() => handleDeleteOnClick(produto.uuid)}
            />
          ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th>
            {numberToBRL(
              Produtos.reduce(
                (previous, current) => previous + current.total,
                0
              )
            )}
          </Th>
          <Th></Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
