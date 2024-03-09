const Footer = () => {
    return (
      <footer className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text py-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-between">
          <div className="flex flex-col mb-4">
            <h4 className="text-xl font-semibold mb-2">Quick Links</h4>
            <ul>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
  
          <div className="flex flex-col mb-4">
            <h4 className="text-xl font-semibold mb-2">Legal</h4>
            <ul>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </div>
  
          <div className="flex flex-col mb-4">
            <h4 className="text-xl font-semibold mb-2">Connect With Us</h4>
            <ul>
              <li>
                <a href="https://twitter.com">Twitter</a>
              </li>
              <li>
                <a href="https://facebook.com">Facebook</a>
              </li>
              <li>
                <a href="https://instagram.com">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="text-center mt-8">
          <p>&copy; 2024 File Sync. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  