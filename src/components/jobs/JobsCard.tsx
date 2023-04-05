import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { jobsDesc } from "../../interfaces/jobs";
import dayjs from "dayjs";

interface Props {
  data: jobsDesc;
}

const JobsCard = ({ data }: Props) => {
  return (
    <Box sx={{ marginTop: 6 }}>
      <Card variant="elevation">
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={
              data.status === "Refusé"
                ? "error"
                : data.status !== "En cours"
                ? "primary"
                : "text.secondary"
            }
            gutterBottom
          >
            {data.status}
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom>
            {data.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {data.type} {data.salary}€
          </Typography>
          <Typography color="text.secondary">
            {dayjs(data.date).format("DD/MM/YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.status}
          </Typography>
          <Typography variant="body2">{data.note}</Typography>
        </CardContent>
        <CardActions>
          <Button href={data.site} size="small" variant="outlined">
            {`Site de l'entreprise`}
          </Button>
          <Button href={data.link} size="small" variant="outlined">
            {`Lien de l'annonce`}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default JobsCard;
