"use client"
import { useState, useEffect, useRef } from "react";
import About from "../components/About";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ══════════════════════════════════════
   ABOUT
══════════════════════════════════════ */
function Aboutus() {const [expanded, setExpanded] = useState(false);

return (<>
      <Navbar/>
      <About/>
      <Footer/>
</>
);
}

export default Aboutus