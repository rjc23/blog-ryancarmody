import Image from "next/image";
import React from "react";

function Author({ name, date }) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const createdAt = new Date(date).toLocaleDateString([], options);
  return (
    <div className="author">
      <Image
        src={"/images/me.png"}
        alt="an image of the author"
        width={50}
        height={50}
      />
      <div className="info">
        <p>{name}</p>
        <p>{createdAt}</p>
      </div>
    </div>
  );
}

export default Author;
