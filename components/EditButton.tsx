"use client";
import { editUsers } from "@/actions/userAction";
import { Edit } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  user: any;
};

const EditButton = (props: Props) => {
  const { user } = props;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Edit
      className="w-4 h-4 cursor-pointer"
      onClick={() => {
        history.pushState({ user }, "", `http://localhost:3000/${pathname}` + "/users");
        router.push("/users");
      }}
    />
  );
};

export default EditButton;
