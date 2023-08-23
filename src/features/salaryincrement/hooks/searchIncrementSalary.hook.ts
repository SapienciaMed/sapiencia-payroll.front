import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function useSearchIncrementSalaryHook() {
  const navigate = useNavigate();

  const redirectCreate = () => {
    navigate("../crear");
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return {
    redirectCreate,
    register,
    control,
    errors,
    onSubmit,
  };
}
