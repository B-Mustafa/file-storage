import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/cloud_storage.png"

import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-light-accent dark:bg-dark-accent text-light-text dark:text-dark-text py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around">
        <div className="w-full sm:w-auto mb-6 sm:mb-0 mr-5">
          <div className="flex items-center text-2xl font-bold">
            <Image src={Logo} width={60} height={60} alt="Main Logo" />
            <span className="pl-2">File Sync</span>
          </div>
          <div className="mt-4">
            <h2 className="font-semibold text-xl mb-2">Follow Us</h2>
            <div className="flex text-2xl">
              <Link href="#" className="ml-2 text-light-text dark:text-dark-text">
                <FaLinkedin />
              </Link>
              <Link href="#" className="ml-2 text-light-text dark:text-dark-text">
                <FaInstagram />
              </Link>
              <Link href="#" className="ml-2 text-light-text dark:text-dark-text">
                <FaFacebook />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 sm:mb-0">
          <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 sm:mb-0">
          <h4 className="text-xl font-semibold mb-2">Legal</h4>
          <ul>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/cookie">Cookie Policy</a>
            </li>
            <li>
              <a href="/copyright">Copyright</a>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 sm:mb-0">
          <h4 className="text-xl font-semibold mb-2">Support</h4>
          <ul>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-lg font-medium">
        <p>&copy; 2024 File Sync. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
  