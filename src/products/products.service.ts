import { Inject, Injectable, } from '@nestjs/common';
import * as schema from '../db/schema';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {

  constructor(
    @Inject('PRODUCT')
    private readonly conn: PostgresJsDatabase<typeof schema>
  ) { }

  // insert api
  async createProduct(title: string, description: string, price: number): Promise<any> {
    try {
      if (!title || !description || !price) {
        return "Enter All fields";
      }
      const results = await this.conn.insert(schema.products).values({ title: title, description: description, price: price }).execute();
      return {
        message: "product is added successfully",
      }
    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }

  // get all products
  async getAllProducts(): Promise<any> {
    try {
      const data = await this.conn.select().from(schema.products);
      return {
        message: "get all products",
        data: data
      }
    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }

  // get data by id
  async getProductById(id: number): Promise<any> {
    if (!id) {
      return "Id is required";
    }
    try {
      const data = await this.conn
        .select({ title: schema.products.title, description: schema.products.description, price: schema.products.price })
        .from(schema.products)
        .where(eq(schema.products.id, Number(id)))
      return {
        message: "get product by its id",
        data: data
      }
    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }

  // update data by id 
  async updateProductById(id: number, title: string, description: string, price: number): Promise<any> {
    try {
      if (!id) {
        return {
          message: "id is required"
        }
      }

      const data = await this.conn.update(schema.products).set({ title, description, price }).where(eq(schema.products.id, Number(id)))
      return {
        message: "update product by its id",
        data: data
      }
    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }

  // delete data by id
  async deleteProductById(id: number): Promise<any> {
    try {
      console.log(id)
      if (!id) {
        return {
          message: "id is required"
        }
      }
      const data = await this.conn.delete(schema.products).where(eq(schema.products.id, Number(id)))
      return {
        message: "delete product by its id",
        data: data
      }
    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }


























  // async createProduct(title: string, description: string, price: number): Promise<any> {
  //   const result = await this.conn.insert('products').values({ title, description, price }).execute();
  //   return result;
  // }






  // constructor(
  //     @Inject() private conn: PostgresJsDatabase<typeof schema>,
  // ) { }

  // getUsers = async (req: Request, res: Response) => {
  //     try {
  //       const allUsers = await conn.select().from(products);
  //       return res.status(200).json({ success: true, data: allUsers });
  //     } catch (error) {
  //       return res
  //         .status(500)
  //         .json({ success: false, data: null, message: "Unable to get users" });
  //     }
  //   };

  //     createProduct = async (req: Request, res: Response) => {
  //         const { title, description, price }: { title: string; description: string, price: number } = req.body;

  //         if (!title) {
  //             return res
  //                 .status(400)
  //                 .json({ success: false, data: null, message: "title is required" });
  //         }

  //         if (!description) {
  //             return res
  //                 .status(400)
  //                 .json({ success: false, data: null, message: "description is required" });
  //         }

  //         if (!price) {
  //             return res
  //                 .status(400)
  //                 .json({ success: false, data: null, message: "price is required" });
  //         }

  //         try {
  //             // await this.conn.insert(products).values({ title, description, price })
  //             const result = await db.insert(products).values({title: title, description: description, price: price });

  //             return res.status(201).json({
  //                 success: true,
  //                 data: { title, description, price },
  //                 message: "Added Successfully",
  //             });
  //         }
  //         catch (error) {
  //             return res
  //                 .status(500)
  //                 .json({ success: false, data: null, message: "Unable to add" });
  //         }
  //     };



























  // private readonly products : Product[] = [];

  // insertProduct(title:string, description : string , price : number){
  //     const proddId = Math.random().toString()
  //     const newProduct = new Product( proddId, title, description, price);
  //     this.products.push(newProduct);
  //     return proddId;
  // }


  // getProducts(){
  //     return [...this.products]
  // }

  // getProductById(productId : string){
  //     const product = this.products.find(prod => prod.id === productId)
  //     if(!product ){
  //         throw new NotFoundException('could not found product');
  //     }
  //     return {...product};
  // }






}
