import { createFileRoute, useBlocker } from "@tanstack/react-router";
import { InputForm } from "../../components/InputForm";
import { getLocalStorageToken } from "../../utils/common";
import { useState } from "react";
import { IUser } from "../../interfaces/IAuth";
import { useForm } from "react-hook-form";
import isEqual from "lodash.isequal";

export const Route = createFileRoute("/_auth/profile")({
  component: ProfileComponent,
});

function ProfileComponent() {
  const user = getLocalStorageToken();
  const [dirty, setDirty] = useState(false);

  useBlocker(() => window.confirm("Are you sure you want to leave?"), dirty);
  const { register, watch } = useForm<IUser>({ defaultValues: user });

  const onChange = () => {
    const formValue = watch();
    const isFormEdited = isEqual(formValue, user);
    setDirty(!isFormEdited);
  };

  return (
    <div className="p-2 space-y-2">
      <form
        className="w-1/2 bg-white p-6 rounded-lg mx-auto mt-[10%]"
        onChange={onChange}
      >
        <h1 className="font-bold text-2xl text-center">Profile</h1>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-10">
          <InputForm
            title="First Name"
            id="firstName"
            defaultValue={user.firstName}
            register={register}
          />
          <InputForm
            title="Last Name"
            id="lastName"
            defaultValue={user.lastName}
            register={register}
          />
          <InputForm
            title="Email"
            id="email"
            defaultValue={user.email}
            register={register}
          />
        </div>
        <div className="grid gap-6 mb-6">
          <InputForm
            title="City"
            id="address.city"
            defaultValue={user.address.city}
            register={register}
          />
          <InputForm
            title="Country"
            id="address.country"
            defaultValue={user.address.country}
            register={register}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
