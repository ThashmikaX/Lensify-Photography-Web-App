import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function NextButton(props) {
  return (
      <Button variant="outlined" endIcon={<SendIcon />}>
        {props.children}
      </Button>
  );
}
