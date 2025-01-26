import { Box, Button, Stack } from "@mui/material";
import EditForm from "./EditForm";
import { useEditingForm } from "../hooks/useEditingForm";
import { FormListItem } from "./FormItem";

export default function CreateEditForms(): JSX.Element {

  const { editingForm, saveForm, setEditingForm, forms , setSelectedFormId , selectedFormId, addNewForm, deleteFromForms} =
    useEditingForm();

    const handleFormClick = (id: string) => () => setSelectedFormId(id);

    const handleDeleteClick = (id: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      deleteFromForms(id);
    };

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: '#eff2f1',
        width: "100%",
        height: "100%",
        borderRadius: 8
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: 300,
        }}
      >
        <Box
          sx={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button sx={{backgroundColor: '#03045e'}} variant="contained" onClick={addNewForm}>
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
              <FormListItem
              key={form.id}
              form={form}
              isSelected={form.id === selectedFormId}
              onSelect={handleFormClick(form.id)}
              onDelete={handleDeleteClick(form.id)}
            />
          ))}
        </Box>
      </Stack>

      <Box
        sx={{
          flex: 1,
          borderLeft: "1px solid #30638e",
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
