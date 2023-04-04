import { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import JobsCard from "./JobsCard";
import { jobsDesc } from "../../interfaces/jobs";
import { Container } from "@mui/material";

const JobsList = () => {
  const [jobsList, setJobsList] = useState<[] | jobsDesc[]>([]);

  const jobsCollectionRef = collection(db, "jobs");

  const handleFetchJobs = async () => {
    try {
      const data = await getDocs(jobsCollectionRef);
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

  console.log("data: ", jobsList);

  if (jobsList.length === 0) {
    return <p>Add some jobs ...</p>;
  }

  return (
    <Container maxWidth="md">
      {jobsList.map((job) => (
        <JobsCard key={job.id} data={job} />
      ))}
    </Container>
  );
};

export default JobsList;
