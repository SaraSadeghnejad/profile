import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  Collapse,
  Button,
} from "@mui/material";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { createLinks, getLinks } from "./api/userSetting";
import { useTranslation } from "react-i18next";
import Router, { useRouter } from "next/router";

type Props = {};
const data = [
  { label: "twitter", value: "twitter" },
  { label: "facebook", value: "facebook" },
  { label: "instagram", value: "instagram" },
  { label: "website", value: "website" },
];
function AddLinks({createdLinks}) {
        const router = useRouter();
  const [openRoute, setOpenRoute] = React.useState(false);
  const handleClickOne = () => {
    setOpenRoute(!openRoute);
  };
  const [validateUrl, setValid] = useState({
    url: "https://url.com",
    tempUrl: "",
  });
      const { t } = useTranslation();
  const isUrlValid = (url) =>
    url.length < 2 || !url.includes(".") || !url.startsWith("http");
  const [name, setName] = useState([]);
  const handleSubmit = () => {
    createLinks({ link: name })
      .then((response) => {
        createdLinks()
        setName("");
      })
      .catch();
  };
   
  return (
    <div>
      <div
        className="text-gray-800 dark:text-gray-200"
        style={{
          display: "flex",
          justifyContent: "end",
          cursor: "pointer",
          marginBottom: "1.5em",
        }}
        onClick={handleClickOne}
      >
        {t("form.add social")}
        <AddIcon />
      </div>

      <Collapse
        in={openRoute}
        timeout="auto"
        unmountOnExit
        sx={{ backgroundColor: "#eee", p: 2, my: 3 }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "end",
            mb: 2.5,
            mx: 0.5,
          }}
        >
          {" "}
          {t("form.add social")}
        </Typography>
        <Grid sx={{ mx: 0.5, display: "flex", p: 2 }}>
          <Autocomplete
            sx={router.locale === "fa" ? "rtl" : "ltr"}
            disablePortal
            id="combo-box-demo"
            options={data}
            sx={{ mx: 0.5, width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={t("form.type")} />
            )}
          />
          <TextField
            style={{direction:"ltr",textAlign:"ltr"}}
            id="outlined-basic"
            label={t("form.Link")}
            required
            error={isUrlValid(validateUrl.url)}
            helperText={
              isUrlValid(validateUrl.url)
                ? "محتویات این فیلد باید از جنس آدرس اینترنتی باشد"
                : ""
            }
            onChange={(e) => {
              setName(e.target.value),
                setValid({
                  url: validateUrl.tempUrl,
                  tempUrl: validateUrl.url,
                });
            }}
          />
        </Grid>
        <Grid sx={{ mx: 0.5, p: 2 }}>
          <Button variant="contained" sx={{ mx: 0.5 }} onClick={handleSubmit}>
            {t("form.submit social")}
          </Button>
          <Button
            variant="outlined"
            onclick={() => {
              handleReject();
            }}
          >
            {t("form.reject")}
          </Button>
        </Grid>
      </Collapse>
    </div>
  );
}

export default AddLinks;
