import React from "react";
import Link from "next/link";
import {useTranslation} from "next-i18next";

const Sidebar = () => {
  const { t } = useTranslation('common');

  return (
    <section className="inline-block  w-52 p-4 pt-6 text-center">
      <ul>
        <li className="mb-2 border-b border-b-gray-300 py-2">
          <Link href="/dashboard/posts">{t('posts')}</Link>
        </li>
        <li className="mb-2 border-b border-b-gray-300 py-2">
          <Link href="/dashboard/categories">{t('categories')} </Link>
        </li>
        <li className="mb-2 border-b border-b-gray-300 py-2">
          <Link href="/dashboard/tags">{t('tags')}</Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
