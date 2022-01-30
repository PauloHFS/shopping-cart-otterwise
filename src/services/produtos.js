const produtos = [
  {
    uuid: '183c5c5d-0592-487c-b454-797a773b3921',
    name: 'Banana',
    image_url:
      'https://hiperideal.vteximg.com.br/arquivos/ids/171306-1000-1000/12696.jpg?v=636626179776100000',
    price: { value: 6.0, unit: 'kg' },
  },
  {
    uuid: '5a651a67-4aad-4903-9ebf-31d779b29152',
    name: 'Maçã',
    image_url:
      'https://i1.wp.com/www.felizmelhoridade.com.br/wp-content/uploads/2018/04/Ma%C3%A7%C3%A3-%E2%80%93-Formas-de-comer-e-indica%C3%A7%C3%B5es.jpg?fit=1024%2C978&ssl=1',
    price: { value: 3.0, unit: 'kg' },
  },
  {
    uuid: '10cca3a1-fbc0-48db-9a05-9cee305a6c63',
    name: 'Laranja',
    image_url:
      'https://cd.shoppub.com.br/cenourao/media/cache/c6/a4/c6a4a7df49b3faa65cb239868ad94728.png',
    price: { value: 5.5, unit: 'kg' },
  },
  {
    uuid: '305ca33c-013a-4f5c-81e0-2a0ab021e144',
    name: 'Abacate',
    image_url:
      'https://mercadoorganico.com/6306-large_default/abacate-organico-un-osm.jpg',
    price: { value: 5.0, unit: 'unidade' },
  },
  {
    uuid: '477cec70-424a-47f2-9f62-a8dcce0704b9',
    name: 'Manga',
    image_url:
      'https://hiperideal.vteximg.com.br/arquivos/ids/167726-1000-1000/62332.jpg?v=636615816353730000',
    price: { value: 6.0, unit: 'unidade' },
  },
];

export const getProdutos = () => produtos;
export const getProdutoByUUID = uuid =>
  produtos.find(produto => produto.uuid === uuid);
