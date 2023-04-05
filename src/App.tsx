import Navbar from "./components/ui/Navbar";
import JobsList from "./components/jobs/JobsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Navbar />
      <JobsList />
      <ToastContainer />
    </>
  );
};

export default App;
