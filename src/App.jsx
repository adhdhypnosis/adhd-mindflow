import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import Landing from "./Landing.jsx";
import Generator from "./Generator.jsx";
import SymptomLanding from "./components/SymptomLanding.jsx";
import { LANDING_PAGES } from "./data/landingPages.js";

function SymptomPage() {
  const { slug } = useParams();
  const data = LANDING_PAGES[slug];
  if (!data) return <Landing />;
  return <SymptomLanding data={data} />;
}

function GeneratorPage() {
  const navigate = useNavigate();
  return <Generator onBack={() => navigate("/")} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/hypnosis-generator" element={<GeneratorPage />} />
      <Route path="/:slug" element={<SymptomPage />} />
    </Routes>
  );
}
