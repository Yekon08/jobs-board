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
          <Typography variant="h5" component="div" gutterBottom>
            {data.title}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {dayjs(data.date).format("DD/MM/YYYY")}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.status}
          </Typography>
          <Typography variant="body2">{data.note}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default JobsCard;
