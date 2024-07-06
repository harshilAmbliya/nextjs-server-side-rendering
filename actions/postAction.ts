"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export const getPosts = async () => {
  const response = await fetch("http://192.168.29.231:8010/api/posts", {
    next: {
      revalidate: 60,
      tags: ["post"],
    },
  });

  const posts = await response?.json();

  return posts;
};

export const addPosts = async (postData: any) => {
  const sendData = {
    title: postData.title,
    description: postData.description,
    createdBy: postData?.createdBy,
  };
  const res = await fetch("http://192.168.29.231:8010/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  });

  const data = await res.json();

  revalidateTag("post");
  return data;
};
export const editPosts = async (postStoreDetail: any, postData: any) => {
  const sendData = {
    title: postData.title,
    description: postData.description,
    createdBy: postData?.createdBy,
  };
  const res = await fetch(
    `http://192.168.29.231:8010/api/posts/${postStoreDetail?._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    }
  );

  const data = await res.json();
  console.log(data);

  revalidateTag("post");
  revalidatePath("/posts");
  return data;
};

export const deletePosts = async (postDetail: any) => {
  const res = await fetch(
    `http://192.168.29.231:8010/api/posts/${postDetail?._id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = null, error = null;
  
  if (res?.ok) {
    data = await res.json();
    revalidateTag("post");
  }else{
    error = await res.json();
  }
  return { data, error };
};
