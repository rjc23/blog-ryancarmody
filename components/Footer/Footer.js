import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="footer mt-24">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8"></hr>
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-6">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-6">
          <a
            className="text-gray-500 hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/ryancarmody_dev"
          >
            Twitter
          </a>
          <a
            className="text-gray-500 hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ryanjcarmody/"
          >
            LinkedIn
          </a>
          <a
            className="text-gray-500 hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/rjc23"
          >
            GitHub
          </a>
          <a
            className="text-gray-500 hover:text-gray-600 transition"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/channel/UCGTXoUNS6EeBpW-wta7phqQ"
          >
            YouTube
          </a>
        </div>
        <div className="flex flex-col space-y-6">
          <Link href="/code">
            <a className="text-gray-500 hover:text-gray-600 transition">Code</a>
          </Link>
          <Link href="/life">
            <a className="text-gray-500 hover:text-gray-600 transition">Life</a>
          </Link>
          <Link href="/misc">
            <a className="text-gray-500 hover:text-gray-600 transition">Misc</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
