import { Text } from "@radix-ui/themes";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Text
        size="5"
        weight="bold"
        color="indigo"
        className="absolute top-3 left-3"
      >
        JobFinder.io
      </Text>
      {children}
    </div>
  );
}
