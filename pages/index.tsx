
import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles';
import ThemeToggler from '../src/ThemeToggler';
import { Box, Container, Grid } from '@mui/material';
import Demo from '../src/demo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
type Props = {}

const index = (props: Props) => {
  return (
<div className="container mx-auto">
<Demo />
</div>

  )
}

export default index
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}