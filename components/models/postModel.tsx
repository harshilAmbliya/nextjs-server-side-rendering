"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { addPosts, editPosts } from "@/actions/postAction";

type Props = {
  open: boolean;
  setOpen: any;
  data?: any;
};

const PostModel = (props: Props) => {
  const { open, setOpen, data } = props;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [selectValue, setSelectValue] = useState<any>(null);
  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        description: "",
      });
      setSelectValue(null);
    }
  }, [open]);

  useEffect(() => {
    if (data?.posts) {
      setFormData({
        title: data.posts.title,
        description: data.posts.description,
      });
      setSelectValue({
        label: data.posts.createdBy.name,
        value: data.posts.createdBy._id,
      });
    }
  }, [data]);

  const userOptions =
    data?.users?.data?.length > 0 &&
    data?.users?.data?.map((user: any) => {
      return {
        value: user._id,
        label: user.name,
      };
    });

  const handleSelectValueChange = (e: any) => {
    const parseValue = JSON.parse(e);
    const { label, value } = parseValue;

    setSelectValue({
      label,
      value,
    });
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePost = async () => {
    const prepareData = {
      title: formData.title,
      description: formData.description,
      createdBy: selectValue?.value,
    };
    if (data?.posts) {
      const post = await editPosts(data?.posts, prepareData);
      if (post) {
        setOpen(false);
      }
    } else {
      const post = await addPosts(prepareData);
      if (post) {
        setOpen(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" p-0">
        <DialogTitle className="border-b">
          <h1 className="text-[18px] font-bold pb-3 pt-4 px-6">
            {data?.posts ? "Edit Post" : "Add Post"}
          </h1>
        </DialogTitle>
        <div className="p-5 pt-0">
          <form action="">
            <div className="py-1">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                placeholder="Enter Title.."
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="py-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter Description.."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="py-1">
              <Label htmlFor="user">Select User</Label>
              <Select onValueChange={handleSelectValueChange}>
                <SelectTrigger
                  className="w-full"
                  value={selectValue?.label || "Select User"}
                  disabled={data?.posts?.createdBy?._id}
                >
                  <SelectValue
                    placeholder={selectValue?.label || "Select User"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {userOptions?.length > 0 &&
                    userOptions?.map((option: any) => (
                      <SelectItem value={JSON.stringify(option)} key={Math.random() * 100}>
                        {option?.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </form>

          <div className="pt-2 flex justify-end items-center">
            <Button className="min-w-[100px]" onClick={handleSavePost}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModel;
