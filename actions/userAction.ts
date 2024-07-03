"use server";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const addUsers = async (formData: FormData) => {
  // const { formikValues, formRef } = formValues;

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { name, email, password };

  const response = await fetch("http://192.168.29.231:8010/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();
  revalidateTag("user");
  redirect("/");
};

export const clearFormData = () => {
  return null;
};

export const deleteUsers = async (user: any) => {
  const response = await fetch(
    `http://192.168.29.231:8010/api/users/${user?._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const deletedUser = await response?.json();
  revalidateTag("user");
};
export const editUsers = async (payload: any) => {
  const { user, newUser } = payload;

  const response = await fetch(
    `http://192.168.29.231:8010/api/users/${user?._id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: newUser?.name,
        email: newUser?.email,
        password: newUser?.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const editUser = await response?.json();
  revalidateTag("user");
  redirect("/");
};
