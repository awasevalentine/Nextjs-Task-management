'use client'

import { MdAdd } from "react-icons/md";
import CustomModal from "../Modal/CustomModal";
import { useState } from "react";
import AddTask from "@/container/AddTask/AddTask";
import AddTaskContainer from "@/container/AddTask/AddTaskContainer";

const EmptyCard = () => {
    const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <div className="w-[95%] mt-[20px] md:mt-[40px] flex justify-center items-center sm:w-4/5 md:w-3/4 lg:w-1/3 mb-7 h-[200px] lg:mx-0 mx-3 rounded-xl border border-neutral-300 border-dashed">
        <MdAdd onClick={()=>setOpen(true)} className="font-[900] hover:scale-125 text-[25px] cursor-pointer" />
        <AddTaskContainer isOpen={isOpen} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default EmptyCard;
