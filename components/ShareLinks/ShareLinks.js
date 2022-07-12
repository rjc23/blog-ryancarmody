import React from "react";

function ShareLinks({ title }) {
  const [baseURI, setBaseURI] = useState("");

  useEffect(() => {
    setBaseURI(
      window.location.href.substring(0, window.location.href.indexOf("#"))
    );
  }, []);
  return <div className="sharelinks">ShareLinks</div>;
}

export default ShareLinks;
