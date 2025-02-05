import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { action as updateAvailabilityAction, loader as productsLoader } from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, { action as editProductAction } from "./views/EditProduct";
// import { loader as editProductLoader } from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar", // ROA pattern - Resourse oriented design
        element: <EditProduct />,
        // loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar", // ROA pattern - Resourse oriented design
        action: deleteProductAction,
      },
    ],
  },
]);
