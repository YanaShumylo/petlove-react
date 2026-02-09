import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NoticesList from "../../components/NoticesList/NoticesList";
import Title from "../../components/Title/Title";
import {getNotices} from "../../api/noticesApi";
import type { GetNoticesParams } from "../../api/noticesApi";
import css from "./NoticesPage.module.css";

export default function NoticesPage() {
  const [params, setParams] = useState<GetNoticesParams>({});

  const { data } = useQuery({
    queryKey: ["notices", params],
    queryFn: () => getNotices(params),
    placeholderData: (prev) => prev,
  });

  return (
    <section className={css.NoticesPage}>
          <Title title="Find your favorite pet" />
          
      {data && <NoticesList items={data.results} />}
    </section>
  );
}
