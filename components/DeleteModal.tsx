'use client'

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";


export function DeleteModal() {

    const { user } = useUser();

    const [
        setIsDeleteModalOpen,
        isDeleteModalOpen,
        setIsRenameModalOpen,
        fileId,
        setFileId,
        setFilename,
      ] = useAppStore((state) => [
        state.setIsDeleteModalOpen,
        state.isDeleteModalOpen,
        state.setIsRenameModalOpen,
        state.fileId,
        state.setFileId,
        state.setFilename,
      ]);
      

      async function deleteFile(){
        if (!user || !fileId) return;

        const toastId = toast.loading("Deleting...")

        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

        try {
            await deleteObject(fileRef)
            .then(async () => {
                deleteDoc(doc(db, "users", user.id, "files", fileId)).then()
            })

            toast.success("Deleted Sucessfully" , {
              id:toastId,
            })
            
        } catch (error) {
            toast.error("An error occured !",{
              id: toastId,
            })
           
        }

        setIsDeleteModalOpen(false);
        
      }
      
  return (
    <Dialog
        open={isDeleteModalOpen}
        onOpenChange={(isOpen) => {
            setIsDeleteModalOpen(isOpen);
        }}
    >
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete ?</DialogTitle>
          <DialogDescription>
            This action cannot be reversed . This will permanently delete your file.
          </DialogDescription>
        </DialogHeader>
       <div className="flex space-x-2 py-3">
        <Button
            size={"sm"}
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
        >
        <span className="sr-only">Cancel</span>
        <span>Cancel</span>
        </Button>

        <Button
            type="submit"
            size={"sm"}
            variant={"destructive"}
            className="px-3 flex-1"
            onClick={() => deleteFile()}
        >
            <span className="sr-only ">Delete</span>
            <span>Delete</span>
        </Button>
       </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteModal;