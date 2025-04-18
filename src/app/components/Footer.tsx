import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
  return (
    <footer className="bottom-0 bg-gray-900 text-white py-8">
      <div className="w-full mx-auto max-w-screen-xl px-4">
        <div className="md:flex md:justify-between">
          {/* Left side */}
          <div className="mb-6 md:mb-0">
            <span className="text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://github.com/KaivanKeren/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                Ismail
              </a>
              {" • "} TJKT
            </span>
          </div>

          {/* Right side - Social links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/KaivanKeren"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
            href="https://www.linkedin.com/in/ismail-b6608833a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
              <span className="sr-only">LinkedIn</span>
              <LinkedInLogoIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;