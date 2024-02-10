"use client";

import { ShortenText } from "@/util/shortenText";
import { useCallback, useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import CustomModal from "@/component/Modal/CustomModal";
import AddTask from "../AddTask/AddTask";
import AddTaskContainer from "../AddTask/AddTaskContainer";
import { useDeleteTodoMutation } from "@/lib/features/todo/todosApiSlice";

const TaskList = ({ items, handleDelete }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [titleText, setTitleText] = useState(null);
  const [description, setDescription] = useState(null);
  const [textLength, setTextLength] = useState(200);
  const extraSmall = useMediaQuery("(max-width:500px)");
  const extraSmallTitle = useMediaQuery("(max-width:370px)");
  const [isOpen, setOpen] = useState(false);

  const [deleteTodo, {isSuccess}] = useDeleteTodoMutation()



  const handleShowText = useCallback(() => {
    setShowFullText((prev) => !prev);
  }, []);

  const handleTitle = () => {
    if (extraSmallTitle) {
      setTitleText(ShortenText(items.title, 15, showFullText));
    } else {
      setTitleText(ShortenText(items.title, 25, showFullText));
    }
  };

  const handleDeleteTodo = useCallback(async()=>{
    const dle = await deleteTodo(items?.id)
  },[])

  useEffect(() => {
    handleTitle();
    if (extraSmall) {
      setTextLength(120);
    } else {
      setTextLength(200);
    }
  }, [extraSmall, extraSmallTitle]);

  useEffect(() => {
    setDescription(ShortenText(items.description, textLength, showFullText));
  }, [showFullText, textLength]);

  return (
    <div className="flex flex-col w-[95%] sm:w-4/5 md:w-3/4 lg:w-1/2 mb-7 lg:mx-0 mx-3 rounded-xl border border-neutral-300 border-solid">
      <div
        className={`p-20px min-h-[200px] ${
          showFullText ? "max-h-[fit-content]" : "max-h-[200px]"
        }`}
      >
        <div className="p-[20px] rounded-t-xl bg-[#0000001c] flex flex-row items-center justify-between">
          <h5 className="text-[18px] text-black opacity-70 font-[700]">
            {titleText?.text}
          </h5>
          <span className="text-[18px] text-black opacity-70 font-[700]">
            {items.status}
          </span>
        </div>
        <div className="p-[20px] flex flex-col">
          <p>{description?.text}</p>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-2 pr-[20px] items-center">
        <span className="text-[18px] font-[600] text-black opacity-80">
          Due Date:
        </span>
        <span className="text-[16px] font-[400] text-black opacity-70">
          {items.dueDate}
        </span>
      </div>
      <div className="flex p-[20px] rounded-b-xl flex-row w-full bg-[#0000001c]">
        {!description?.isShortened && (
          <div className="view-more w-1/2 flex flex-row justify-center items-center">
            <div
              className="shadow-2xl
                 border-neutral-300 rounded-[40px] border py-[5px] px-[20px] shadow-white
                 bg-blend-multiply bg-zinc-50 cursor-pointer hover:bg-[#F3F8FF] hover:scale-105"
              onClick={handleShowText}
            >
              <h4
                className="text-[18px] text-black opacity-70 font-[700]
                 "
              >
                {showFullText ? "Show Less" : "Show More"}
              </h4>
            </div>
          </div>
        )}

        <div
          className={`icons ${
            description?.isShortened ? "w-full" : "w-1/2"
          } flex flex-row justify-end gap-3 items-center`}
        >
          <MdModeEditOutline
            onClick={() => setOpen(true)}
            className="cursor-pointer text-[18px] text-black opacity-70 font-[700] hover:scale-105 hover:text-blue-900"
          />
          <MdDelete
            onClick={() => handleDeleteTodo()}
            className="cursor-pointer text-[18px] text-black opacity-70 font-[700] hover:scale-105 hover:text-red-900"
          />
        </div>
      </div>
      <AddTaskContainer isOpen={isOpen} setOpen={setOpen} editTask={items} />
    </div>
  );
};

export default TaskList;
