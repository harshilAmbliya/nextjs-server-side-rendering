"use client";

import React, { useState } from "react";
import { Edit } from "lucide-react";
import PostModel from "./models/postModel";

type Props = {
  data: any;
  users: any;
};

const EditButtonPost = ({ data,users }: Props) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const handleEdit = async (data: any) => {
    setEditData({ posts:data, users });
    setOpen(true);
  };

  return (
    <div>
      <Edit
        className="w-4 h-4 cursor-pointer"
        onClick={() => handleEdit(data)}
      />
      <PostModel open={open} setOpen={setOpen} data={editData || null} />
    </div>
  );
};

export default EditButtonPost;
