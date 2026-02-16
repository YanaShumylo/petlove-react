import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import NewsList from "../../components/NewsList/NewsList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNews } from "../../api/newsApi";
import Pagination from "../../components/Pagination/Pagination";
import css from "./NewsPages.module.css";
    
export default function NewsPage() {
    const [keyword, setKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    const { data } = useQuery({
        queryKey: ["news", keyword, currentPage],
        queryFn: () => getNews({ keyword, page: currentPage, limit: itemsPerPage }),
        placeholderData: (prev) => prev,
    });

     const handleSearchSubmit = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
    
return (
    <section className={css.newsPage}>
        <div className={css.wrapperTitleSearch}>
        <Title title="News" className={css.titleNewsPage} />
        <SearchField className={css.search} onSubmit={handleSearchSubmit} />
        </div>

        {data && data.results.length > 0 && (
            <>
                <NewsList items={data.results} />
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={data.totalPages}
                    onPageChange={handlePageChange}
                />
            </>
        )}

        {data && data.results.length === 0 && <p className={css.textNoFound}>No news found.</p>}
    </section>
);
};