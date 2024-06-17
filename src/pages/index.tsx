import { Inter } from "next/font/google";
import Image from "next/image";
import Card from "@/components/Card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CustomPagination from "@/components/CustomPagination";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const inter = Inter({ subsets: ["latin"] });
const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [postList, setPostList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6669e2372e964a6dfed7018c.mockapi.io/post",
        );
        const data = await response.json();
        const sortedData = data.sort((a: PostModel, b: PostModel) => {
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        });
        setPostList(sortedData);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getTags = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setTags(data.tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    getTags();
    fetchData();
  }, []);

  useEffect(() => {
    const filteredItems = postList.filter((item: PostModel) => {
      const matchesSearchQuery =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag
        ? item.tag?.some((tag) => tag.name === selectedTag)
        : true;

      return matchesSearchQuery && matchesTag;
    });
    setSearchResults(filteredItems);
    setCurrentPage(1);
  }, [searchQuery, postList, selectedTag]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTagClick = (tagName) => {
    setSelectedTag(tagName);
  };

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = searchResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  const { t } = useTranslation("common");

  return (
    <section className="home-container container mx-auto flex p-4">
      <div className="content-container lg:w-9/12 lg:border-r">
        <Link href="">
          <div className="main-post-container mb-4 flex w-full flex-col">
            <Image
              className="h-[500px] overflow-hidden rounded-md max-md:h-96"
              src="https://i.pinimg.com/564x/d0/57/75/d05775e4728ef9c7fb5cbae5947e82ff.jpg"
              alt=""
              width="990"
              height="0"
            ></Image>
            <p className="w-9/12 py-2 max-lg:w-full">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              animi beatae deleniti dicta eos fuga fugit impedit in inventore
              ipsa iure maxime numquam porro qui ratione sed vel, veritatis,
              voluptas!
            </p>
          </div>
        </Link>
        <div className="posts-container flex flex-wrap justify-center gap-4">
          {selectedItems.map((post: PostModel) => (
            <Link className="w-full" key={post.id} href={"/post/" + post.id}>
              <Card key={post.id} post={post} />
            </Link>
          ))}
          <div className="pagination-container flex w-full justify-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <div className="sidbar-container hidden w-3/12 px-4 lg:block">
        <div className="search-container relative flex w-full items-center">
          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t("search_by_title_or_content")}
            className="rounded-ms h-10 w-full py-0 pr-10"
          />
        </div>
        <div className="recommanded-topics-container mt-6">
          <h2 className="font-semibold">{t("recommended_topics")}</h2>
          <ul className="mt-2 flex flex-wrap items-center gap-4">
            {tags.map((tag: TagModel) => (
              <li
                key={tag.id}
                className={`w-fit cursor-pointer rounded-full bg-gray-700 px-4 py-2 text-sm text-white ${selectedTag === tag.name ? "bg-blue-500" : ""}`}
                onClick={() => handleTagClick(tag.name)}
              >
                {t(tag.name)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
