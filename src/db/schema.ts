import { pgTable, serial, timestamp, varchar ,text} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  price : serial("price"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});


