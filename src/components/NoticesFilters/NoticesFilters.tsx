import { useState } from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
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
      <select className={css.select}
        value={params.category ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            category: (e.target.value as Category) || undefined,
          })
        }
      >
        <option value="">Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}              
            </select>
            </div>

        <div className={css.selectwrapper}>
      <select className={css.select}
        value={params.sex ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            sex: (e.target.value as Sex) || undefined,
          })
        }
      >
        <option value="">By gender</option>
        {sexes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
        </select>
        </div>
        </div>

        <div className={css.selectwrapper}>
      <select className={`${css.selectSpecies} ${css.selectType}`}
        value={params.species ?? ""}
        onChange={(e) =>
          onChange({
            ...params,
            species: (e.target.value as Species) || undefined,
          })
        }
      >
        <option value="">By type</option>
        {species.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
          </select>
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

      {/* сортування за популярністю та ціною */}
<div className={css.sort}>

  <label>
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
    Popular
  </label>


  <label>
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
    Unpopular
  </label>

  <label>
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
    Cheap
  </label>

  <label>
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
    Expensive
  </label>
</div>

      <button type="button" onClick={handleReset} className={css.reset}>
        Reset
      </button>
    </section>
  );
}
