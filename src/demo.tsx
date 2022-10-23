import { Autocomplete, Box, Container, CssBaseline, FormControl, Grid, Link, MenuItem, Paper, styled,Select, TextField, Typography, ListItem, ListItemText, Collapse, List, ListItemIcon, Button, Card} from '@mui/material'
import React,{useEffect, useState} from 'react'
import ThemeToggler from './ThemeToggler'
import { useRouter } from 'next/router'

import { useTranslation } from "next-i18next";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PublicIcon from '@mui/icons-material/Public';
import validator from 'validator'
import { createLinks, getLinks } from './api/userSetting';
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

  const router = useRouter();
  const { t } = useTranslation();
  const handleLocaleChange = (event) => {
      const value = event.target.value;

      router.push(router.route, router.asPath, {
          locale: value,
      });
  };
  const [open, setOpen] = React.useState(false);
  const handleClick = (id) => {
    setOpen(!open);
  }; 
  const [openRoute, setOpenRoute] = React.useState(false);
  const handleClickOne = () => {
    setOpenRoute(!openRoute);
  };
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  }; 
  const [isActive, setIsActive] = useState(false);

  const handleClickActive = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };
   
  const [validateUrl, setValid] = useState({ url: 'https://url.com', tempUrl: '' })

 const isUrlValid = (url) => url.length < 2 || !url.includes('.') || !url.startsWith('http')

 const [name, setName] = useState([]);
 const handleSubmit = () => {
  createLinks({ link: name  })
  .then(response => {
    getLinks()
    setName("");
}).catch();

    }
    const [trackerList,setTrackerList]= useState([]);
    useEffect(() => {
      getLinks()
            .then((response) => {
              setTrackerList(response.data);
            })
  
    }, []);

  return (
    <>
     <Container maxWidth="md" sx={{my:10}}>
     <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%'
      }}
    >
      <Grid container sx={{ my:8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Grid sx={{flexGrow: 1, flexDirection: 'row',display: 'flex'}}>

  <ThemeToggler />

  
  <FormControl sx={{ m: 1, minWidth: 120}} size="small">
                <Select
                    label={router.locale}
                    value={router.locale}
                    onChange={handleLocaleChange}
                >
                    <MenuItem value="fa" className="text-gray-800 dark:text-gray-200">فارسی </MenuItem>
                    <MenuItem value="en" className="text-gray-800 dark:text-gray-200">English</MenuItem>
                </Select>
            </FormControl>
  </Grid>
  <Grid >
    <Typography>{t("form.userSetting")}</Typography>
  </Grid>

  </Grid>


   <Card xs={12} sx={{ mx: 0.5,p:2}} className="bg-white dark:bg-slate-800"> 
   <Typography className="text-gray-800 dark:text-gray-200" sx={{ display:"flex",justifyContent:"end",mb:2.5,mx:.5}}>مسیرهای ارتباطی</Typography>
   <div className="text-gray-800 dark:text-gray-200" style={{display:"flex",justifyContent:"end",cursor:"pointer",marginBottom:"1.5em"}} onClick={handleClickOne}>
افزودن مسیر ارتباطی   <AddIcon  /> 
   </div>

   <Collapse in={openRoute} timeout="auto" unmountOnExit sx={{ backgroundColor:"#eee",p:2,my:3}}>
   <Typography sx={{ display:"flex",justifyContent:"end",mb:2.5,mx:.5}}> افزودن مسیرهای ارتباطی </Typography>
    <Grid sx={{ mx: 0.5,display: 'flex',p:2}}>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{  mx: 0.5,width: 300 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />
    <TextField id="outlined-basic"  
 label="link"   
 required
 error={isUrlValid(validateUrl.url)}
 helperText={isUrlValid(validateUrl.url) ? "محتویات این فیلد باید از جنس آدرس اینترنتی باشد" : ""}
 onChange={(e) => {setName(e.target.value),setValid({  url: validateUrl.tempUrl, tempUrl: validateUrl.url})}} />  
  
      </Grid>  
      <Grid sx={{ mx: 0.5,p:2}}>
    <Button variant="contained"   sx={{  mx: 0.5 }} onClick={handleSubmit} >ثبت مسیر ارتباطی</Button>
      <Button variant="outlined">انصراف</Button>
      </Grid>
        </Collapse>
{trackerList&&trackerList.map((tracker) =>(<Card sx={{mt:1}} key={tracker.id}>
    <Grid sx={{flexDirection: 'row',display: 'flex', backgroundColor:"#eee",p:2}}>
    <Grid sx={{flexGrow: 1, flexDirection: 'row',display: 'flex'}}>
      <div style={{ color: "red" ,margin:"0 .5em  1.5em .5em",cursor:"pointer"}} >حذف</div><DeleteIcon sx={{ color: "red",cursor:"pointer" }} />
  <div onClick={()=>{handleClick(tracker.id)}}  style={{ color: "rgb(255, 168, 46)",margin:"0 .5em 1.5em .5em",cursor:"pointer"}}  >{t("form.edit")}</div><CreateIcon sx={{ color: "rgb(255, 168, 46)",cursor:"pointer" }} />

</Grid>
<Grid sx={{flexDirection: 'row',display: 'flex'}}>
<Link  color="rgb(255, 168, 46)">{tracker.link}</Link><Typography className="text-gray-800 dark:text-gray-200" sx={{mx:0.8}} >:وب سایت لینک </Typography><PublicIcon />
</Grid>

</Grid>
<Collapse in={open} timeout="auto" unmountOnExit sx={{ backgroundColor:"#eee",p:2}}>
<Typography className="text-gray-800 dark:text-gray-200" sx={{ display:"flex",justifyContent:"end",mx:2.5}} >ویرایش مسیر ارتباطی وبسایت</Typography> 
<Grid  sx={{ mx: 0.5,display: 'flex',backgroundColor:"#eee",p:2,justifyContent:"center" }}>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{  mx: 0.5,width: 400 }}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />
 
    <TextField id="outlined-basic" label="link"   
 required
 error={isUrlValid(validateUrl.url)}
 helperText={isUrlValid(validateUrl.url) ? "URL is not correct" : ""}
 onChange={event => setValid({ url: 'https://url.com', tempUrl: event.target.value })}  sx={{  mx: 0.5,maxWidth: 500 }} /> 
  
       </Grid>

<Button variant="contained" className="text-gray-800 dark:text-gray-200"  sx={{  mx: 2.5 }} >ویرایش مسیر ارتباطی</Button>
<Button variant="outlined" className="text-gray-800 dark:text-gray-200">انصراف</Button>
    
</Collapse>
</Card>))}
    </Card>





                            
                                </Box>
      </Container>

    </>
  )
}
export default demo;


