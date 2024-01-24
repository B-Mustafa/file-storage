"use client";
import DropzoneComponent from 'react-dropzone';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';

function Dropzone() {

  const [loading, setLoading] = useState(false)
  const {isLoaded , isSignedIn , user} = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      
      reader.onabort = () => console.log("file reading aborted");
      reader.onerror = () => console.log("File reading failed");
      reader.onload = async () =>{
        await uploadPost(file);
      };
        reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) =>{
    if(loading) return;
    if(!user) return;

    const toastId = toast.loading("Uploading...")

    setLoading(true);

    // uploading done
    // users/user123245/files
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    toast.success("Uploaded sucessfully !", {
      id:toastId,
    })

    setLoading(false);
  } 

  //max size earlier 25mb = 26214400 now 1gb 
  const maxsize = 6000000000 ;

  return (
    <div>
      <DropzoneComponent
        minSize={0}
        maxSize={maxsize}
        onDrop={onDrop}
      >
        {({getRootProps, getInputProps, isDragActive, isDragReject, fileRejections}) => {
          const isFileTooLarge =
            fileRejections.length > 0 && fileRejections[0].file.size > maxsize;

          return (
            <section className='m-4'>
              <div {...getRootProps()}
                className={cn(
                  "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                  isDragActive ? "bg-[#035FFE] text-white animate-pulse" : "bg-slate-100/50 dark:bg-slate-800/50 text-slate-400" 
                )}
              >
                <input {...getInputProps()} />
                {!isDragActive && "Click here or drag a file to upload!"}
                {isDragActive && !isDragReject && "Drop to upload this file"}
                {isDragReject && "File type not accepted, Sorry!"}
                {isFileTooLarge && (
                  <div className='text-danger mt-2'>File is Too Large</div>
                )}
              </div>
            </section>
          );
        }}
      </DropzoneComponent>
    </div>
  );
}

export default Dropzone;
