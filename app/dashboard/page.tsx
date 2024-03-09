import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/Table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";


async function Dashboard() {
    const { userId } = auth();

    const docResults = await getDocs(collection(db, "users", userId!, "files"))
    const skeletonFiles: FileType[] = docResults.docs.map((doc) => {
        return {
          id: doc.id,
          filename: doc.data().filename || doc.id,
          timestamp: new Date(doc.data().timestamp?.seconds*1000) || undefined,
          fullName: doc.data().fullName,
          downloadURL: doc.data().downloadURL,
          type: doc.data().type,
          size: doc.data().size,
        };
      });
    // console.log(skeletonFiles)
  return (
    <div className="bg-light-background dark:bg-dark-background border-t h-screen">
        <Dropzone/>

        <section className=" container space-y-5">
            <h2 className="font-bold">Files</h2>

            <div>
                {/* Table Wrapper */}
                <TableWrapper
                    skeletonFiles={skeletonFiles}
                />
            </div>
        </section>
        
    </div>
  )
}

export default Dashboard;
