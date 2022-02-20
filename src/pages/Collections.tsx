import React from 'react';
import { Box, Button, Container, Stack, Text } from '@chakra-ui/react';
import ProductTable from '../components/ProductTable';
import { useQuery, useQueryClient } from 'react-query';
import { getAllProducts } from '../services/api';

export default function Collections() {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery(
    ['products', page],
    () => getAllProducts(page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  // Prefetch the next page!
  React.useEffect(() => {
    if (data?.hasMore) {
      queryClient.prefetchQuery(['projects', page + 1], () =>
        getAllProducts(page + 1)
      );
    }
  }, [data, page]);

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
        <Box>
          <Box>Current Page: {page + 1}</Box>
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
          >
            Previous Page
          </Button>{' '}
          <Button
            onClick={() => {
              setPage((old) => (data?.hasMore ? old + 1 : old));
            }}
            disabled={isPreviousData || !data?.hasMore}
          >
            Next Page
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
