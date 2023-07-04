import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import Tabs from "../../components/Tabs.jsx";
import { Dialog, Disclosure, Popover, Tab, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";

const AiDrivenInsights = () => {
  const navigate = useNavigate();

  // TODO migrate main menu to its own component
  const tabsConfig = {
    isMain: true,
    type: "underline",
    tabs: [
      { name: "A.I. Driven insights", onClickHandler: () => navigate("/us/ai-driven-insights") },
      { name: "Regime Analysis" },
      { name: "Portfolio Analysis", onClickHandler: () => navigate("/us/portfolio-analysis") }
    ]
  };

  const filters = [
    {
      id: "themes",
      name: "Themes",
      options: [
        { value: "all", label: "All" },
        { value: "technical", label: "Technical" },
        { value: "macro", label: "Macro" },
        { value: "value", label: "Value" },
        { value: "momentum", label: "Momentum" }
      ]
    },
    {
      id: "direction",
      name: "Direction",
      options: [
        { value: "bullish", label: "Bullish" },
        { value: "bearish", label: "Bearish" },
      ]
    },
    {
      id: "horizon",
      name: "Horizon",
      options: [
        { value: "1W", label: "1 week" },
        { value: "1M", label: "1 month" },
        { value: "2M", label: "2 month" },
      ]
    },
    {
      id: "selector",
      name: "Selector",
      options: [
        { value: "consumer-discretionary", label: "Consumer Discretionary" },
        { value: "consumer-stapless", label: "Consumer Stapless" },
        { value: "energy", label: "Energy" },
        { value: "financials", label: "Financials" },
        { value: "healthcare", label: "Healthcare" },
        { value: "industrials", label: "Industrials" },
        { value: "materials", label: "Materials" },
        { value: "technology", label: "Technology" }
      ]
    }
  ];
  const products = [
    {
      id: 1,
      name: "Basic Tee 8-Pack",
      href: "#",
      price: "$256",
      description: "Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.",
      options: "8 colors",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg",
      imageAlt: "Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green."
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description: "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt."
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description: "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt."
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description: "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt."
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description: "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt."
    },
    {
      id: 2,
      name: "Basic Tee",
      href: "#",
      price: "$32",
      description: "Look like a visionary CEO and wear the same black t-shirt every day.",
      options: "Black",
      imageSrc: "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg",
      imageAlt: "Front of plain black t-shirt."
    }
    // More products...
  ];

  return (
    <>
      <Header />
      <main>
        <Container>
          {/*Title*/}
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full"
              src={usFlag}
              alt="Rounded avatar"
            />
            <h1 className="text-4xl font-semibold pl-4	uppercase">US Stock Market</h1>
          </div>
          {/*End Title*/}
          {/*Tabs*/}
          <Tabs config={tabsConfig} />
          {/*End Tabs*/}
          {/*Section*/}
          <section className="mt-4">
            <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  className="inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">Filters</span>
                  <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                </button>

                <div className="hidden lg:block">
                  <form className="space-y-10 divide-y divide-gray-200">
                    {filters.map((section, sectionIdx) => (
                      <div key={section.name} className={sectionIdx === 0 ? null : "pt-10"}>
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                          <div className="space-y-3 pt-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`${section.id}-${optionIdx}`}
                                       className="ml-3 text-sm text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ))}
                  </form>
                </div>
              </aside>

              <section aria-labelledby="product-heading" className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                <h2 id="product-heading" className="sr-only">
                  Products
                </h2>

                <div
                  className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                    >
                      <div
                        className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                        <img
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                        />
                      </div>
                      <div className="flex flex-1 flex-col space-y-2 p-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          <a href={product.href}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                          </a>
                        </h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <div className="flex flex-1 flex-col justify-end">
                          <p className="text-sm italic text-gray-500">{product.options}</p>
                          <p className="text-base font-medium text-gray-900">{product.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};


export default AiDrivenInsights;