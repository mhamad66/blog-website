import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useTranslation} from "next-i18next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

const Tags = () => {
    const { t } = useTranslation('common');
    const [tagList, setTagList] = useState([]);
    useEffect(() => {
        const getTagList = async () => {
            try {
                const response = await fetch(
                    "/api/tags",
                );
                const data = await response.json();
                setTagList(data.tags);
            } catch (error) {
                console.error("Error fetching data:", error);
                throw new Error("Error fetching data:" + error);
            }
        };
        getTagList();
    }, []);

    return (
      <section className="container mx-auto p-4">
        <div className="header-container flex justify-between">
          <h2 className="w-56 py-2 text-2xl font-bold">{t('tags')}</h2>
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
              {tagList.map((tag: TagModel) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.id}</TableCell>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="pagination-container flex w-full justify-center"></div>
        </div>
      </section>
    );
};
export default Tags;
export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
