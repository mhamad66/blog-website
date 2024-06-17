import React, { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Dashboard = () => {
  const [postsCount, setPostsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);
  const { t } = useTranslation("common");

  useEffect(() => {
    const getPostCount = async () => {
      try {
        const response = await fetch(
          "https://6669e2372e964a6dfed7018c.mockapi.io/post",
        );
        const data = await response.json();
        setPostsCount(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data:" + error);
      }
    };
    const getCategoriesCount = async () => {
      try {
        const response = await fetch(
          "https://6669e2372e964a6dfed7018c.mockapi.io/category",
        );
        const data = await response.json();
        setCategoriesCount(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data:" + error);
      }
    };
    const getTagsCount = async () => {
      try {
        const response = await fetch("/api/tags");
        const data = await response.json();
        setTagsCount(data.tags.length);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data:" + error);
      }
    };
    getPostCount();
    getCategoriesCount();
    getTagsCount();
  }, []);

  return (
    <section>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-12">
        <li className="bold flex h-40 w-48 flex-col items-center justify-center rounded-md bg-gray-700 text-2xl text-white">
          <p>{t("posts")}</p>
          <p>{postsCount}</p>
        </li>

        <li className="bold flex h-40 w-48 flex-col items-center justify-center rounded-md bg-yellow-700 text-2xl text-white">
          <p> {t("categories")}</p>
          <p>{categoriesCount}</p>
        </li>
        <li className="bold flex h-40 w-48 flex-col items-center justify-center rounded-md bg-red-700 text-2xl text-white">
          <p>{t("tags")}</p>
          <p>{tagsCount}</p>
        </li>
      </ul>
    </section>
  );
};
export default Dashboard;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
