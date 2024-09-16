import { Container, ThemeProvider, Typography } from '@mui/material';
import MainTable from './MainTable';
import darkTheme from './Theme';


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Typography variant='h3' sx={{ my: 5 }}>ML Engineer Salaries</Typography>
        <MainTable />
      </Container>
    </ThemeProvider>
  );
}

export default App;
