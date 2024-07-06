import { getPosts } from "@/actions/postAction";
import { getUsers } from "@/actions/userAction";
import AddPostButton from "@/components/AddPostButton";
import DeletePost from "@/components/DeletePost";
import EditButtonPost from "@/components/EditButtonPost";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

type postTypes = {
  title: string;
  _id: string;
  description: string;
  createdBy: {
    name?: string;
    email?: string;
    password?: string;
  };
  createdAt: string;
};

const page = async (props: Props) => {
  const posts = await getPosts();
  const users = await getUsers();

  return (
    <div className="bg-slate-200 min-h-screen ">
      <div className="flex justify-between px-10 items-center gap-2">
        <div className="py-4 text-center font-bold">POSTS</div>
        <AddPostButton users={users} />
      </div>
      <div className="grid grid-cols-4 gap-3 container mx-auto">
        {posts?.data?.post?.length > 0 &&
          posts?.data?.post?.map((post: postTypes) => {
            return (
              <div
                className="bg-white h-[130px] p-5 rounded-md"
                key={post?._id}
              >
                <div className="flex justify-between items-center gap-1">
                  <p className="font-bold text-lg line-clamp-1">{post.title}</p>
                  <div className="flex justify-center items-center gap-1">
                    <EditButtonPost data={post} users={users} />
                    <DeletePost posts={post} users={users} />
                  </div>
                </div>
                <p>{post.description}</p>
                <p>crestedBy : {post.createdBy.name}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default page;
