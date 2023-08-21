const API_URL = process.env.REACT_APP_API_URL || "";

export const fetchProducts = async (): Promise<Product[]> => {
  if (!API_URL) {
    throw new Error("API URL is not configured.");
  }
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data: Product[] = await response.json();
  return data;
};
