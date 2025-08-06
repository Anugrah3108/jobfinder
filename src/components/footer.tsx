import { Badge, Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-gray-950 text-gray-400 py-6 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            JobFinder.io
          </h2>
          <p className="text-sm">
            Empowering talent and companies to connect and grow.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-medium">Quick Links</h3>
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/#jobs" className="hover:text-white transition">
            Jobs
          </Link>
          {/* <Link href="/companies" className="hover:text-white transition">
            Companies
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link> */}
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-medium mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-white transition"
            >
              Github
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-white transition"
            >
              Linkedin
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-white transition"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-2 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} JobFinder.io. All rights reserved.
      </div>
      <Flex justify={"center"} align={"center"} gap={"2"}>
        <p className="text-gray-400 text-sm">Author:</p>
        <Badge>Anugrah Singh</Badge>
      </Flex>
    </footer>
  );
}
