import { useEffect, useState } from "react";
import { Form } from "./type";
import { useFormsStore } from "./useFormStore";
import { v4 as uuidv4 } from 'uuid';

export const useEditingForm = () => {
  const [editingForm, setEditingForm] = useState<any | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<any | null>(null);

  const forms = useFormsStore((state) => state.forms);
  const addForm = useFormsStore((state) => state.addForm);
  const updateForm = useFormsStore((state) => state.updateForm);
  const deleteForm = useFormsStore((state) => state.deleteForm);

  useEffect(() => {
    if (forms.length > 0) {
      const selectedForm = forms.find((form) => form.id === selectedFormId);
      if (selectedForm) {
        setEditingForm({ ...selectedForm });
      } else if (selectedFormId === null) {
        setSelectedFormId(forms[0].id);
        setEditingForm(forms[0]);
      }
    } else {
      setSelectedFormId(null);
      setEditingForm(null);
    }
  }, [selectedFormId, forms]);

  const saveForm = () => {
    if (editingForm) {
      updateForm(editingForm);
    }
  };

  const addNewForm = () => {

    const newFormId = uuidv4(); 
    const newForm: Form = {
      id: newFormId,
      name: `Form ${forms.length + 1}`,
      elements: [
        {
          id: 'e1', 
          type: "text",
          label: "New Label",
          isRequired: false,
        },
      ],
    };
   
    addForm(newForm);
    setSelectedFormId(newFormId)
  }

  const deleteFromForms = (id: string) => {
    if (id == selectedFormId) {
   
        setSelectedFormId(null); 
      
    }
    deleteForm(id);
   
  }

  return {
    editingForm,
    saveForm,
    setEditingForm,
    forms,
    setSelectedFormId,
    selectedFormId,
    addNewForm,
    deleteFromForms
  };
};
