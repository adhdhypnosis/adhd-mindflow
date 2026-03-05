import { HashRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing.jsx";
import Generator from "./Generator.jsx";
import SymptomLandingPage from "./pages/SymptomLandingPage.jsx";
import { symptomPages } from "./pages/symptomData.jsx";

function LandingWrapper() {
  const navigate = useNavigate();
  return <Landing onOpenGenerator={() => navigate("/hypnosis-generator")} />;
}

function GeneratorWrapper() {
  const navigate = useNavigate();
  return <Generator onBack={() => navigate("/")} />;
}

function SymptomPage({ slug }) {
  return <SymptomLandingPage data={symptomPages[slug]} />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/hypnosis-generator" element={<GeneratorWrapper />} />
        <Route path="/generator" element={<GeneratorWrapper />} />
        {Object.keys(symptomPages).map((slug) => (
          <Route
            key={slug}
            path={`/${slug}`}
            element={<SymptomPage slug={slug} />}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}
