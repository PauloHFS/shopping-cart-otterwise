import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
  Flex,
  Center,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import ShoppingCartTable from './components/ShoppingCartTable';
import * as CarrinhoService from 'src/services/carrinho';
import * as ProdutoService from 'src/services/produtos';
import { useCarrinho } from 'src/context/carrinho-context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNavigateBefore, MdOutlineDone, MdAttachMoney } from 'react-icons/md';
import { numberToBRL } from 'src/helpers/Format';

export default function Carrinho() {
  const { carrinho, dispatch } = useCarrinho();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch({
      type: 'LOAD',
      carrinho: CarrinhoService.getCarrinho().map(({ uuid, amount }) => {
        const produto = ProdutoService.getProdutoByUUID(uuid);

        return {
          ...produto,
          amount: amount,
          total: amount * produto.price.value,
        };
      }),
    });
  }, [dispatch]);

  return (
    <Flex maxWidth="992px" mr="auto" ml="auto" mt="10" flexDirection="column">
      <ShoppingCartTable />
      <Center>
        {carrinho.length === 0 ? (
          <Button
            leftIcon={<MdNavigateBefore />}
            colorScheme="blue"
            onClick={() => navigate('/')}
          >
            Voltar as compras
          </Button>
        ) : (
          <Button
            rightIcon={<MdOutlineDone />}
            colorScheme="green"
            onClick={onOpen}
          >
            Finalizar compra
          </Button>
        )}
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDirection="column">
              <Icon as={MdAttachMoney} boxSize={48} color="green.300" />
              <Text>Compra Finalizada!</Text>
              <Text>
                Total:{' '}
                {numberToBRL(
                  carrinho.reduce((previous, { total }) => previous + total, 0)
                )}
              </Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                CarrinhoService.setCarrinho([]);
                onClose();
                navigate('/');
              }}
            >
              Concluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
