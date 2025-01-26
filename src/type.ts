export interface Form {
    id: string;
    name: string;
    elements: FormElement[];
  }
  
  export interface FormElement {
    id: string;
    type: "text" | "checkbox";
    label: string;
    isRequired?: boolean;
    choices?: Choice[];
  }

  export interface Choice {
    id: string;
    name: string;
  }