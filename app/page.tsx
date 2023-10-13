import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty =
    !Array.isArray(allCars) || allCars.length === 0 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>
          <p>Explore the cars you might like</p>

          <div className="home__filters">
            <SearchBar />
            <div className="home__filter-container">
              <CustomFilter title="fuel" />
              <CustomFilter title="year" />
            </div>
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => {
                console.log(car);
                return <CarCard car={car} />;
              })}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-x1 font-bold">Oops no results</h2>
          </div>
        )}
      </div>
    </main>
  );
}
