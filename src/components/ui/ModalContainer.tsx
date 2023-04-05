import {
  Box,
  Card,
  Container,
  Modal,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, FormEvent, ChangeEvent } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";
import { addDoc, CollectionReference, DocumentData } from "firebase/firestore";

const statusValues = [
  "En cours",
  "Refusé",
  "Accepté",
  "Test technique",
  "Call RH",
];

const contractType = ["CDI", "Freelance"];

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
  const [jobValues, setJobValues] = useState({
    title: "",
    status: "En cours",
    site: "",
    note: "",
    link: "",
    salary: 0,
    type: "CDI",
  });

  const [date, setDate] = useState<Dayjs | null>(null);

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
    } catch (err) {
      console.log(err);
    }
  };

  const addJob = (
    <Card variant="elevation" sx={{ p: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom align="center">
        Ajouter un travail :
      </Typography>
      <Container
        component="form"
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          minWidth: "550px",
        }}
        onSubmit={(e) => handleJobForm(e)}
      >
        <TextField
          variant="outlined"
          label="Titre"
          name="title"
          value={jobValues.title}
          onChange={(e) => handleJobValues(e)}
        />
        <TextField
          select
          variant="outlined"
          label="Statut"
          name="status"
          value={jobValues.status}
          onChange={(e) => handleJobValues(e)}
        >
          {statusValues.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          variant="outlined"
          label="Type de contrat"
          name="type"
          value={jobValues.type}
          onChange={(e) => handleJobValues(e)}
        >
          {contractType.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Site"
          name="site"
          value={jobValues.site}
          onChange={(e) => handleJobValues(e)}
        />
        <TextField
          variant="outlined"
          label="Lien de l'annonce"
          name="link"
          value={jobValues.link}
          onChange={(e) => handleJobValues(e)}
        />
        <TextField
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          variant="outlined"
          label="Salaire"
          name="salary"
          value={jobValues.salary}
          onChange={(e) => handleJobValues(e)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
          <DatePicker
            label="Date"
            defaultValue={dayjs()}
            value={date}
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>
        <TextField
          multiline
          variant="outlined"
          label="Note"
          name="note"
          value={jobValues.note}
          onChange={(e) => handleJobValues(e)}
        />
        <Button variant="contained" type="submit">
          enregistrer
        </Button>
      </Container>
    </Card>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{type === "add" ? addJob : <p>error</p>}</Box>
    </Modal>
  );
};

export default ModalContainer;
