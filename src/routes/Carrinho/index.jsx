import { Flex } from '@chakra-ui/react';
import ShoppingCartTable from './components/ShoppingCartTable';

export default function Carrinho() {
  return (
    <Flex maxWidth="992px" mr="auto" ml="auto" mt="10">
      <ShoppingCartTable />
    </Flex>
  );
}
