// Types
interface Product {
  id: string;
  name: string;
  price: number;
  amount: number;
  details: {
    name: string;
    value: string;
  }[];
  organizationId: number;
  createdAt: string;
  updatedAt: string;
}

interface serverResponse {
  status: "Success" | "Error";
  message?: string;
  data?: any;
}

// Classes
class ProductsModel {
  /**
   * A method to get all products from an organization.
   */
  public static async getAllProducts(): Promise<Product[]> {
    const res = await this.request("GET", `/products`);

    if (res.status == "Error") return [];
    return res.data;
  }
  /**
   * A method to get a product by id.
   */
  public static async getProductById(id: string): Promise<Product | undefined> {
    const res = await this.request("GET", `/products/${id}`);

    if (res.status == "Error") return;
    return res.data;
  }

  /**
   * A method to do the request to thr server.
   */
  private static async request(
    method: string,
    route: string,
    data?: any
  ): Promise<serverResponse> {
    const res = await fetch(`${route}`, {
      method: method,
      body: JSON.stringify(data),
      credentials: "include",
    });

    return (await res.json()) as serverResponse;
  }
}
