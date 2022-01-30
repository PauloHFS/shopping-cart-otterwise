import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { numberToBRL } from 'src/helpers/Format';
import * as CarrinhoService from 'src/services/carrinho';
import * as ProdutoService from 'src/services/produtos';
import ProductBox from './components/ProductBox';
import { MdCheckCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [Produtos, setProdutos] = useState([]);
  const [Carrinho, setCarrinho] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setProdutos(ProdutoService.getProdutos());
  }, []);

  const handleBuyOnClick = ({ uuid, amount }) => {
    const {
      name,
      price: { value, unit },
    } = ProdutoService.getProdutoByUUID(uuid);
    setCarrinho([...Carrinho, { uuid, name, value, amount }]);
    toast(`Adicionando ${amount} ${unit} de ${name} ao carrinho`, {
      position: 'bottom-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const handleFinalizePurchaseOnClick = () => {
    CarrinhoService.setCarrinho(
      Carrinho.map(({ uuid, amount }) => ({ uuid, amount }))
    );
    navigate('/carrinho');
  };

  return (
    <Fragment>
      <Flex
        width="100%"
        height={10}
        bgColor="teal.500"
        display="flex"
        justifyContent="center"
      >
        <Text
          as="h1"
          lineHeight={10}
          color="white"
          fontWeight={900}
          fontSize="2rem"
        >
          {'Shopping Cart'}
        </Text>
      </Flex>
      <Flex
        maxW="992px"
        marginLeft="auto"
        marginRight="auto"
        paddingBottom={10}
        flexWrap="wrap"
        alignItems="stretch"
        justifyContent="space-evenly"
      >
        <IconButton
          icon={<MdShoppingCart />}
          position="absolute"
          top={0}
          right={100}
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          aria-label="Abrir carrinho"
        />
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Carrinho</DrawerHeader>

            {Carrinho.length !== 0 ? (
              <DrawerBody>
                <Stack>
                  {Carrinho.map(({ uuid, name, value, amount }) => (
                    <HStack
                      key={uuid + String(value * Math.random())}
                      justifyContent="space-between"
                    >
                      <Text>{name}</Text>
                      <Text>{numberToBRL(value * amount)}</Text>
                    </HStack>
                  ))}
                </Stack>
              </DrawerBody>
            ) : (
              <DrawerBody
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="gray.400">Seu carrinho está vazio!</Text>
              </DrawerBody>
            )}

            <DrawerFooter>
              <Button
                leftIcon={<MdCheckCircleOutline />}
                colorScheme="blue"
                onClick={() => handleFinalizePurchaseOnClick()}
                isDisabled={Carrinho.length === 0}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {Produtos.map(produto => (
          <ProductBox
            mt={5}
            product={produto}
            key={produto.uuid}
            buyOnClick={handleBuyOnClick}
          />
        ))}
      </Flex>
    </Fragment>
  );
}
