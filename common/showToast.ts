"use client";

import { toast } from "sonner";

export const fetchApiData = (method: any) => {
  console.log(method);
  const { data, error } = method;
  debugger;
  if (data) {
    console.log(data);
    toast.success(data?.message);
  } else {
    console.log(error);
    toast.error(error?.message);
  }
};
