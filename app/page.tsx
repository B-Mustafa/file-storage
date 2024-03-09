import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row item-center bg-light-background dark:bg-dark-background">
        <div className="pl-5 p-18 flex flex-col bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text space-y-5">
          <h1 className="text-5xl font-bold pt-5">
            Welcome To File Sync!
            <br />
            <br />
            A Storage For All Your Files
          </h1>
          <p className="pb-8 pt-5">
            Store, organize, and access your files from anywhere with File Sync.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate
            quia laborum nulla est qui repellendus quaerat tempora quam ex!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi laboriosam
            provident sequi, veritatis nam harum consequatur ratione, itaque ab officia rerum.
          </p>

          <Link href={"/dashboard"} className="flex bg-light-secondary dark:bg-dark-secondary w-fit p-5 mb-2 cursor-pointer">
            Get Started For Free
            <ArrowRight className="ml-5" />
          </Link>
        </div>
        <div className="bg-light-background dark:bg-dark-background h-full p-10">
          <Image src="/cloud_storage.png" alt="cloud photo" height={100} width={100} className="invert" />
        </div>
      </div>

      <section className="bg-light-background dark:bg-dark-background p-10">
        <div className="max-w-4xl ">
          <h2 className="text-3xl font-semibold mb-5">Why Choose File Sync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              title="Secure and Private"
              description="Your files are stored securely, and privacy is our top priority. File Sync uses advanced encryption to keep your data safe."
            />
            <FeatureCard
              title="Access Anywhere"
              description="Access your files from any device, anywhere. Whether you're at home, in the office, or on the go, File Sync keeps your files at your fingertips."
            />
          </div>
        </div>
      </section>

      <section className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text p-10">
        <div className="max-w-4xl ">
          <h2 className="text-3xl font-semibold mb-5">Get Started Today</h2>
          <p className="mb-5">
            Join File Sync today and experience the convenience of a reliable file storage solution.
          </p>
          <Link href={"/dashboard"} className="flex bg-light-secondary dark:bg-dark-secondary w-fit p-5 cursor-pointer">
            Get Started For Free
            <ArrowRight className="ml-5" />
          </Link>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

// FeatureCard component
const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-text  rounded-lg p-6 shadow-md shadow-dark-primary dark:shadow-light-primary">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p>{description}</p>
  </div>
);

