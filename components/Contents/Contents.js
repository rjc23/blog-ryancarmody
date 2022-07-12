import Link from "next/link";
import React, { useEffect, useState } from "react";

function Contents({ h2Elements }) {
  const [baseURI, setBaseURI] = useState("");

  useEffect(() => {
    setBaseURI(
      window.location.href.substring(0, window.location.href.indexOf("#"))
    );
  }, [h2Elements]);

  return (
    <div className="contents-top">
      <h2>Table of Contents</h2>
      <ol>
        {Array.from(h2Elements).map((val, i) => {
          return (
            <li key={i}>
              {i + 1}.&nbsp;
              <Link href={baseURI + "#" + val.id}>
                <a className="text-sky-800 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-500">
                  {val.innerText}
                </a>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Contents;
