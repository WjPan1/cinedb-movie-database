import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "../context/GlobalContext";

import Header from "../components/Header";
import Footer from "../components/Footer";

import About from "../pages/About";
import Watchlist from "../pages/Watchlist";
import Home from "../pages/Home";
import PageSingleMovie from "../pages/PageSingleMovie";

import SearchResult from "../pages/SearchResult";

function AppRouter () {
   
   return (
      <BrowserRouter basename="test-cinedb">
         <GlobalProvider>
            <div className="site-container">

               <Header />
               
               <Routes>
                  <Route path="/*" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/movie/:id" element={<PageSingleMovie />} />
                  <Route path="/search/:query" element={<SearchResult />} />
               </Routes>

               <Footer />
            </div>
         </GlobalProvider>
      </BrowserRouter>
   )
}

export default AppRouter;