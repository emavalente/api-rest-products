import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className='bg-slate-800'>
        <div className='mx-auto max-w-6xl py-10 sm:px-8 lg:px-0'>
          <h1 className='text-4xl font-extrabold text-white'>Administrador de Productos</h1>
        </div>
      </header>
      <main className='mx-auto max-w-6xl p-10 mt-10 bg-white shadow-md'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
