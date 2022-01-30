import {
  Tr,
  Td,
  Image,
  IconButton,
  useNumberInput,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { numberToBRL } from 'src/helpers/Format';
import * as CarrinhoService from 'src/services/carrinho';
import { useCarrinho } from 'src/context/carrinho-context';
import { useEffect } from 'react';

export default function ShoppingCartRowTable(props) {
  const { product } = props;

  const {
    uuid,
    image_url,
    name,
    price: { value, unit },
    amount,
    total,
  } = product;

  const { dispatch } = useCarrinho();

  const {
    valueAsNumber,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: unit === 'kg' ? 0.1 : 1,
    defaultValue: amount,
    min: unit === 'kg' ? 0.1 : 1,
    precision: unit === 'kg' ? 3 : 0,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: true });

  const handleDeleteOnClick = uuid => {
    dispatch({
      type: 'REMOVE',
      uuid: uuid,
    });
    CarrinhoService.removeProduto(uuid);
  };

  useEffect(() => {
    dispatch({
      type: 'UPDATE',
      produto: {
        ...product,
        amount: valueAsNumber,
        total: value * valueAsNumber,
      },
    });
  }, [valueAsNumber]);

  return (
    <Tr key={uuid}>
      <Td>
        <Image src={image_url} maxW={24} />
      </Td>
      <Td>{name}</Td>
      <Td>
        {numberToBRL(value)} / {unit}
      </Td>
      <Td>
        <HStack maxW="200px">
          <Button {...inc}>+</Button>
          <Input {...input} />
          <Button {...dec}>-</Button>
        </HStack>
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
  );
}
