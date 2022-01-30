import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useNumberInput,
} from '@chakra-ui/react';
import { MdAddShoppingCart } from 'react-icons/md';
import { numberToBRL } from 'src/helpers/Format';

export default function ProductBox(props) {
  const {
    product: {
      uuid,
      name,
      image_url,
      price: { value, unit },
    },
    buyOnClick,
    ...rest
  } = props;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: unit === 'kg' ? 0.1 : 1,
      defaultValue: 1,
      min: unit === 'kg' ? 0.1 : 1,
      precision: unit === 'kg' ? 3 : 0,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ isReadOnly: false });

  return (
    <Stack
      maxW="64"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="blackAlpha.900"
      overflow="hidden"
      {...rest}
    >
      <Image src={image_url} alt={name} />
      <Box p="4" display="flex" flexDirection="column">
        <HStack display="flex" justifyContent="space-between">
          <Text as="h2" fontSize="1.5rem">
            {name}
          </Text>
          <Box>
            {numberToBRL(value)}
            <Box as="span" fontSize="sm">
              {` / ${unit}`}
            </Box>
          </Box>
        </HStack>
        <HStack>
          <Button {...dec}>-</Button>
          <Input {...input} />
          <Button {...inc}>+</Button>
          <IconButton
            aria-label="Adicionar ao carrinho"
            icon={<MdAddShoppingCart />}
            colorScheme="teal"
            onClick={() => buyOnClick({ uuid, amount: Number(input.value) })}
          />
        </HStack>
      </Box>
    </Stack>
  );
}
