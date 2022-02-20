import { Box, Container, Stack, Text } from '@chakra-ui/react';
import ProductTable from '../components/ProductTable';
import { useQuery } from 'react-query';
import { getAllProducts } from '../services/api';

export default function Collections() {
  const { data, isLoading, isError } = useQuery('products', getAllProducts);
  console.log(data);
  const products = data;
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error Loading Data</Text>;
  }
  return (
    <Container maxW={'3xl'} mt={0} centerContent>
      <Stack
        as={Box}
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <ProductTable products={products} />
      </Stack>
    </Container>
  );
}
