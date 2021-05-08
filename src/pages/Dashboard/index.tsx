import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';

import { TableData } from '../../components/Table';

export function Dashboard() {

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography>
            <Box fontSize="h6.fontSize" fontWeight={500} textAlign="center" mx="auto">
              Gerenciamento de produtos
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>

      <TableData />
    </>
  )
}