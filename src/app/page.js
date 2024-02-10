"use client";
import "tailwindcss/tailwind.css";
import EmptyCard from "@/component/EmptyCard/EmptyCard";
import MainHeader from "@/component/title/MainHeader";
import TaskList from "@/container/TaskList/TaskList";
import { useCallback, useEffect, useState } from "react";
import { useGetTodosQuery } from "@/lib/features/todo/todosApiSlice";
import AddTaskContainer from "@/container/AddTask/AddTaskContainer";

export default function Home() {
  const [newTask, setNewTask] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();


  const filteredTodos = todos?.filter((task) =>{
    return filter ? task?.status?.toLowerCase() === filter?.toLowerCase() : true
  }
  );

  const handleDelete = useCallback((item) => {
    setNewTask((res) => {
      res.filter((res) => {
        return res.id !== item.id;
      });
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full justify-center items-center mt-[50px] mb-[40px]">
        <MainHeader>Task Management Dashboard</MainHeader>
        <div className={`flex justify-end mb-[2px] flex-row gap-[10px] sm:gap-3 ${filteredTodos?.length === 0 ? "md:gap-4" :"md:gap-[10rem]"} items-end`}>
          <div>
            <button
              className="py-[3px] px-[10px] bg-black opacity-70 text-white rounded"
              onClick={() => setOpen(true)}
            >
              Add Task
            </button>
            <AddTaskContainer isOpen={isOpen} setOpen={setOpen} />
          </div>
          <div className="mt-4">
            <label className="mr-2">Filter by status:</label>
            <select
              className="px-2 py-1 border rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </div>

        {filteredTodos?.length === 0 ? (
          <EmptyCard />
        ) : (
          filteredTodos?.map((res, index) => (
            <TaskList items={res} key={index} handleDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
