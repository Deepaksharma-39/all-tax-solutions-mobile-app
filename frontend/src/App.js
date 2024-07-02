import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

import SignIn from "./pages/SignIn";
import Home from "./pages/Dashboard/pages/Home";
import Border from "./pages/Dashboard/pages/Border";
import ProtectedRoute from "./utils/ProtectedRoute";
import Customer from "./pages/Dashboard/pages/Customer";
import Banner from "./pages/Dashboard/pages/Banner";
import Privacy from "./pages/Privacy";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 0,
      easing: "ease",
      once: true,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      {/* <RouteScrollToTop /> */}
      {/* <BranchLocater/> */}

      <Fragment>
        <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/privacy-policy" element={<Privacy />} />
        <Route exact path="/user-data" element={<SignIn />} />
          {/* Admin Section */}
          <Route exact path="/admin" element={<SignIn />} />

          <Route exact path="/admin" element={<ProtectedRoute />}>
            <Route exact path="/admin/dashboard" element={<Home />} />
            <Route exact path="/admin/border" element={<Border />} />
            <Route exact path="/admin/users" element={<Customer />} />
            <Route exact path="/admin/banners" element={<Banner />} />

          </Route>

          {/* Add more protected routes as needed */}
        </Routes>
      </Fragment>
      <ScrollToTop smooth color="#d8251e" />
    </BrowserRouter>
  );
}

export default App;
