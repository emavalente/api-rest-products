import { boolean, number, object, string, InferOutput, array } from "valibot";

export const DraftProductSchema = object({
  // Esquema para validar un producto en formulario aún sin agregar.
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  // Esquema para producto ya agregado.
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

// Esquema para conjunto de productos.
export const ProductsSchema = array(ProductSchema);

// Type inferido para un producto.
export type Product = InferOutput<typeof ProductSchema>;
