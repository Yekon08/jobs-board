import { useContext } from "react";
import Navbar from "./components/ui/Navbar";
import JobsList from "./components/jobs/JobsList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./context/userContext";
import { Typography } from "@mui/material";
import { userContext } from "./interfaces/user";

const App = () => {
  const { currentUser }: userContext = useContext(UserContext);
  return (
    <>
      <Navbar />
      {currentUser ? (
        <JobsList />
      ) : (
        <Typography
          variant="h5"
          component="h3"
          sx={{ textAlign: "center" }}
          mt={12}
        >
          Connectez vous pour ajouter des travaux
        </Typography>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
