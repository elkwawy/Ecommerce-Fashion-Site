import React from 'react'
import { FiPhone } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const ContactDetails = () => {
  return (
        <div>
          <h2 className="text-xl font-semibold mb-3">Address</h2>
          <p className="text-[#8E8E90]">
            <FaLocationDot className="inline w-4 h-5 mr-1 text-[black]" /> Egypt
            , Dakahlia, Mansoura
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Phones</h3>
          <p className="mb-3 text-[#8E8E90]">
            <FiPhone className="inline w-5 h-5 mr-1 text-[black]" /> 01147290516
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Email</h3>
          <p className="text-[#8E8E90] ">
            <MdEmail className="inline w-5 h-5 mr-1 text-[black]" />{" "}
            dotcode16@gmail.com
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Working Hours</h3>
          <p className="text-[#8E8E90]">
            <FaRegClock className="inline w-5 h-5 mr-1 text-[black]" /> Sat-Thu:
            10:00 - 20:00
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.whatsapp.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className="text-2xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
  )
}

export default ContactDetails
