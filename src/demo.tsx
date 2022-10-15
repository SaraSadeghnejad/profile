import { Autocomplete, Box, Container, CssBaseline, Grid, Link, Paper, styled, TextField, Typography} from '@mui/material'
import React,{useState} from 'react'
import ThemeToggler from './ThemeToggler'
import Select from 'react-select'
type Props = {}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const data = [
    { label: "twitter", value: "twitter" },
    { label: "facebook", value: "facebook" },
    { label: "instagram", value: "instagram" },
    { label: "website", value: "website" }
  ]
function demo({}: Props) {
    const [date,setDate] = useState([]);
    const handleMonthDetail = (choice) =>{
        setDate(choice&&choice.value)
    }
  return (
    <>
     <Container maxWidth="sm">
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%'
      }}
    >
      <Grid container sx={{  mx: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Grid sx={{flexGrow: 1, flexDirection: 'row'}}>
    
  <ThemeToggler /><>English</><>فارسی</>
  
  </Grid>
  <Grid >
    
    <Typography>تنظیمات کاربری</Typography>
   
  </Grid>

  </Grid>
  <Grid xs={12}>
  <div className='select-month'>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
    <TextField id="outlined-basic" label="link" />
                                </div>
                                </Grid>
                                </Box>
      </Container>

    </>
  )
}

export default demo