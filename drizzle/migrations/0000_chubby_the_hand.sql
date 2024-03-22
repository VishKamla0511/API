CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"price" serial NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
