import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormElement } from "../type";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from "react";
import useFormPreview from "../hooks/useSubmitForm";
import { ElementEditor } from "./EditElement";

const renderInput = (
  element: FormElement,
  register: any,
  errors: Record<string, any>
): React.ReactNode => {
  switch (element.type) {
    case "text":
      return (
        <TextField
          fullWidth
          {...register(element.id)}
          error={!!errors[element.id]}
          helperText={errors[element.id]?.message || ""}
        />
      );
    case "checkbox":
      return (
        <Box>
          {element.choices?.map((choice) => (
            <FormControlLabel
              key={choice.id}
              control={<Checkbox {...register(`${element.id}.${choice.id}`)} />}
              label={choice.name}
            />
          ))}
          {errors[element.id] && (
            <Typography color="error">{errors[element.id]?.message}</Typography>
          )}
        </Box>
      );
    default:
      return null;
  }
};

interface EditFormProps {
  editingForm: Form | null;
  saveForm: () => void;
  setEditingForm: (form: Form | null) => void;
}

export default function EditForm({
  editingForm,
  saveForm,
  setEditingForm,
}: EditFormProps): JSX.Element {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { register,  handleSubmit, errors } = useFormPreview(
    editingForm?.elements || []
  );

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
      const updatedElements = editingForm.elements.filter(
        (element) => element.id !== id
      );
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
      isRequired: false,
    };
    setEditingForm({
      ...editingForm,
      elements: [...editingForm.elements, newElement],
    });
  };

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Button
        sx={{ my: 4, backgroundColor: "#7371fc", color: "#fff" }}
        variant="contained"
        onClick={handlePreviewOpen}
      >
        Preview this form
      </Button>
      <Dialog
        open={isPreviewOpen}
        onClose={handlePreviewClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Form Preview</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSubmit)}>
            <Box>
              <h3>{editingForm.name}</h3>
              {editingForm.elements.map((element) => (
                <Box key={element.id} sx={{ mb: 3 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {element.label} {element.isRequired && "*"}
                  </Typography>
                  {renderInput(element, register, errors)}
                </Box>
              ))}
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <TextField
        label="Form Name"
        value={editingForm.name}
        fullWidth
        onChange={(e) =>
          setEditingForm({ ...editingForm, name: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <Button
      sx={{border: "1px solid #30638e", color:'#30638e'}}
        onClick={() => handleAddElement()}
      >
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
      <Button sx={{backgroundColor: '#006494', color: '#fff'}} onClick={() => saveForm()}>
        Save
      </Button>
    </Box>
  );
}
