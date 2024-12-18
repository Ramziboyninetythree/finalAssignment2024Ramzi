import { test, expect } from "@playwright/test";

test.describe("Hoff.is Product  API Tests", () => {
  const baseUrl = "https://hoff.is/store2/api/v1/price";
  const allProductUrl = "https://hoff.is/store2/api/v1/product";
   // Expected product list
  const expectedProducts = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Grape" },
    { id: 5, name: "Bicycle" },
    { id: 6, name: "Samsung S5" },
    { id: 7, name: "Toy Train" },
    { id: 8, name: "Cup of coffee" },
    { id: 9, name: "Chair" },
    { id: 10, name: "TV" },
  ];  

  test("should fetch product details by ID and verify values", async ({ request }) => {
    const productName = 'Apple'
    const productPrice = 15;
    const productVat  = 3;
    const productId = 1;
    const response = await request.get(`${baseUrl}/${productId}`);

    // Assert the response status
    expect(response.status()).toBe(200);

    // Parse and log the response body
    const responseBody = await response.json();
    console.log(responseBody);

    // Assert specific details in the response body 
    expect(responseBody).toHaveProperty("id", productId);
    expect(responseBody).toHaveProperty("price",productPrice);
    expect(responseBody).toHaveProperty("name",productName);
    expect(responseBody).toHaveProperty("vat",productVat);


  });

  test("should fetch all products and match against expected list", async ({ request }) => {
    const response = await request.get(`${allProductUrl}/list`);
  
    // Assert the response status
    expect(response.status()).toBe(200);
  
    // Parse the response body
    const responseBody = await response.json();
  
    // Access the products array from the response
    const products = responseBody.products;
  
    // Log the actual products for debugging
    console.log("Fetched Products:", products);
  
    // Compare the fetched product list with the expected list
    expect(products).toEqual(expectedProducts);
  
    // Optionally, validate individual product properties
    for (const product of expectedProducts) {
      const matchingProduct = products.find((p) => p.id === product.id);
      expect(matchingProduct).toBeDefined();
      expect(matchingProduct.name).toBe(product.name);
    }
  });

})
