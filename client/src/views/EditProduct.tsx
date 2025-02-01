import { ActionFunctionArgs, Form, Link, useActionData, redirect, useLocation, LoaderFunctionArgs } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (params.id !== undefined) {
    const product = await getProductById(parseInt(params.id));
    if (!product) {
      // throw new Response("", { status: 404, statusText: "No encontrado" });
      return redirect("/");
    }
    return product;
  }
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());
  let error = "";

  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
    return error;
  }
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  } else {
    throw new Response("", { status: 404, statusText: "No encontrado" });
  }
};

const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

const EditProduct = () => {
  const error = useActionData();
  const { state } = useLocation();
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
        <Link to={"/"} className='rounded bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500'>
          Volver
        </Link>
      </div>
      <Form method='POST' className='mt-10'>
        <ProductForm product={state.product} />
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='availability'>
            Disponibilidad:
          </label>
          <select
            id='availability'
            className='mt-2 block w-full p-3 bg-gray-50'
            name='availability'
            defaultValue={state.product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Guardar Cambios'
        />
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </>
  );
};

export default EditProduct;
