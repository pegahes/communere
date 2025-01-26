import { Box} from "@mui/material";
import CreateEditForms from "./components/container";

function App() {

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          alignItems: "flex-start",
          p: 4,
        }}
      >
     <CreateEditForms />
    
      </Box>
    </Box>
  );
}

export default App;
