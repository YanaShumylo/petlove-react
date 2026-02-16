import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoticesList from "../../components/NoticesList/NoticesList";
import Title from "../../components/Title/Title";
import { getNotices } from "../../api/noticesApi";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import type { Category, Species, Sex } from "../../types/notices";
import type { GetNoticesParams } from "../../api/noticesApi";
import Pagination from "../../components/Pagination/Pagination";
import css from "./NoticesPage.module.css";

const categories: Category[] = ["sell", "free", "lost", "found"];

const species: Species[] = [
  "dog",
  "cat",
  "monkey",
  "bird",
  "snake",
  "turtle",
  "lizard",
  "frog",
  "fish",
  "ants",
  "bees",
  "butterfly",
  "spider",
  "scorpion",
];

const sexes: Sex[] = ["unknown", "female", "male", "multiple"];

export default function NoticesPage() {
  const [filters, setFilters] = useState<Omit<GetNoticesParams, "page" | "limit">>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data } = useQuery({
    queryKey: ["notices", filters, currentPage],
    queryFn: () => getNotices({...filters, page: currentPage, limit: itemsPerPage }),
    placeholderData: (prev) => prev,
     });

  const handleFiltersChange = (nextFilters: Partial<Omit<GetNoticesParams, "page" | "limit">> | {}) => {
    setFilters(nextFilters);
    setCurrentPage(1); 
  };
  
  const handlePageChange = (page: number) => {
     setCurrentPage(page);
  };
  
  return (
    <section className={css.NoticesPage}>
      <Title className={css.titleNoticesPage} title="Find your favorite pet" />
      
      <NoticesFilters
        params={filters}
        categories={categories}
        species={species}
        sexes={sexes}
        onChange={handleFiltersChange}
      />

      {data && data.results.length > 0 && (
      <>
      <NoticesList items={data.results} />

      <Pagination
        currentPage={data.page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />     
      </>
      )}  
      {data && data.results.length === 0 && <p className={css.textNoFound}>No notices found.</p>}
    </section>
  );
}
