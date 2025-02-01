import { ActionFunctionArgs, Form, Link, redirect, useFetcher, useNavigate } from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils/index";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export const action = async ({ params }: ActionFunctionArgs) => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  const isAvailable = product.availability;
  const fetcher = useFetcher();
  const navigate = useNavigate();

  return (
    <tr className='border-b '>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>{formatCurrency(product.price)}</td>
      <td className='p-3 text-lg text-gray-800'>
        <fetcher.Form method='POST'>
          <button
            type='submit'
            name='id' // debido a lo que requiere la petición.
            value={product.id}
            className={`${
              isAvailable ? "text-black" : "text-red-600"
            } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No Disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800 '>
        <div className='flex gap-4 p-3 text-lg text-gray-800'>
          <button
            onClick={() =>
              navigate(`/productos/${product.id}/editar`, {
                state: {
                  product,
                },
              })
            }
            className='bg-indigo-600 text-white rounded-lg w-full p-2 font-bold uppercase text-xs text-center'
          >
            Editar
          </button>
          <Form
            className='w-full'
            method='POST'
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              // onSubmit se ejecuta antes que el action para poder intervenirlo.
              if (!confirm("Seguro desea eliminar el producto?")) {
                e.preventDefault(); // el action no se ejecutará
              }
            }}
          >
            <input
              type='submit'
              value='Eliminar'
              className='bg-red-600 text-white rounded-lg w-full p-2 font-bold uppercase text-xs text-center'
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetail;
