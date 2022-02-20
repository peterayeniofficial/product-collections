export async function getAllProducts(page: number) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER}/products?_page=${page}`
  );
  if (response.status !== 200) {
    throw new Error('Error fetching products');
  }
  return response.json();
}
