import { Autocomplete,Grid, Link,  TextField, Typography,  Collapse,  Button, Card} from '@mui/material';
import React,{useState} from 'react';

import { useTranslation } from "next-i18next";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import PublicIcon from '@mui/icons-material/Public';
import { useRouter } from 'next/router';
import { deleteLinks } from './api/userSetting';

type Props = {}
  const data = [
    { label: "twitter", value: "twitter" },
    { label: "facebook", value: "facebook" },
    { label: "instagram", value: "instagram" },
    { label: "website", value: "website" },
  ];
function CreatedLinks({trackerList,createdLinks}) {
    const router = useRouter();
    const [validateUrl, setValid] = useState({
      url: "https://url.com",
      tempUrl: "",
    });
    const isUrlValid = (url) =>
      url.length < 2 || !url.includes(".") || !url.startsWith("http");
    const { t } = useTranslation();
    
          const [open, setOpen] = React.useState(false);
          const handleClick = (id) => {
            setOpen({ [id]: !open[id] });
          };
      const handleDelete=(id)=>{
            deleteLinks(id)
              .then((response) => {
                createdLinks();
      
              })
              .catch();
      }
  return (
    <div>
      {trackerList.map((tracker) => (
        <Card sx={{ mt: 1 }} key={tracker.id}>
          <Grid
            sx={{
              flexDirection: "row",
              display: "flex",
              backgroundColor: "#eee",
              p: 2,
            }}
          >
            <Grid sx={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
              <div
                style={{
                  color: "red",
                  margin: "0 .5em  1.5em .5em",
                  cursor: "pointer",
                }}
                onClick={()=>{handleDelete(tracker.id)}}
              >
                {t("form.delete")}
              </div>
              <DeleteIcon sx={{ color: "red", cursor: "pointer" }} />
              <div
                onClick={() => {
                  handleClick(tracker.id);
                }}
                style={{
                  color: "rgb(255, 168, 46)",
                  margin: "0 .5em 1.5em .5em",
                  cursor: "pointer",
                }}
              >
                {t("form.edit")}
              </div>
              <CreateIcon
                sx={{ color: "rgb(255, 168, 46)", cursor: "pointer" }}
              />
            </Grid>
            <Grid sx={{ flexDirection: "row", display: "flex" }}>
              <Link color="rgb(255, 168, 46)">{tracker.link}</Link>
              <Typography
                className={`bg-white-100 dark:bg-slate-900 ${
                  router.locale === "fa" ? "rtl-header" : "ltr-header"
                }`}
                sx={{ mx: 0.8 }}
              >
                :{t("form.Link")}
              </Typography>
              <PublicIcon />
            </Grid>
          </Grid>
          <Collapse
            in={open[tracker.id]}
            timeout="auto"
            unmountOnExit
            sx={{ backgroundColor: "#eee", p: 2 }}
          >
            <Typography
              className="text-gray-800 dark:text-gray-200"
              sx={{ display: "flex", justifyContent: "end", mx: 2.5 }}
            >
              {t("form.edit social")}
            </Typography>
            <Grid
              sx={{
                mx: 0.5,
                display: "flex",
                backgroundColor: "#eee",
                p: 2,
                justifyContent: "center",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={data}
                sx={{ mx: 0.5, width: 400 }}
                renderInput={(params) => <TextField {...params} label={t("form.type")} />}
              />

              <TextField
                id="outlined-basic"
                label={t("form.Link")}
                required
                error={isUrlValid(validateUrl.url)}
                helperText={
                  isUrlValid(validateUrl.url) ? "URL is not correct" : ""
                }
                onChange={(event) =>
                  setValid({
                    url: "https://url.com",
                    tempUrl: event.target.value,
                  })
                }
                sx={{ mx: 0.5, maxWidth: 500 }}
              />
            </Grid>

            <Button
              variant="contained"
              className="text-gray-800 dark:text-gray-200"
              sx={{ mx: 2.5 }}
            >
              {t("form.edit social")}
            </Button>
            <Button
              variant="outlined"
              className="text-gray-800 dark:text-gray-200"
              onClick={()=>{setOpen({ [tracker.id]: !open[tracker.id] });}}
            >
              {t("form.reject")}
            </Button>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default CreatedLinks