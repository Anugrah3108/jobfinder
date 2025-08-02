//@ts-nocheck
"use client";
import { Box, TextField } from "@radix-ui/themes";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    async function getSuggestions() {
      const res = await fetch(
        `http://localhost:3000/api/search/suggestion?q=${input}`
      );
      const data = await res.json();

      if (data.success) {
        setSuggestions(data.suggestions);
      }
    }

    let timer;

    if (input) {
      timer = setTimeout(() => {
        getSuggestions();
      }, 500);
    } else {
      setSuggestions([]);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [input]);

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      router.push(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  }
  return (
    <div className="relative">
      <Box className="w-full sm:w-auto flex-grow sm:flex-grow-0">
        <TextField.Root
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          size="2"
          placeholder="Search jobs..."
          className="w-full"
        >
          <TextField.Slot>
            <Search className="h-5 w-5" />
          </TextField.Slot>
        </TextField.Root>
      </Box>
      {suggestions.length > 0 && (
        <div className="absolute z-30 bg-gray-800 p-2 ">
          {suggestions.map((elem) => {
            return (
              <p key={elem?.id} className="line-clamp-1">
                {elem?.title}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
