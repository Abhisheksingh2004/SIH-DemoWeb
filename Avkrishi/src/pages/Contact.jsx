import React from "react";
import Header from "../components/Header";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#75833F] mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#75833F] focus:border-[#75833F]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#75833F] focus:border-[#75833F]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#75833F] focus:border-[#75833F]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#75833F] focus:border-[#75833F]"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md font-bold text-white bg-[#75833F] hover:bg-[#5e6a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#75833F]"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#75833F] mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800">Address</h3>
                <p className="text-gray-600">
                  123 Agriculture Road, <br />
                  Farmington District, <br />
                  New Delhi, India
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800">Phone</h3>
                <p className="text-gray-600">+91 1234567890</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">info@avkrishi.com</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-800">Working Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM <br />
                  Saturday: 9:00 AM - 1:00 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium text-gray-800 mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#75833F] hover:text-[#5e6a32]">
                  Facebook
                </a>
                <a href="#" className="text-[#75833F] hover:text-[#5e6a32]">
                  Twitter
                </a>
                <a href="#" className="text-[#75833F] hover:text-[#5e6a32]">
                  Instagram
                </a>
                <a href="#" className="text-[#75833F] hover:text-[#5e6a32]">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;