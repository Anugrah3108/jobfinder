import FilterSidebar from "@/components/filter-sidebar";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-start px-10 gap-10 max-h-[90vh] overflow-hidden">
      <FilterSidebar />
      {children}
    </div>
  );
}
