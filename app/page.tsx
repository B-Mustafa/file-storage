"use client"
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Hero from '@/public/Documents.jpg'
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // Mock API call to simulate form submission
      const response = await fetch('https://example.com/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again later.');
      }

      setSubmissionSuccess(true);
    } catch (error: any) {
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="">
      <section className="flex flex-col lg:flex-row items-center  bg-light-background dark:bg-dark-background pb-10 pt-10 mt-2">
      <div className="pl-5 p-18 flex flex-col bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text space-y-5 lg:w-3/4">
          <h1 className="text-5xl font-bold pt-5">
            Welcome To File Sync!
            <br />
            <br />
            A Storage For All Your Files
          </h1>
          <p className="pb-8 pt-5 text-lg leading-7">
            Store, organize, and access your files from anywhere with File Sync.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cupiditate
            quia laborum nulla est qui repellendus quaerat tempora quam ex!
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi laboriosam
            provident sequi, veritatis nam harum consequatur ratione, itaque ab officia rerum.
          </p>

          <Link href={"/dashboard"} className="flex bg-light-primary dark:bg-dark-primary w-fit p-5 mb-2 cursor-pointer rounded-lg text-light-text dark:text-dark-text hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover transition-colors duration-200">
            Get Started
            <ArrowRight className="ml-5 text-light-text dark:text-dark-text" />
          </Link>
      </div>
      <div className="bg-light-background dark:bg-dark-background h-full p-10 flex justify-center items-center lg:w-1/4">
          <Image src={Hero} alt="cloud photo" className="object-cover object-fit rounded-lg shadow-lg lg:h-auto lg:w-full sm:w-96 sm:h-96" />
      </div>
    </section>

    <section className="bg-light-accent dark:bg-dark-accent p-10">
      <div className="max-full flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-5 text-center items-center">Why Choose File Sync?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <FeatureCard
            title="Work seamlessly across all devices"
            description="Access your cloud files effortlessly with our website, Sync or back up data from your computer to File Sync, and changes will be replicated in real time. Stay updated on the latest files, wherever you are!"
          />
          <FeatureCard
            title="Never run out of storage space"
            description="Need lots of storage space? No problem. We provide a good amount of storage at a very affordable price. Never worry about getting ran out of storage with File Sync"
          />
          <FeatureCard
            title="Reliable Backup"
            description="Say goodbye to data loss worries. Our platform automatically backs up your files, providing a reliable solution to safeguard your valuable data against unexpected hardware failures, accidents, or malicious attacks."
          />
        </div>
      </div>
    </section>

    <section className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text p-10 flex flex-col justify-center">
      <div className="w-full">
        <h2 className="text-3xl font-semibold mb-5 text-center">Subscribe to Our Newsletter</h2>
        <p className="mb-5 text-center ">
          Stay updated with the latest news, updates, and exclusive offers by subscribing to our newsletter.
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full sm:w-auto p-3 mb-3 sm:mb-0 sm:mr-3 rounded-md border border-gray-300 focus:outline-none focus:border-primary dark:border-dark-border dark:focus:border-dark-primary"
            onChange={handleChange}
            value={email}
            required
          />
          <button
            type="submit"
            className="bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text py-3 px-8 rounded-md hover:bg-light-primary hover:text-dark-text dark:hover:bg-dark-primary dark:hover:text-dark-text focus:outline-none"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>

      <Footer/>
    </main>
  );
}

// FeatureCard component
const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
 <div className=" bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg p-6 shadow-md">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p>{description}</p>
 </div>
);
