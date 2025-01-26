import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormElement } from "./type";
import { Delete } from "@mui/icons-material";
import { useCallback } from "react";

interface ElementEditorProps {
  element: FormElement;
  onChange: (id: string, updatedElement: FormElement) => void;
  onDelete: (id: string) => void;
}


export function ElementEditor({ element, onChange, onDelete }: ElementEditorProps): JSX.Element {

  const handleChange = useCallback(
    (field: keyof FormElement, value: any) => {
      const updatedElement = { ...element, [field]: value };

      if (field === "type" && value === "checkbox" && !updatedElement.choices) {
        updatedElement.choices = [];
      }

      onChange(element.id, updatedElement);
    },
    [element, onChange]
  );

  const handleChoicesChange = useCallback(
    (value: string) => {
      const choiceNames = value.split("|");
      const updatedChoices = choiceNames.map((name, index) => ({
        id: `c${index + 1}`,
        name: name.trim(),
      }));
      handleChange("choices", updatedChoices);
    },
    [handleChange]
  );


  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginY: 2,
      }}
    >
      <IconButton
        onClick={() => onDelete(element.id)}
        sx={{
         width: 10,
         height: 10
        }}
      >
        <Delete />
      </IconButton>
      <TextField
        label="Label"
        value={element.label}
        onChange={(e) => handleChange("label", e.target.value)}
        fullWidth
      />

      <Select
        label="Type"
        value={element.type}
        onChange={(e) => handleChange("type", e.target.value)}
        fullWidth
      >
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="checkbox">Checkbox</MenuItem>
      </Select>

      <FormControlLabel
        control={
          <Checkbox
            checked={element.isRequired || false}
            onChange={(e) => handleChange("isRequired", e.target.checked)}
          />
        }
        label="Required"
      />

      {element.type === "checkbox" && (
        <TextField
          label="Choices (| separated)"
          value={element.choices?.map((choice) => choice.name).join(" | ") || ""}
          onChange={(e) => handleChoicesChange(e.target.value)}
          fullWidth
        />
      )}
    </Box>
  );
}
