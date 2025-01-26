import { Box, Button, TextField } from "@mui/material";
import { FormElement } from "./type";
import { ElementEditor } from "./ElementEditor";

export default function EditForm({
  editingForm,
  saveForm,
  setEditingForm,
}: {
  editingForm: any;
  saveForm: () => void;
  setEditingForm: (form: any) => void;
}) {
  if (!editingForm || !editingForm.elements) {
    return <Box sx={{ p: 2 }}>Loading...</Box>;
  }

  const handleAddElement = () => {
    const newElement: FormElement = {
      id: `e${editingForm.elements.length + 1}`,
      type: "text",
      label: "label",
      isRequired: false
    };
    setEditingForm({
      ...editingForm,
      elements: [...editingForm.elements, newElement],
    });
  };

  const handleElementChange = (id: string, updatedElement: FormElement) => {
    const updatedElements = editingForm.elements.map((element: FormElement) =>
      element.id === id ? updatedElement : element
    );
    setEditingForm({ ...editingForm, elements: updatedElements });
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Form Name"
        value={editingForm.name}
        fullWidth
        onChange={(e) =>
          setEditingForm({ ...editingForm, name: e.target.value })
        }
        sx={{ mb: 2 }}
      />
           <Button variant="contained" color="primary" onClick={() => handleAddElement()}>
        ADD ELEMENT
      </Button>
      {editingForm.elements.map((element: FormElement, index: number) => (
        <ElementEditor
          key={element.id}
          element={element}
          onChange={(id: string ,updatedElement: FormElement) =>
            handleElementChange(id, updatedElement)
          }
        />
      ))}
      <Button variant="contained" color="primary" onClick={() => saveForm()}>
        Save
      </Button>
    </Box>
  );
}
