import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props: any) => {
  console.log(props.post);
  return (
    <div className="card flex w-full flex-row rounded-md p-4">
      <div className="card-image">
        <Image
          className="rounded-md"
          src={
            props.post?.imageUrl && props.post?.imageUrl.length > 50
              ? props.post?.imageUrl
              : "https://i.pinimg.com/564x/36/0f/d9/360fd9d9ec632d8e5192c4fceba4b729.jpg"
          }
          alt=""
          width={props.post?.imageUrl ? "200" : "350"}
          height="100"
        />
      </div>
      <div className="card-body w-10/12 p-4">
        <p className="text-lg font-semibold">{props.post.title}</p>
        <p className="text-sm font-semibold text-gray-500">
          {new Date(props.post.publishedDate).toLocaleDateString()}
        </p>
        <p className="">
          {props.post.content}{" "}
          {props.post.content.length < 50
            ? " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi doloribus eos molestias"
            : ""}
        </p>
        <ul className="flex gap-4 mt-2">
          {props.post.tag.map((tag: TagModel) => (
            <li key={tag.id} className="w-fit rounded-full bg-gray-700 px-4 py-2 text-sm text-white">{tag.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
