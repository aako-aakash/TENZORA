import { useState, useEffect } from "react";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
    const [soundOn, setSoundOn] = useState(true);
    const [isTabActive, setIsTabActive] = useState(true);

     // 🔕 Mute sound when tab is inactive
    useEffect(() => {
      function handleVisibilityChange() {
        setIsTabActive(!document.hidden);
      }

      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }, []);

    return (
      <>
        <Header soundOn={soundOn} setSoundOn={setSoundOn}/>
        <MainPage soundOn={soundOn } isTabActive={isTabActive} />
        <Footer />
      </>
    );
}

