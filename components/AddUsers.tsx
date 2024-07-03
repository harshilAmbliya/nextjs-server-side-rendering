"use client";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";

type Props = {
  data: any;
  addUsers: any;
  editUsers: any;
};

const AddUsers = (props: Props) => {
  const { addUsers, editUsers } = props;
  if (window === undefined) return (<></>)

  const historyData = window?.history?.state || null;
  const [editUser, setEditUser] = useState(null);

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission here
    },
  });
  useEffect(() => {
    if (historyData?.user) {
      setEditUser(historyData?.user);
      formik.setValues({
        email: historyData?.user?.email,
        name: historyData?.user?.name,
        password: historyData?.user?.password,
      });
    }
  }, [historyData?.user]);

  //   console.log(data);
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        className="flex flex-col space-y-2 bg-white p-5 min-w-[50%] rounded-md"
        action={
          editUser !== null
            ? () => editUsers(editUser !== null && {user:editUser,newUser:formik.values})
            : addUsers
        }
      >
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="border rounded-md p-2 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="border rounded-md p-2 focus:outline-none w-full focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border rounded-md p-2 focus:outline-none  w-full focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUsers;
