import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { defaultPackageFilters, packages, sortModes } from "../../data/packagesData";
import PackageFilters from "./PackageFilters";
import PackageCard from "./PackageCard";
import Reveal from "../../components/Reveal";

const durationBucket = (days) => days;

const matchesFilters = (pkg, filters) =>
  (filters.destinations.length === 0 || filters.destinations.includes(pkg.destinationKey)) &&
  (filters.duration.length === 0 || filters.duration.includes(durationBucket(pkg.durationBucket))) &&
  pkg.price <= filters.budgetMax &&
  (filters.hotelStandard.length === 0 || filters.hotelStandard.includes(pkg.hotelStandard)) &&
  (filters.inclusions.length === 0 || filters.inclusions.every((item) => pkg.inclusions.includes(item)));

const sortPackages = (list, sortBy) => {
  if (sortBy === "priceLow") return [...list].sort((a, b) => a.price - b.price);
  if (sortBy === "priceHigh") return [...list].sort((a, b) => b.price - a.price);
  if (sortBy === "duration") return [...list].sort((a, b) => a.durationBucket.localeCompare(b.durationBucket));
  return list;
};

const AvailablePackages = ({showData}) => {
  const [filters, setFilters] = useState(defaultPackageFilters);
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPackages = useMemo(() => packages.filter((pkg) => matchesFilters(pkg, filters)), [filters]);
  const visiblePackages = sortPackages(filteredPackages, sortBy);

  const updateFilter = (key, value) => {
    if (key === "reset") {
      setFilters(defaultPackageFilters);
      return;
    }
    setFilters({ ...filters, [key]: value });
  };

  return (
    <>    {showData && (  <section id="packages" className="bg-oat px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1300px]">
        {/* <Reveal>
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-medium text-ink">Available Packages</h2>
                  <span className="rounded-full bg-badge px-2.5 py-1 text-xs font-medium uppercase text-badgetext">
                    128 Curated
                  </span>
                </span>
                <p className="mt-1.5 text-sm text-ink/65">Real-time availability with verified concierge pricing.</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <label className="flex items-center gap-2 rounded-lg bg-oat px-4 py-2.5 text-sm">
                  <span className="hidden text-ink/60 sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="bg-transparent font-medium text-ink outline-none"
                  >
                    {sortModes.map((mode) => (
                      <option key={mode.key} value={mode.key}>
                        {mode.label}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="flex items-center gap-1 rounded-lg bg-oat p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid view"
                    className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                      viewMode === "grid" ? "bg-dark text-white" : "text-ink/60"
                    }`}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List view"
                    className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                      viewMode === "list" ? "bg-dark text-white" : "text-ink/60"
                    }`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal> */}

       <div className="mt-6 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
          <Reveal>
            <PackageFilters filters={filters} onChange={updateFilter} onApply={() => {}} resultCount={visiblePackages.length} />
          </Reveal>

          <div className="min-w-0">
            {visiblePackages.length === 0 ? (
              <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                <p className="text-lg font-medium text-ink">No packages match your filters</p>
                <p className="mt-2 text-sm text-ink/65">Try widening your budget or removing a filter.</p>
              </div>
            ) : (
              <div className={`grid gap-5 ${viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
                {visiblePackages.map((pkg, index) => (
                  <Reveal key={pkg.id} delay={(index % 3) * 100}>
                    <PackageCard pkg={pkg} viewMode={viewMode} />
                  </Reveal>
                ))}
              </div>
            )}


            <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink/65">Showing 1 – {visiblePackages.length} of 128 Handcrafted Packages</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page ? "bg-dark text-white" : "bg-oat text-ink/70 hover:bg-mist"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-ink/40">…</span>
                <button
                  onClick={() => setCurrentPage(22)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === 22 ? "bg-dark text-white" : "bg-oat text-ink/70 hover:bg-mist"
                  }`}
                >
                  22
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> )}

    </>
  );
};

export default AvailablePackages;