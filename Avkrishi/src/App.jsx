import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPg from "./pages/StartPg";
import Home from "./pages/Home";
import Login from "./utils/Login";
import Role from "./pages/Role";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import CreateBatch from "./pages/CreateBatch";
import TraceBatch from "./pages/TraceBatch";
import BatchDetails from "./pages/BatchDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StartPg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-batch" element={<CreateBatch />} />
          <Route path="/trace-batch" element={<TraceBatch />} />
          <Route path="/batch-details/:batchId" element={<BatchDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
