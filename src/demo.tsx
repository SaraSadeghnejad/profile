import {
  Box,
  Card,
  Container,
  Grid,
  Typography
}
  from "@mui/material";
import React, { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { useTranslation } from "next-i18next";
import ChangeLang from "./ChangeLang";
import CreatedLinks from "./CreatedLinks";
import AddLinks from "./AddLinks";
import { getLinks } from "./api/userSetting";
type Props = {};
function demo({}: Props) {
  const { t } = useTranslation();
     const [trackerList, setTrackerList] = useState([]);
     const createdLinks = () =>{
         getLinks().then((response) => {
           setTrackerList(response.data);
         });
     }
        useEffect(() => {
          createdLinks();
        }, []);
  return (
    <div className="px-6 py-8 bg-white rounded-lg shadow-xl dark:bg-slate-800 ring-1 ring-slate-900/5">
      <Container maxWidth="md" sx={{ my: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            height: "100%",
          }}
        >
          <Grid
            container
            sx={{
              my: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid sx={{ flexGrow: 1, flexDirection: "row", display: "flex" }}>
              <ThemeToggler />
              <ChangeLang />
            </Grid>
            <Grid>
              <Typography>{t("form.userSetting")}</Typography>
            </Grid>
          </Grid>
          <Card xs={12} sx={{ mx: 0.5, p: 2 }}>
            <Typography
              className="text-gray-800 dark:text-gray-200"
              sx={{ display: "flex", justifyContent: "end", mb: 2.5, mx: 0.5 }}
            >
              {t("form.Socials")}
            </Typography>
            <AddLinks createdLinks={createdLinks} />
            <CreatedLinks
              trackerList={trackerList}
              createdLinks={createdLinks}
            />
          </Card>
        </Box>
      </Container>
    </div>
  );
}
export default demo;
