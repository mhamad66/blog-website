import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import {Pencil, Plus, Trash} from "lucide-react";
import {
  Pagination,
  PaginationContent, PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const Categories = () => {
  const { t } = useTranslation('common');
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const response = await fetch(
          "https://6669e2372e964a6dfed7018c.mockapi.io/category",
        );
        const data = await response.json();
        setCategoryList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Error fetching data:" + error);
      }
    };
    getCategoryList();
  }, []);

  return (
    <section className="container mx-auto p-4">
<div className="header-container flex justify-between">
  <h2 className="font-bold  text-2xl  w-56 py-2">{t('categories')}</h2>
</div>
      <div className="table-container">

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">#ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryList.map((category:CategoryModel) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                 </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default Categories;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
