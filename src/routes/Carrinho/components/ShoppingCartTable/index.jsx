import {
  Table,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  Td,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { numberToBRL } from 'src/helpers/Format';
import * as CarrinhoService from 'src/services/carrinho';
import { useCarrinho } from 'src/context/carrinho-context';
import { MdRemoveShoppingCart } from 'react-icons/md';

export default function ShoppingCartTable() {
  const [Carrinho, dispatch] = useCarrinho();

  const handleDeleteOnClick = uuid => {
    dispatch({
      type: 'REMOVE',
      uuid: uuid,
    });
    CarrinhoService.removeProduto(uuid);
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
        {!!Carrinho &&
          Carrinho.map(
            ({
              uuid,
              image_url,
              name,
              price: { value, unit },
              amount,
              total,
            }) => (
              <Tr key={uuid}>
                <Td>
                  <Image src={image_url} maxW={24} />
                </Td>
                <Td>{name}</Td>
                <Td>
                  {numberToBRL(value)} / {unit}
                </Td>
                <Td>
                  {amount.toFixed(unit === 'kg' ? 3 : 0)}{' '}
                  {unit === 'kg' && 'kg'}
                </Td>
                <Td>{numberToBRL(total)}</Td>
                <Td>
                  <IconButton
                    aria-label="Remover produto."
                    icon={<MdRemoveShoppingCart />}
                    colorScheme="red"
                    onClick={() => handleDeleteOnClick(uuid)}
                  />
                </Td>
              </Tr>
            )
          )}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th></Th>
          <Th>
            {numberToBRL(
              Carrinho.reduce(
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
