"use client";

import { deleteUsers } from "@/actions/userAction";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  user: any;
};

const TrashButton = (props: Props) => {
  const { user } = props;
  return <Trash className="w-4 h-4 cursor-pointer" onClick={() => deleteUsers(user)}  />;
};

export default TrashButton;
