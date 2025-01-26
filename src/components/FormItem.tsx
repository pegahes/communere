import { Delete } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Form } from "../type";


interface FormListItemProps {
    form: Form;
    isSelected: boolean;
    onSelect: () => void;
    onDelete?: (e: React.MouseEvent) => void;
  }
  
  export function FormListItem({ form, isSelected, onSelect, onDelete }: FormListItemProps): JSX.Element {
    return (
    <Box
      onClick={onSelect}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 1,
        borderBottom: "1px solid #c9cad9",
      }}
    >
      <Box
        sx={{
          paddingX: 6,
          paddingY: 2,
          color: isSelected ? "#7371fc" : "#13293d",
          cursor: "pointer",
        }}
      >
        {form.name}
      </Box>
      <IconButton onClick={onDelete} sx={{ marginLeft: "auto", color: '#c9cad9' }}>
        <Delete />
      </IconButton>
    </Box>
  
  );
  }