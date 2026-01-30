import { useIsFetching } from '@tanstack/react-query';
import css from './Loader.module.css';

interface LoaderProps {
  overlay?: boolean;
}

export default function Loader({ overlay = false }: LoaderProps) {
  const isFetching = useIsFetching();

  if (!isFetching) return null;

  return (
    <div className={overlay ? css.loaderOverlay : css.loaderContainer}>
      <div className={css.loader}></div>
    </div>
  );
}