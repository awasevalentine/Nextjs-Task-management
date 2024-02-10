'use client'

import CustomModal from "@/component/Modal/CustomModal";
import AddTask from "./AddTask";

const AddTaskContainer = ({isOpen, setOpen, editTask}) => {
    return ( 
        <CustomModal
        isOpen={isOpen}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <AddTask handleClose={setOpen} editTask={editTask} />
      </CustomModal>
     );
}
 
export default AddTaskContainer;