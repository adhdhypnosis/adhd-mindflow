import { Routes, Route, useParams } from "react-router-dom";
import Landing from "./Landing.jsx";
import HypnosisGeneratorForm from "./pages/HypnosisGeneratorForm.jsx";
import SymptomLanding from "./components/SymptomLanding.jsx";
import { LANDING_PAGES } from "./data/landingPages.js";

function SymptomPage() {
  const { slug } = useParams();
  const data = LANDING_PAGES[slug];
  if (!data) return <Landing />;
  return <SymptomLanding data={data} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/hypnosis-generator" element={<HypnosisGeneratorForm />} />
      <Route path="/:slug" element={<SymptomPage />} />
    </Routes>
  );
}
