import { safeParse, number, string, pipe, transform, parse } from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../utils/index";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: ProductData) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;

    const {
      data: { data: responseData },
    } = await axios.get(url);

    const result = safeParse(ProductsSchema, responseData);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error al obtener los datos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;

    const {
      data: { data: responseData },
    } = await axios.get(url);

    const result = safeParse(ProductSchema, responseData);

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error al obtener los datos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (data: ProductData, id: Product["id"]) => {
  // Los datos ingresados provienen del form por lo que son todos de tipo string.
  // Necesitamos verificar que todos esos datos correspondan al schema ProductSchema.
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price), // Se debe transformar y verificar como number().
      availability: toBoolean(data.availability.toString()), // Se debe trasformar a boolean.
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error("");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailability = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
};
