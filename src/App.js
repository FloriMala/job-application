import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { createBrowserHistory as history } from "history";
import SignInContainer from "./pages/SignInContainer";
import SignUpContainer from "./pages/SignUpContainer";
import ProfileContainer from "./pages/ProfileContainer";
import AddJobContainer from "./pages/AddJobContainer";
import ProtectiveRoute from "./pages/ProtectiveRoute";
import Navbar from "./layout/navbar/Navbar";
import SearchContainer from "./pages/SearchContainer";

function App() {
  localStorage.setItem("showNavbar", true);

  return (
    <Router history={history}>
      <Routes>
        <Route
          element={
            <>
              <ProtectiveRoute>
                <Navbar />
                <Outlet />
              </ProtectiveRoute>
            </>
          }
        >
          <Route
            path="/jobs"
            element={
              <ProtectiveRoute>
                <SearchContainer />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/addjob"
            element={
              <ProtectiveRoute employee={true}>
                <AddJobContainer />
              </ProtectiveRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectiveRoute>
                <ProfileContainer />
              </ProtectiveRoute>
            }
          />
        </Route>
        <Route exact path="/" element={<SignInContainer />} />
        <Route exact path="/signup" element={<SignUpContainer />} />
      </Routes>
    </Router>
  );
}

export default App;
