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

      if (!title) {
        return {
          message: "title is required"
        }
      }

      if (!description) {
        return {
          message: "description is required"
        }
      }

      if (!price) {
        return {
          message: "price is required"
        }
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
    try {
      const data = await this.conn
        .select({ title: schema.products.title, description: schema.products.description, price: schema.products.price })
        .from(schema.products)
        .where(eq(schema.products.id, Number(id)))

      if (data.length ){
        return {
          message: "get product by its id",
          data: data
        }
      }
      else {
        return {
          message : "product not found"
        }
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

      if (!title) {
        return {
          message: "title is required"
        }
      }

      if (!description) {
        return {
          message: "description is required"
        }
      }

      if (!price) {
        return {
          message: "price is required"
        }
      }
      const query = await this.conn
        .select({ id: schema.products.id, title: schema.products.title })
        .from(schema.products)
        .where(eq(schema.products.id, Number(id)))

      if (query.length !== 0) {
        const data = await await this.conn
          .update(schema.products)
          .set({ title, description, price })
          .where(eq(schema.products.id, Number(id)));

        if (data) {
          return {
            message: "product is updated successfully",
          }
        }
      }
      else {
        return {
          message: "product not found"
        }
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
      const query = await this.conn
        .select({ id: schema.products.id, title: schema.products.title })
        .from(schema.products)
        .where(eq(schema.products.id, Number(id)))

      if (query.length !== 0) {
        const data = await this.conn.delete(schema.products).where(eq(schema.products.id, Number(id)))
        return {
          message: "delete product successfully"
        }
      }
      else {
        return {
          message: "product not found"
        }
      }

    }
    catch (error) {
      return {
        message: "internal server error",
        data: error
      }
    }
  }



}
