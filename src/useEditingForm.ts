import { useEffect, useState } from "react";
import { Form } from "./type";

export const useEditingForm = () => {
  const [editingForm, setEditingForm] = useState<any | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<any | null>(null);

  const [forms, setForms] = useState<Form[]>([
    {
      id: "f1",
      name: "Form One",
      elements: [
        {
          id: "e1",
          type: "text",
          label: "First Name",
          isRequired: true,
        },
        {
          id: "e2",
          type: "checkbox",
          label: "Hobbies",
          isRequired: false,
          choices: [
            { id: "c1", name: "Reading" },
            { id: "c2", name: "Traveling" },
            { id: "c3", name: "Sports" },
          ],
        },
      ],
    },
    {
      id: "f2",
      name: "Form Two",
      elements: [
        {
          id: "e3",
          type: "text",
          label: "Email",
          isRequired: true,
        },
      ],
    },
  ]);

  useEffect(() => {
    if (forms.length > 0 && selectedFormId) {
      const selectedForm = forms.find((form) => form.id === selectedFormId);
      setEditingForm(selectedForm ? { ...selectedForm } : null);
    } else if (forms.length > 0 && !selectedFormId) {
      setEditingForm(forms[0]);
    }
  }, [selectedFormId, forms]);

  const saveForm = () => {
    if (editingForm) {
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.id === editingForm.id ? { ...editingForm } : form
        )
      );
    }
  };

  return {
    editingForm,
    saveForm,
    setEditingForm,
    forms,
    setSelectedFormId,
    selectedFormId,
  };
};
