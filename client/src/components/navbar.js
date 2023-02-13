import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Head = styled('div')({
  color: 'white',
  backgroundColor: 'rgb(243, 156, 24)',
  padding: 9,
  paddingLeft: 15,
  paddingRight: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)'

});

export default function Navbar({classes}) {
  let percentage = 0;
  let total = 0;
  let finished = 0;
  classes.map(clas=>{
    clas.contents.map(content=>{
      if(content.finished)
        ++finished;
      ++total;
    })
  });
  // console.log('total: ',total);
  if(total!=0)
  percentage = Number(parseInt(finished/total * 100))
  return (
    <Head>
        <Box>
          <Typography sx={{fontWeight: 'bold'}}>Kiwify Members Area</Typography>
        </Box>
        <Box sx={{display: 'flex'}}>
          <Box sx={{mr:2}} className="w-10 h-10 text-xl">
            <CircularProgressbar styles={buildStyles({
              // Text size
              textSize: '30px',
              // Colors
              pathColor: `white`,
              textColor: 'white',
            })} value={percentage} text={`${percentage}%`} />
          </Box>
          <Box>
            <Avatar size="sm" variant='solid' />
          </Box>
        </Box>
    </Head>
  )
}


function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{color: 'white'}} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{color: 'white'}}
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
