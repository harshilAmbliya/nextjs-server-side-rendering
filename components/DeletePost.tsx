"use client";

import { deletePosts } from "@/actions/postAction";
import { fetchApiData } from "@/common/showToast";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  users: any;
  posts: any;
};

const DeletePost = (props: Props) => {
  const { posts, users } = props;

  const deletePostsWithPostId = async (user: any) => {
    // code to delete user
    // const { data, error } = await deletePosts(posts);
    // if (data) {
    //   toast.success(data?.message);
    // } else {
    //   toast.error(error?.message);
    // }
    const { data, error } = await deletePosts(posts);
    fetchApiData({ data, error });
  };
  return (
    <Trash
      className="w-4 h-4 cursor-pointer"
      onClick={() => deletePostsWithPostId(users)}
    />
  );
};

export default DeletePost;
