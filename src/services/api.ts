export async function getAllProducts(
  page: number = 0,
  subscription?: string,
  tagsLike?: string
) {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER}/products?subscription=${subscription}&tags_like=${tagsLike}&_page=${page}`
  );
  if (response.status !== 200) {
    throw new Error('Error fetching products');
  }
  return response.json();
}
