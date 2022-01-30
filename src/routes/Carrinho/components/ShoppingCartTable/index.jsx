import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { MdRemoveShoppingCart } from 'react-icons/md';
import * as Carrinho from 'src/services/carrinho';
import { getProdutoByUUID } from 'src/services/produtos';
import { numberToBRL } from 'src/helpers/Format';

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
        {!!Produtos
          ? Produtos.map(
              ({
                uuid,
                image_url,
                name,
                price: { value, unit },
                amount,
                total,
              }) => (
                <Tr>
                  <Td>
                    <Image src={image_url} maxW={24} />
                  </Td>
                  <Td>{name}</Td>
                  <Td>{numberToBRL(value)}</Td>
                  <Td>
                    {amount.toFixed(3)} ({unit})
                  </Td>
                  <Td>{numberToBRL(total)}</Td>
                  <Td>
                    <IconButton
                      icon={<MdRemoveShoppingCart />}
                      colorScheme="red"
                      onClick={() => handleDeleteOnClick(uuid)}
                    />
                  </Td>
                </Tr>
              )
            )
          : null}
      </Tbody>
    </Table>
  );
}
