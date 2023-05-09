import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { Navbar } from "../Home/Navbar";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function Individual() {
  const params = useParams();
  let index = params.id;
  let dataToDisplay = JSON.parse(localStorage.getItem("expense-data"));
  dataToDisplay = dataToDisplay.filter((data) => data.id === Number(index));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                T
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Tushar Rupani"
            subheader={`${dataToDisplay[0].month} ${dataToDisplay[0].year}`}
          />
          {dataToDisplay[0].fileBase64 && (
            <CardMedia
              component="img"
              height="194"
              image={dataToDisplay[0].fileBase64 && dataToDisplay[0].fileBase64}
              alt="No Image selected"
            />
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Notes: {dataToDisplay[0].notes}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Typography variant="subtitle1" onClick={handleExpandClick}>
                Expand for more details
              </Typography>
            </IconButton>

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>From Account:</Typography>
              <Typography paragraph>
                <b>{dataToDisplay[0].from_account}</b>
              </Typography>

              <Typography paragraph>To Account:</Typography>
              <Typography paragraph>
                <b>{dataToDisplay[0].to_account}</b>
              </Typography>

              <Typography paragraph>Transaction</Typography>
              <Typography paragraph>
                <b>{dataToDisplay[0].transaction_type}</b>
              </Typography>

              <Typography paragraph>Amount</Typography>
              <Typography paragraph>
                <b>
                  {dataToDisplay[0].currency}
                  {dataToDisplay[0].amount.toLocaleString("en-IN")}
                </b>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}
