import {
  Card,
  Container,
  TextField,
  Typography,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/fr";
import { statusValues, contractType, jobsDesc } from "../../../interfaces/jobs";
import { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, ChangeEvent, FormEvent } from "react";

interface Props {
  jobValues: jobsDesc;
  setDate: Dispatch<SetStateAction<Dayjs | null>>;
  handleJobValues: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleJobForm: (e: FormEvent<EventTarget>) => Promise<void>;
  date: Dayjs | null;
}

const ModalContent = ({
  jobValues,
  setDate,
  handleJobValues,
  handleJobForm,
  date,
}: Props) => {
  return (
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
};

export default ModalContent;
