import { useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const input = evt.target;

    setErrors({
      ...errors,
      [input.name]: input.validationMessage,
    });

    setForm({
      ...form,
      [input.name]: input.value,
    });
  };

  const clearError = () => {
    setErrors({
      ...errors,
      name: "",
      email: "",
      password: "",
    });
  };

  return { form, errors, handleChange, clearError };
};

export default useForm;
