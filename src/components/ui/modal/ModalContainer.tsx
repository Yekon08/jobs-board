import { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Box, Modal } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";
import { toast } from "react-toastify";
import { jobsDesc } from "../../../interfaces/jobs";
import { userContext } from "../../../interfaces/user";
import ModalContent from "./ModalContent";
import { UserContext } from "../../../context/userContext";

interface Props {
  open: boolean;
  handleClose: () => void;
  type: "add" | "remove" | "edit";
  jobsCollectionRef: CollectionReference<DocumentData>;
  handleFetchJobs: () => Promise<void>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const initialValues = {
  title: "",
  status: "En cours",
  site: "",
  note: "",
  link: "",
  salary: 0,
  type: "CDI",
};

const ModalContainer = ({
  open,
  handleClose,
  type,
  jobsCollectionRef,
  handleFetchJobs,
}: Props) => {
  const [jobValues, setJobValues] = useState<jobsDesc>(initialValues);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const { currentUser }: userContext = useContext(UserContext);

  const handleJobValues = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobValues({
      ...jobValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobForm = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    try {
      await addDoc(jobsCollectionRef, {
        ...jobValues,
        date: dayjs(date).format(),
        userId: currentUser?.uid,
      });
      setJobValues(initialValues);
      handleFetchJobs();
      handleClose();
      toast.success("Ajouté !");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {type === "add" ? (
            <ModalContent
              jobValues={jobValues}
              date={date}
              setDate={setDate}
              handleJobValues={handleJobValues}
              handleJobForm={handleJobForm}
            />
          ) : (
            <p>error</p>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ModalContainer;
