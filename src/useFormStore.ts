import { persist, createJSONStorage } from "zustand/middleware";
import { Form, FormElement } from "./type";
import { create } from "zustand";


export interface FormsState {
    forms: Form[];
    addForm: (form: Form) => void;
    updateForm: (updatedForm: Form) => void;
    deleteForm: (formId: string) => void;
    addElementToForm: (formId: string, element: FormElement) => void;
    updateElementInForm: (formId: string, elementId: string, updatedElement: FormElement) => void;
    deleteElementFromForm: (formId: string, elementId: string) => void;
  }

  export const useFormsStore = create<FormsState>()(
    persist(
      (set) => ({
        forms: [
          {
            id: "f1",
            name: "Form 1",
            elements: [
              {
                id: "e1",
                type: "text",
                label: "label",
                isRequired: true,
              }
            ],
          },
        ],
  
        addForm: (form) =>
          set((state) => ({
            forms: [...state.forms, form],
          })),
  
        updateForm: (updatedForm) =>
          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === updatedForm.id ? updatedForm : form
            ),
          })),
  
        deleteForm: (formId) =>
          set((state) => ({
            forms: state.forms.filter((form) => form.id !== formId),
          })),
  
        addElementToForm: (formId, element) =>
          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === formId
                ? { ...form, elements: [...form.elements, element] }
                : form
            ),
          })),
  
        updateElementInForm: (formId, elementId, updatedElement) =>
          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === formId
                ? {
                    ...form,
                    elements: form.elements.map((el) =>
                      el.id === elementId ? updatedElement : el
                    ),
                  }
                : form
            ),
          })),
  
        deleteElementFromForm: (formId, elementId) =>
          set((state) => ({
            forms: state.forms.map((form) =>
              form.id === formId
                ? {
                    ...form,
                    elements: form.elements.filter((el) => el.id !== elementId),
                  }
                : form
            ),
          })),
      }),
      {
        name: "forms-storage", 
        storage: createJSONStorage(() => localStorage),
      }
    )
  );