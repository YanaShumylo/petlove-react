import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoticesList from "../../components/NoticesList/NoticesList";
import Title from "../../components/Title/Title";
import { getNotices } from "../../api/noticesApi";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import type { Category, Species, Sex } from "../../types/notices";
import type { GetNoticesParams } from "../../api/noticesApi";
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
  const [params, setParams] = useState<GetNoticesParams>({});

  const { data } = useQuery({
    queryKey: ["notices", params],
    queryFn: () => getNotices(params),
    placeholderData: (prev) => prev,
  });

    const handleFiltersChange = (next: Partial<GetNoticesParams> | {}) => {
    if (next && Object.keys(next).length > 0) {
      setParams((prev) => ({ ...prev, ...next, page: 1 }));
    } else {
      setParams({});
    }
    };
  
  return (
    <section className={css.NoticesPage}>
      <Title className={css.titleNoticesPage} title="Find your favorite pet" />
      
      <NoticesFilters
        params={params}
        categories={categories}
        species={species}
        sexes={sexes}
        onChange={handleFiltersChange}
      />
          
      {data && <NoticesList items={data.results} />}
    </section>
  );
}
