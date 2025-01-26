import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { store } from "../store";
import { Form } from "../type";

export const useEditingForm = () => {
  const [editingForm, setEditingForm] = useState<Form | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const forms = store((state) => state.forms);
  const addForm = store((state) => state.addForm);
  const updateForm = store((state) => state.updateForm);
  const deleteForm = store((state) => state.deleteForm);

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
    deleteFromForms,
  };
};
