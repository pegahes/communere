import { Box, Button, TextField } from "@mui/material";
import { Form, FormElement } from "./type";
import { ElementEditor } from "./ElementEditor";
import { v4 as uuidv4 } from "uuid";
import { useCallback } from "react";

interface EditFormProps {
  editingForm: Form | null;
  saveForm: () => void;
  setEditingForm: (form: Form | null) => void;
}

export default function EditForm({ editingForm, saveForm, setEditingForm }: EditFormProps): JSX.Element {
 

  const handleElementChange = useCallback(
    (id: string, updatedElement: FormElement) => {
      if (!editingForm) return;
      const updatedElements = editingForm.elements.map((element) =>
        element.id === id ? updatedElement : element
      );
      setEditingForm({ ...editingForm, elements: updatedElements });
    },
    [editingForm, setEditingForm]
  );

  const handleElementDelete = useCallback(
    (id: string) => {
      if (!editingForm) return;
      const updatedElements = editingForm.elements.filter((element) => element.id !== id);
      setEditingForm({ ...editingForm, elements: updatedElements });
    },
    [editingForm, setEditingForm]
  );

  if (!editingForm || !editingForm.elements) {
    return <Box sx={{ p: 2 }}>Loading...</Box>;
  }

  const handleAddElement = () => {
    const newElement: FormElement = {
      id: uuidv4(),
      type: "text",
      label: "label",
      isRequired: false
    };
    setEditingForm({
      ...editingForm,
      elements: [...editingForm.elements, newElement],
    });
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
          onDelete={handleElementDelete}
          onChange={handleElementChange}
        />
      ))}
      <Button variant="contained" color="primary" onClick={() => saveForm()}>
        Save
      </Button>
    </Box>
  );
}
