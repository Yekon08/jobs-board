import { useContext, useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import JobsCard from "./JobsCard";
import { jobsDesc } from "../../interfaces/jobs";
import { Button, Container, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalContainer from "../ui/modal/ModalContainer";
import { UserContext } from "../../context/userContext";
import { userContext } from "../../interfaces/user";

const JobsList = () => {
  const [jobsList, setJobsList] = useState<[] | jobsDesc[] | any>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentUser }: userContext = useContext(UserContext);

  if (!currentUser) {
    return null;
  }

  const jobsCollectionRef = collection(db, "jobs");
  const q = query(jobsCollectionRef, where("userId", "==", currentUser.uid));

  const handleFetchJobs = async () => {
    try {
      const data = await getDocs(q);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setJobsList(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchJobs();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ display: "flex", alignItems: "center", marginTop: "50px" }}
        >
          <AddIcon /> ajouter un travail
        </Button>
      </Box>
      {jobsList.map((job: jobsDesc) => (
        <JobsCard key={job.id} data={job} handleFetchJobs={handleFetchJobs} />
      ))}

      <ModalContainer
        open={open}
        handleClose={handleClose}
        type="add"
        jobsCollectionRef={jobsCollectionRef}
        handleFetchJobs={handleFetchJobs}
      />
    </Container>
  );
};

export default JobsList;
