
import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles';
import ThemeToggler from '../src/ThemeToggler';
import { Box, Container, Grid } from '@mui/material';
import Demo from '../src/demo';
type Props = {}

const index = (props: Props) => {
  return (
<div className="container mx-auto">

<Demo />
</div>


  )
}

export default index