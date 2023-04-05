import { Box, Modal } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, FormEvent, ChangeEvent } from "react";
import "dayjs/locale/fr";
import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";
import { toast } from "react-toastify";
import { jobsDesc } from "../../../interfaces/jobs";
import ModalContent from "./ModalContent";

interface Props {
  open: boolean;
  handleClose: () => void;
  type: "add" | "remove" | "edit";
  jobsCollectionRef: CollectionReference<DocumentData>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const ModalContainer = ({
  open,
  handleClose,
  type,
  jobsCollectionRef,
}: Props) => {
  const [jobValues, setJobValues] = useState<jobsDesc>({
    title: "",
    status: "En cours",
    site: "",
    note: "",
    link: "",
    salary: 0,
    type: "CDI",
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs());

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
      });
      toast.success("Ajouté !");
      handleClose();
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
