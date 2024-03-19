"use client"
import { FileType, FolderType } from "@/typings"
import { Button } from "../ui/button"
import { DataTable } from "./Table"
import { columns } from "./columns"
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { addDoc, collection, orderBy, query } from "firebase/firestore"
import { db, storage } from "@/firebase"
import { Skeleton } from "../ui/skeleton"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

type DataItem = FileType | FolderType;

function TableWrapper( {skeletonFiles}: {skeletonFiles: FileType[]} ) {

const { user } = useUser();
 const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
 const [sort, setSort] = useState<"asc" | "desc">("desc");
 const [folders, setFolders] = useState<FolderType[]>([]);
 const [selectedFolder, setSelectedFolder] = useState<FolderType | null>(null);

 // Ensure user is defined before attempting to use it
 const [docs, loading, error] = useCollection(
    user ? query(collection(db, "users", user.id, "files"), orderBy("timestamp", sort)) : undefined
 );

 const [filesDocs, filesLoading, filesError] = useCollection(
  user ? query(collection(db, "users", user.id, "files"), orderBy("timestamp", sort)) : undefined
 );
 
 const [foldersDocs, foldersLoading, foldersError] = useCollection(
  user ? query(collection(db, "users", user.id, "folders"), orderBy("timestamp", sort)) : undefined
 );
 
 useEffect(() => {
  if (!filesDocs || !foldersDocs || !user) return;

  const files: FileType[] = filesDocs.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  const folders: FolderType[] = foldersDocs.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    files: doc.data().files || [],
  }));

  const combinedData: DataItem[] = [...files, ...folders]; 

  const filesOnly: FileType[] = combinedData.filter((item): item is FileType => 'filename' in item);

  setInitialFiles(filesOnly);
}, [filesDocs, foldersDocs, user]);


 const handleFolderClick = (folder: FolderType) => {
    setSelectedFolder(folder);
 };

 const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (!user) return; // Ensure user is defined
  const file = event.target.files?.[0];
  if (!file) return;
 
  try {
     const storageRef = ref(storage, `users/${user.id}/files/${file.name}`);
     await uploadBytes(storageRef, file);
     const downloadURL = await getDownloadURL(storageRef);
 
     // Save file metadata to Firestore
     const fileMetadata: FileType = {
       id: file.name, // Assuming file name is unique
       filename: file.name,
       fullName: file.name,
       downloadURL: downloadURL,
       type: file.type,
       size: file.size,
       timestamp: new Date(),
     };
 
     await addDoc(collection(db, "users", user.id, "files"), fileMetadata);
     console.log("File uploaded successfully.");
  } catch (error) {
     console.error("Error uploading file: ", error);
  }
 };

 const handleCreateFolder = async (folderName: string) => {
  if (!user) return; // Ensure user is defined
  try {
     const folderRef = collection(db, "users", user.id, "folders");
     const docRef = await addDoc(folderRef, { name: folderName, timestamp: new Date() });
     console.log("Folder created with ID: ", docRef.id);
     // Optionally, refresh the list of folders
     const newFolder: FolderType = {
       id: docRef.id,
       name: folderName,
       files: [], // Initialize files array
     };
     setFolders((prevFolders) => [...prevFolders, newFolder]);
     alert(`Folder '${folderName}' created successfully.`); // Simulate a popup
  } catch (error) {
     console.error("Error creating folder: ", error);
  }
 };

  if (docs?.docs.length === undefined)
    return (
    <div className="flex flex-col">
      <Button  className="ml-auto w-36 h-10 mb-5 " variant={"outline"}>
      <Skeleton className="h-5 w-full" />
      </Button>

    <div className="border rounded-lg">
      <div className="border-b h-12" />
      {skeletonFiles.map ((file) => (
        <div
        key={file.id}
        className="flex items-center space-x-4 p-5 w-full"
        >
          <Skeleton className="h-12 w-12" />
          <Skeleton className="h-12 w-full" />
        </div>
        ))}

        {skeletonFiles.length === 0 && (
        <div className="flex items-center space-x-4 p-5 w-full">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-12 w-full" />
        </div>
        )}

      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-5 pb-10" >
      <Button
        variant={"outline"}
        onClick={()=>setSort (sort ==="desc" ? "asc" : "desc")}
        className="ml-auto w-fit bg-light-secondary hover:bg-light-primary dark:bg-dark-secondary dark:hover:bg-dark-primary"
      >Sort By {sort === "desc" ? "Newest" : "Oldest"} </Button>

<Button
      variant={"outline"}
      onClick={() => handleCreateFolder("New Folder")}
      className="ml-auto w-fit bg-light-secondary hover:bg-light-primary dark:bg-dark-secondary dark:hover:bg-dark-primary"
    >
      Create Folder
    </Button>
   
    {folders.map((folder) => (
      <div key={folder.id} onClick={() => handleFolderClick(folder)}>
        {folder.name}
      </div>
    ))}
    {selectedFolder ? (
      <DataTable columns={columns} data={selectedFolder.files} />
    ) : (
      <DataTable columns={columns} data={initialFiles}></DataTable>
    )}
      


      {/* <DataTable columns={columns} data={skeletonFiles} /> */}
    </div>
  )
}

export default TableWrapper;
