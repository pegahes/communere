import { Box, Button, IconButton, Stack } from "@mui/material";
import EditForm from "./EditForm";
import { useEditingForm } from "./useEditingForm";
import { Delete } from "@mui/icons-material";
import { Form } from "./type";

interface FormListItemProps {
  form: Form;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

function FormListItem({ form, isSelected, onSelect, onDelete }: FormListItemProps): JSX.Element {
  return (
  <Box
    onClick={onSelect}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 1,
      borderBottom: "1px solid #ccc",
    }}
  >
    <Box
      sx={{
        paddingX: 6,
        paddingY: 2,
        backgroundColor: isSelected ? "lightblue" : "white",
        cursor: "pointer",
      }}
    >
      {form.name}
    </Box>
    <IconButton onClick={onDelete} sx={{ marginLeft: "auto" }}>
      <Delete />
    </IconButton>
  </Box>

);
}

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
          <Button variant="contained" onClick={addNewForm}>
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
