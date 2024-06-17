import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Posts = () => {
  const [postList, setPostList] = useState([]);
  const { t } = useTranslation('common');

  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await fetch("https://6669e2372e964a6dfed7018c.mockapi.io/post");
        const data = await response.json();
        setPostList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getPostList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://6669e2372e964a6dfed7018c.mockapi.io/post/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPostList(postList.filter(post => post.id !== id));
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <section className="container mx-auto p-4">
      <div className="header-container flex justify-between">
        <h2 className="w-56 py-2 text-2xl font-bold">{t('posts')}</h2>
        <Link
          className="rounded-md bg-gray-800 p-3 text-white"
          href="/dashboard/posts/create"
        >
          <Plus />
        </Link>
      </div>
      <div className="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Published Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {postList.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="font-medium">
                  {post.tag?.map((tag) => <p key={tag.id}>{tag.name}</p>)}
                </TableCell>
                <TableCell className="font-medium">
                  {new Date(post.publishedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-4">
                  <button onClick={() => handleDelete(post.id)}>
                    <Trash className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Posts;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
