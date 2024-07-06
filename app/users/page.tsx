import dynamic from "next/dynamic";
import React from "react";
import { addUsers, editUsers, getUsers } from "@/actions/userAction";
type Props = {};

const AddUsers = dynamic(() => import("../../components/AddUsers"), {
  ssr: false,
});

const page = async (props: Props) => {
  const users = await getUsers()
  return (
    <div>
      <AddUsers data={users} addUsers={addUsers} editUsers={editUsers} />
    </div>
  );
};

export default page;
