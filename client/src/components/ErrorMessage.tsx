import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <div className='w-1/2 mx-auto mt-8 p-3 bg-red-600 text-center text-white font-bold uppercase'>{children}</div>;
};

export default ErrorMessage;
