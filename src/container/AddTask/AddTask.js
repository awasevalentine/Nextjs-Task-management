import MainHeader from "@/component/title/MainHeader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import * as Yup from "yup";
import { styled, MenuItem, Select, CircularProgress } from "@mui/material";
import SubHeader from "@/component/title/SubHeader";
import { useAddTodoMutation, useUpdateTodoMutation, useGetTodosQuery } from "@/lib/features/todo/todosApiSlice";

const AddTask = ({ handleClose, editTask }) => {
  const initialValues = {
    title: editTask ? editTask?.title : "",
    description: editTask ? editTask?.description : "",
    dueDate: editTask ? editTask?.dueDate : new Date(),
    status: editTask ? editTask?.status : "Pending",
  };

  const [addTodo, {isLoading, isError, isSuccess, data}] = useAddTodoMutation()
  const [updateTodo, {isLoading: updateIsLoading, isSuccess: updateIsSuccess}] = useUpdateTodoMutation()

  const TaskValSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    dueDate: Yup.string().required("Due date is required"),
  });

  const handleSubmit = async(values) => {

    try {
      if(editTask){
        values.id = editTask?.id
        const updateTd = await updateTodo(values)
    }else{
      values.id = new Date().getTime()
      const addTd = await addTodo(values) 
    }
    } catch (error) {
      
    }
  };

  useEffect(()=>{
    if(isSuccess || updateIsSuccess){
      handleClose(false)
    }
  },[isSuccess, updateIsSuccess])

  return (
    <div className="w-full flex flex-col justify-center items-center mt-[2rem] mb-[1.4rem]">
      <div className="w-[95%]">
        <SubHeader>{editTask ? "Edit Task" : "Create New Task"}</SubHeader>
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={TaskValSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, resetForm }) => (
          <Form className="flex w-[95%] justify-center items-center flex-col gap-5">
            <div className="flex w-full flex-col">
              <label htmlFor="Title" className="ml-1 font-[600]">
                Title<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                // className="border h-10 w-full "
                as={InputFieldBox}
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="description" className="ml-1 font-[600]">
                Description<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="text"
                id="description"
                name="description"
                // className="border h-10 w-full "
                as={InputFieldBox}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="dueDate" className="ml-1 font-[600]">
                Due Date<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="date"
                id="dueDate"
                name="dueDate"
                as={InputFieldBox}
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-700"
              />
            </div>
            {editTask?.status && (
              <div className="flex w-full flex-col">
                <label htmlFor="status" className="ml-1 font-[600]">
                  Status<span className="text-red-900 pl-1">*</span>
                </label>
                <Field
                  type="select"
                  id="status"
                  name="status"
                  as={SelectInputFieldBox}
                >
                  {["Pending", "Ongoing", "Completed"]?.map((res, index) => (
                    <MenuItem value={res} key={index}>
                      {res}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-700"
                />
              </div>
            )}
            <div className="flex flex-row gap-5">
              <button
                className="bg-black opacity-70 py-[5px] px-[20px] text-white rounded"
                type="button"
                onClick={() => handleClose(false)}
              >
                Cancle
              </button>
              <button
                className="bg-[#7E30E1] py-[5px] px-[20px] text-white rounded"
                type="submit"
              >
                {
                  (isLoading || updateIsLoading) && (
                    <CircularProgress
                    sx={{
                      width: "16px !important",
                      height: "16px !important",
                      marginRight: "5px",
                    }}
                    color="inherit"
                  />
                  )
                }
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTask;

const InputFieldBox = styled("input")(() => ({
  display: "block",
  width: "100%",
  height: "fit-content",
  padding: "12px 12px",
  fontSize: "13px",
  lineHeight: 1.42857,
  color: "#838383",
  backgroundColor: "#FFF",
  border: "1px solid #DADADA",
  borderRadius: "14px",
  boxShadow: "0px 2px 20px 0px rgba(80, 88, 159, 0.10)",
  transition:
    "border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s",

  "&:focus": {
    outline: "none",
  },
}));

const SelectInputFieldBox = styled(Select)(() => ({
  display: "flex",
  width: "100%",
  height: "40px",
  //   padding: "6px 12px",
  alignItems: "center",
  fontSize: "13px",
  lineHeight: 1.42857,
  color: "#838383",
  backgroundColor: "#FFF",
  border: "1px solid #DADADA",
  borderRadius: "14px",
  boxShadow: "0px 2px 20px 0px rgba(80, 88, 159, 0.10)",
  transition:
    "border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s",

  "&.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
    padding: "10px 12px !important",
  },

  "& div": {
    padding: "5px 12px",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      outline: "none",
      border: "none",
      borderColor: "none",
    },
  },
  "&:focus": {
    outline: "none",
    border: "none",
    borderColor: "transparent",
  },

  "&.Mui-focused": {
    outline: "none",
    border: "none",
    borderColor: "transparent",
  },

  "&. .css-1bxl9zk-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root": {
    border: "none",
  },

  "&:hover": {
    borderColor: "transparent",
  },
}));
