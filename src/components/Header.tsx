import React from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {useTranslation} from "next-i18next";

const Header = () => {
    const { t } = useTranslation('common');

    return (
      <header className="container mx-auto flex items-center justify-between border-b p-4">
        <div className="logo-container flex cursor-pointer items-center justify-center gap-2">
          <Link href="/">
            <span className="inline-block mr-2 h-3 w-3 rounded-full bg-[#1F2937]"></span>
              {t('blog')}
          </Link>
        </div>
        <ul className="navigation-container flex gap-4">
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <Link href="/">{t('home')}</Link>
          </li>
          <li>
            <Link href="/dashboard">{t('dashboard')}</Link>
          </li>
        </ul>
      </header>
    );
};

export default Header;
