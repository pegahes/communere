import { Box, Button, Stack } from "@mui/material";
import EditForm from "./EditForm";
import { useEditingForm } from "./useEditingForm";

export default function CreateEditForms() {

  const { editingForm, saveForm, setEditingForm, forms , setSelectedFormId , selectedFormId} =
    useEditingForm();

  const handleAddForm = () => {};

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: 300,
          border: "1px solid #000",
        }}
      >
        <Box
          sx={{
            height: 60,
            borderBottom: "1px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={handleAddForm}>
            ADD A FORM
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {forms.map((form) => (
            <Box
              key={form.id}
              sx={{
                padding: 1,
                borderBottom: "1px solid #ccc",
                backgroundColor:
                  form.id === selectedFormId ? "lightblue" : "white",
                cursor: "pointer",
              }}
              onClick={() => setSelectedFormId(form.id)}
            >
              {form.name}
            </Box>
          ))}
        </Box>
      </Stack>

      <Box
        sx={{
          flex: 1,
          border: "1px solid #000",
        }}
      >
        {selectedFormId ? (
          <EditForm editingForm={editingForm} saveForm={saveForm} setEditingForm={setEditingForm}/>
        ) : (
          <Box sx={{ p: 2 }}>Select a form from the left.</Box>
        )}
      </Box>
    </Stack>
  );
}
