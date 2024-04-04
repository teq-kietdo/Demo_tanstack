import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { IUser } from "../interfaces/IAuth";

interface Props {
  title: string;
  id:
    | "id"
    | "email"
    | "address"
    | "age"
    | "firstName"
    | "lastName"
    | "username"
    | "avatar"
    | "address.city"
    | "address.country"
    | "address.street";
  defaultValue?: string;
  register: UseFormRegister<IUser>;
}

export const InputForm: FC<Props> = ({ id, title, defaultValue, register }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        defaultValue={defaultValue}
        type="text"
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
        {...register(id)}
      />
    </div>
  );
};
