import Title from "../../components/Title/Title";
import SearchField from "../../components/SearchField/SearchField";
import NewsList from "../../components/NewsList/NewsList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getNews } from "../../api/newsApi";
import css from "./NewsPages.module.css";
    
export default function NewsPage() {
    const [keyword, setKeyword] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["news", keyword],
        queryFn: () => getNews({ keyword }),
        placeholderData: (prev) => prev,
    });
    
return (
    <section className={css.newsPage}>
        <div className={css.wrapperTitleSearch}>
        <Title title="News" className={css.titleNewsPage} />
        <SearchField className={css.search} onSubmit={(value) => { setKeyword(value) }} />
        </div>
        
        {isLoading && <p>Loading...</p>}

        {data &&
        <NewsList items={data.results} />}
    </section>
);
};