import React from "react";
import Image from "next/image";

function Banner() {
  return (
    <div className="banner">
      <div>
        <h1>
          <span className="text-6xl banner__blog drop-shadow-lg shadow-black">
            BLOG.
          </span>
          ryancarmody
        </h1>
        <p className="">Web Developer, Computer Science Tutor</p>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          I like creating things with code, teaching code, climbing & playing
          wheelchair basketball.
        </p>
      </div>
      <div className="banner__image grayscale">
        <Image
          src="/images/me.png"
          alt="An image of Ryan, the author of this blog"
          width={150}
          height={150}
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Banner;
