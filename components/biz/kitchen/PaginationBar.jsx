import React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

const PaginationBar = () => {
  return (
    <Stack sx={{marginTop:1}} spacing={2}>
      <Pagination count={5} color="primary" size="large" />
    </Stack>
  )
}

export default PaginationBar
