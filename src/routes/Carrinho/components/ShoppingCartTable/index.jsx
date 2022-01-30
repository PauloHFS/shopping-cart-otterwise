import { Table, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useCarrinho } from 'src/context/carrinho-context';
import { numberToBRL } from 'src/helpers/Format';
import ShoppingCartRowTable from '../ShoppingCartRowTable';

export default function ShoppingCartTable() {
  const { carrinho } = useCarrinho();

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
        {!!carrinho &&
          carrinho.map(product => (
            <ShoppingCartRowTable product={product} key={product.uuid} />
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
              carrinho.reduce(
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
