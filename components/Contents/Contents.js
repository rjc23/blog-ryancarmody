import React from "react";

function Contents({ h2Elements }) {
  function scrollToElement(val) {
    const el = document.getElementById(val);
    el.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }

  return (
    <div className="contents-top">
      <h2 className="mb-2">Table of Contents</h2>
      <ol>
        {Array.from(h2Elements).map((val, i) => {
          return (
            <li key={i}>
              <a
                onClick={() => scrollToElement(val.id)}
                className="text-sky-800 hover:text-sky-900 dark:text-sky-400 dark:hover:text-sky-500"
              >
                {val.innerText}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Contents;
