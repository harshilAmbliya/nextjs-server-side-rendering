"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import PostModel from "./models/postModel";

type Props = {
  users: any;
};

const AddPostButton = (props: Props) => {
  const { users } = props;
  const [open, setOpen] = useState(false);
  const handleOpenModel = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button className="" id="AddPosts" onClick={handleOpenModel}>
        Add Posts
      </Button>
      <PostModel open={open} setOpen={setOpen} data={{ users }} />
    </div>
  );
};

export default AddPostButton;
