import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import toast from "react-hot-toast";
import css from "./SearchField.module.css";

interface SearchFieldProps {
  onSubmit: (keyword: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchField({
  onSubmit,
  placeholder = "Search",
  className,
}: SearchFieldProps) {
  const [keyword, setKeyword] = useState("");

   const debouncedSubmit = useDebouncedCallback(
    (value: string) => {
      if (value.trim()) {
        onSubmit(value.trim());
      }
    },
    1000
   );
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedSubmit(value); 
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!keyword.trim()) {
      toast.error("Please enter search keyword!");
      return;
    }

    onSubmit(keyword.trim());
  };

  const handleClear = () => {
    setKeyword("");
    onSubmit("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className ?? ""} ${css.formSearch}`}
    >
      <div className={css.inputWrapper}>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete="off"
          className={css.input}
        />

        {keyword && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className={css.clearButton}
          >
            <svg width={18} height={18}>
              <use href="/svg-sprite.svg#icon-cross-small" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          aria-label="Search"
          className={css.searchButton}
        >
          <svg width={18} height={18}>
            <use href="/svg-sprite.svg#icon-search" />
          </svg>
        </button>
      </div>
    </form>
  );
}
