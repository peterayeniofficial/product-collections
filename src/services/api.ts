export const getAllProducts = async () => {
  const response = await fetch(`${process.env.REACT_APP_SERVER}/products`);
  if (response.status !== 200) {
    throw new Error('Error fetching products');
  }
  return response.json();
};
