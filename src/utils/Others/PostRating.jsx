import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { Share } from '@mui/icons-material';

const labels = {
  1: 'Horrible',
  2: 'Bad',
  3: 'Ok',
  4: 'Good',
  5: 'Amazing',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function PostRating({likes,readOnly}) {
  //TODO: Add Real Rating Instead of useState
  const [value, setValue] = React.useState(likes.length);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom:"10px"
      }}
    >
      <Rating
        name="hover-feedback"
        readOnly={readOnly}
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          //TODO: Setup Rating System Here
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />

      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}