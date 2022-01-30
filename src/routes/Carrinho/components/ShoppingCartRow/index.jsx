import { IconButton, Image, Td, Tr } from '@chakra-ui/react';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { numberToBRL } from 'src/helpers/Format';

export default function ShoppingCartRow(props) {
  const {
    product: {
      image_url,
      name,
      price: { value, unit },
      amount,
      total,
    },
    deleteOnClick,
  } = props;
  return (
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
          aria-label="Remover produto."
          icon={<MdRemoveShoppingCart />}
          colorScheme="red"
          onClick={deleteOnClick}
        />
      </Td>
    </Tr>
  );
}
