import { Box,Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TabPanel from "./TabPanel";
import PreviewForms from "./PreviewForms";
import CreateEditForms from "./CreateEditForms";

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center", 
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        aria-label="Main Tabs"
        sx={{
          "& .Mui-focusVisible": {
            outline: "none",
          },
        }}
      >
        <Tab
          label="Create & Edit Forms"
          sx={{
            ":focus": { outline: "none" },
          }}
        />
        <Tab
          label="Preview Forms"
          sx={{
            ":focus": { outline: "none" },
          }}
        />
      </Tabs>

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
