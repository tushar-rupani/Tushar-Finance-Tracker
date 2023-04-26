import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useParams } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function Individual() {
    const params = useParams();
    let index = params.id;
    let dataToDisplay = JSON.parse(localStorage.getItem("expense-data"))[index];

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card sx={{ maxWidth: 345 }} >
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
                    subheader={`${dataToDisplay.month} ${dataToDisplay.year}`}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={dataToDisplay.selectedFile}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
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
                            <b>{dataToDisplay.from_account}</b>
                        </Typography>

                        <Typography paragraph>To Account:</Typography>
                        <Typography paragraph>
                            <b>{dataToDisplay.to_account}</b>
                        </Typography>

                        <Typography paragraph>Transaction</Typography>
                        <Typography paragraph>
                            <b>{dataToDisplay.transaction}</b>
                        </Typography>

                        <Typography paragraph>Amount</Typography>
                        <Typography paragraph>
                            <b>{dataToDisplay.amount}</b>
                        </Typography>



                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}