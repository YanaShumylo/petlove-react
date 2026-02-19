import { useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import Select from "react-select";
import { searchCities } from "../../api/citiesApi";
import SearchField from "../SearchField/SearchField";
import type { Category, Species, Sex } from "../../types/notices";
import type { City } from "../../types/city";
import css from "./NoticesFilters.module.css";

interface NoticesFiltersProps {
  params: {
    keyword?: string;
    category?: Category;
    species?: Species;
    sex?: Sex;
    locationId?: string;
    byPopularity?: boolean;
    byPrice?: boolean;
  };

  categories: Category[];
  species: Species[];
  sexes: Sex[];

  onChange: (next: NoticesFiltersProps["params"]) => void;
}

export default function NoticesFilters({
  params,
  categories,
  species,
  sexes,
  onChange,
}: NoticesFiltersProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleReset = () => {
    setSelectedCity(null);
    onChange({});
  };

  return (
    <section className={css.filters}>
    <div className={css.wrapperFilters} >
      <SearchField
        onSubmit={(keyword) =>
          onChange({ ...params, keyword: keyword || undefined })
        }
        placeholder="Search"
        />
              
        <div className={css.wrapperCategoriaBygender} >
          <div className={css.selectwrapper}>
      <Select
      className={css.customSelect}
      classNamePrefix="react-select"
      options={categories.map((c) => ({ value: c, label: c }))}
      value={params.category ? { value: params.category, label: params.category } : null}
      onChange={(option) =>
        onChange({
          ...params,
          category: option?.value,
        })
      }
      placeholder="Category"
      isClearable
    />
  </div>


  <div className={css.selectwrapper}>
    <Select
      className={css.customSelect}
      classNamePrefix="react-select"
      options={sexes.map((s) => ({ value: s, label: s }))}
      value={params.sex ? { value: params.sex, label: params.sex } : null}
      onChange={(option) =>
        onChange({
          ...params,
          sex: option?.value,
        })
      }
      placeholder="By gender"
      isClearable
    />
  </div>

  <div className={css.selectwrapper}>
    <Select
      className={css.customSelect}
      classNamePrefix="react-select"
      options={species.map((s) => ({ value: s, label: s }))}
      value={params.species ? { value: params.species, label: params.species } : null}
      onChange={(option) =>
        onChange({
          ...params,
          species: option?.value,
        })
      }
      placeholder="By type"
      isClearable
    />
    </div>
          </div>
      
        <AsyncSelect<City, false>
  className={css.asyncSelectContainer}
  classNamePrefix="react-select"
  cacheOptions
  defaultOptions={false}
  loadOptions={async (inputValue) => {
    if (inputValue.length < 3) return [];
    return await searchCities(inputValue);
  }}
  value={selectedCity}
  onChange={(option) => {
    setSelectedCity(option);
    onChange({
      ...params,
      locationId: option?._id,
    });
  }}
  getOptionLabel={(o) => `${o.cityEn}, ${o.stateEn}`}
  getOptionValue={(o) => o._id}
  placeholder="Location"
  isClearable
  noOptionsMessage={({ inputValue }) =>
    inputValue.length < 3 ? "Type at least 3 characters" : "No cities found"
  }
  components={{
    DropdownIndicator: (props) => (
      <components.DropdownIndicator {...props}>
        <svg width={18} height={18}>
          <use href="/svg-sprite.svg#icon-search" />
        </svg>
      </components.DropdownIndicator>
    ),
    ClearIndicator: (props) => (
      <components.ClearIndicator {...props}>
        <svg width={18} height={18}>
          <use href="/svg-sprite.svg#icon-cross-small" />
        </svg>
      </components.ClearIndicator>
    ),
  }}
/>
      </div>
      
      <div className={css.divider}></div>

      {/* сортування за популярністю та ціною */}
<div className={css.sort}>

  <label className={css.sortLabel}>
    <input
      type="radio"
      name="sort"
      checked={params.byPopularity === false}
      onChange={() =>
        onChange({
          ...params,
          byPopularity: false,
          byPrice: undefined,
        })
      }
    />
    <span>Popular</span>

    {params.byPopularity === false && (
      <svg
        className={css.closeIcon}
        width={14}
        height={14}
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange({
            ...params,
            byPopularity: undefined,
          });
        }}
      >
        <use href="/svg-sprite.svg#icon-cross-small" />
      </svg>
    )}
  </label>

  <label className={css.sortLabel}>
    <input
      type="radio"
      name="sort"
      checked={params.byPopularity === true}
      onChange={() =>
        onChange({
          ...params,
          byPopularity: true,
          byPrice: undefined,
        })
      }
    />
    <span>Unpopular</span>

    {params.byPopularity === true && (
      <svg
        className={css.closeIcon}
        width={14}
        height={14}
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange({
            ...params,
            byPopularity: undefined,
          });
        }}
      >
        <use href="/svg-sprite.svg#icon-cross-small" />
      </svg>
    )}
  </label>

  <label className={css.sortLabel}>
    <input
      type="radio"
      name="sort"
      checked={params.byPrice === true}
      onChange={() =>
        onChange({
          ...params,
          byPrice: true,
          byPopularity: undefined,
        })
      }
    />
    <span>Cheap</span>

    {params.byPrice === true && (
      <svg
        className={css.closeIcon}
        width={14}
        height={14}
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange({
            ...params,
            byPrice: undefined,
          });
        }}
      >
        <use href="/svg-sprite.svg#icon-cross-small" />
      </svg>
    )}
  </label>

  <label className={css.sortLabel}>
    <input
      type="radio"
      name="sort"
      checked={params.byPrice === false}
      onChange={() =>
        onChange({
          ...params,
          byPrice: false,
          byPopularity: undefined,
        })
      }
    />
    <span>Expensive</span>

    {params.byPrice === false && (
      <svg
        className={css.closeIcon}
        width={14}
        height={14}
          onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange({
            ...params,
            byPrice: undefined,
          });
        }}
      >
        <use href="/svg-sprite.svg#icon-cross-small" />
      </svg>
    )}
  </label>
</div>

      <button className={css.btnReset} type="button" onClick={handleReset}>
        Reset
      </button>
    </section>
  );
}
