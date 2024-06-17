import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const post = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostModel>({});
  useEffect(() => {
    const getPost = async () => {
      try {
        console.log(router.query.id);
        const response = await fetch(
          `https://6669e2372e964a6dfed7018c.mockapi.io/post/${router.query.id}`,
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data:" + error);
      }
    };
    getPost();
  }, [router.query.id]);
  return (
    <section className="container mx-auto my-4 flex flex-col items-center justify-center px-4">
      <Image
        className="h-[550px] overflow-hidden rounded-md max-md:h-96"
        src={
          post?.imageUrl && post?.imageUrl.length > 50
            ? post?.imageUrl
            : "https://i.pinimg.com/564x/36/0f/d9/360fd9d9ec632d8e5192c4fceba4b729.jpg"
        }
        alt=""
        width={post?.imageUrl && post?.imageUrl.length > 50 ? "800" : "1000"}
        height="0"
      ></Image>
      <div className="mt-4 flex w-11/12 justify-around">
        <p className="text-lg font-semibold">{post.title}</p>
        <p className="text-sm font-semibold text-gray-500">
          {new Date(post.publishedDate).toLocaleDateString()}
        </p>
      </div>
      <p className="w-12/12 lg:w-8/12">
        {post.content +
          " Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam debitis dolores error esse, eum facere, fugiat hic illo labore libero obcaecati odio quibusdam quod ratione sed soluta veritatis voluptas!"}
      </p>
    </section>
  );
};

export default post;
