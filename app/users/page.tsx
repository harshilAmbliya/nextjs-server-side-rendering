import AddUsers from "@/components/AddUsers";
import React from "react";
import { addUsers, editUsers } from "@/actions/userAction";
type Props = {};

const page = async (props: Props) => {
  const response = await fetch("http://192.168.29.231:8010/api/users", {
    next: { tags: ["user"], revalidate:60 },
  });

  const users = await response.json()
  return (
    <div>
      <AddUsers data={users} addUsers={addUsers} editUsers={editUsers} />
    </div>
  );
};

export default page;
