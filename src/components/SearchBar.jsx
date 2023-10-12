import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import fetchSearch from "../store/models/details/fetchSearch.jsx";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useState({});


  const {
    data,
    error,
    isLoading,
    refetch,
  } = useQuery(["search", searchParams], fetchSearch
  );
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleClickOutside = (event) => {
    if (event.target.id === "search") {
      openModal();

    }
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleSearch = (event) => {
    setSearchParams(event.target.value);
  }

  useEffect(() => {
    refetch();
  }, [ searchParams]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        openModal();
      }
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);


  return (
    <div className="relative">
      <input
        id="search"
        type="text"
        placeholder="Search"
        className="py-2 pr-4 pl-10 block w-full appearance-none leading-normal border border-gray-300 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.4 490.4" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g> <path
            d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796 s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"></path> </g> </g></svg>
      </div>
      <div className="absolute inset-y-0 right-0 pl-3  flex items-center pointer-events-none">
        <span className="mr-3 text-gray-500 text-xs"><kbd className="DocSearch-Button-Key">⌘</kbd><kbd
          className="DocSearch-Button-Key">K</kbd></span>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
          <div className="fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100"></div>
          <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100" ref={modalRef}>
            <div className="overflow-hidden rounded-lg bg-white shadow-md" id="headlessui-dialog-panel-15">
              <div className="relative">
                <input
                  className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6"
                  placeholder="Find any ticker..."
                  ref={inputRef}
                  onChange={handleSearch}
                />
                <svg className="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
                </svg>
              </div>
              <ul
                className="max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6"
                id="headlessui-combobox-options-151">

                {data?.results?.map((item, index) => (
                  <li
                    onClick={() => window.location.assign( `/us/ticker/${item.symbol}`)}
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-50"
                    id={`${index}`}
                    tabIndex="-1"
                  >
                    <span className="whitespace-nowrap font-semibold text-sky-600">{item.symbol}</span>
                    <span className="ml-4 text-right text-xs text-slate-600">{item.company_name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;