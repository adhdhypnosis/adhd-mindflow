import { useState, useEffect } from "react";
import Landing from "./Landing.jsx";
import Generator from "./Generator.jsx";

export default function App() {
  const [page, setPage] = useState("landing");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#/hypnosis-generator" || hash === "#/generator") {
        setPage("generator");
      } else {
        setPage("landing");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (target) => {
    if (target === "generator") {
      window.location.hash = "#/hypnosis-generator";
    } else {
      window.location.hash = "#/";
    }
  };

  if (page === "generator") {
    return <Generator onBack={() => navigateTo("landing")} />;
  }
  return <Landing onOpenGenerator={() => navigateTo("generator")} />;
}
