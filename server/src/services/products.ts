import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ data: products });
  } catch (error) {
    console.error(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const products = await Product.findByPk(id);

    if (!products) {
      res.status(404).json({ error: "ID de producto inválido. El producto no existe" });
      return;
    }

    res.json({ data: products });
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "ID de producto inválido. El producto no existe" });
      return;
    }

    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "ID de producto inválido. El producto no existe" });
      return;
    }

    product.availability = !product.availability;
    await product.save();

    res.json({ data: product });
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: "ID de producto inválido. El producto no existe" });
      return;
    }

    await product.destroy();

    res.json({ data: "El Producto ha sido eliminado correctamente" });
  } catch (error) {
    console.error(error);
  }
};
