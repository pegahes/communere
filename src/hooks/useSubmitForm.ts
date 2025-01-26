import { Control, FieldErrors, FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, object, string } from "yup";
import { FormElement } from "../type";

interface useFormPreviewReturn {
    register: UseFormRegister<FieldValues>;
    control: Control<FieldValues>;
    handleSubmit: (onValid: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    errors: FieldErrors<FieldValues>;
  }
  
  const useFormPreview = (elements: FormElement[]): useFormPreviewReturn => {
    const validationSchema = object(
      elements.reduce((schema, element) => {
        if (element.isRequired) {
          schema[element.id] =
            element.type === "text"
              ? string().required("This field is required")
              : array().min(1, "Please select at least one option");
        }
        return schema;
      }, {} as Record<string, any>) 
    );
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema),
    });
  
    return { register, control, handleSubmit, errors };
  };
  
  export default useFormPreview;