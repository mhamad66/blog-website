import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Select from "react-select";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false });

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [titleAr, setTitleAr] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [contentAr, setContentAr] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
  const [tags, setTags] = useState<TagModel[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
            "https://6669e2372e964a6dfed7018c.mockapi.io/category",
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getTags = async () => {
      try {
        const response = await fetch(
            "/api/tags",
        );
        const data = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
    getTags();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setImage(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(content)
    const postData: PostModel = {
      title,
      titleAr,
      content,
      contentAr,
      publishedDate: new Date(),
      imageUrl: image,
      category: selectedCategory ? selectedCategory.name : undefined,
      tag: selectedTags,
    };

    try {
      const response = await fetch(
          "https://6669e2372e964a6dfed7018c.mockapi.io/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          },
      );

      if (response.ok) {
        router.push("/dashboard/posts");
      } else {
        console.error("Error creating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm my-4 font-medium text-gray-700">
              Title (English)
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md  shadow-sm border h-10"
                required
            />
          </div>
          <div className="mb-4">
            <label className="block my-4 text-sm font-medium text-gray-700">
              Title (Arabic)
            </label>
            <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="mt-1 block w-full rounded-md  shadow-sm border h-10"
            />
          </div>
          <div className="mb-4">
            <label className="block my-4 text-sm font-medium text-gray-700">
              Content (English)
            </label>
            <QuillEditor value={content} onChange={setContent} />
          </div>
          <div className="mb-4">
            <label className="block text-sm my-4 font-medium text-gray-700">
              Content (Arabic)
            </label>
            <QuillEditor value={contentAr} onChange={setContentAr} />
          </div>
          <div className="mb-4">
            <label className="block text my-4 -sm font-medium text-gray-700">
              Image
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {image && (
                <img
                    src={image}
                    alt="Selected"
                    className="mt-4 h-40 w-40 object-cover"
                />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm my-4 font-medium text-gray-700">
              Category
            </label>
            <Select
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(option) =>
                    setSelectedCategory(
                        categories.find((category) => category.id === option?.value) ||
                        null,
                    )
                }
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm my-4 font-medium text-gray-700">
              Tags
            </label>
            <Select
                isMulti
                options={tags.map((tag) => ({
                  value: tag.name,
                  label: tag.name,
                }))}
                onChange={(options) =>
                    setSelectedTags(
                        options.map(
                            (option) =>
                                tags.find((tag) => tag.name === option.value) as TagModel,
                        ),
                    )
                }
            />
          </div>
          <button type="submit" className="rounded-md w-32 bg-[#1F2937] py-2 text-white">
            Create
          </button>
        </form>
      </div>
  );
};

export default CreatePost;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
