import SendQuestion from "./components/SendQuestion";
import ContactDetails from "./components/ContactDetails";
import { Helmet } from "react-helmet-async";
const ContactUs = () => {
  return (
    <div className="container mx-auto p-8">
      < Helmet>
                <title>Contact us</title>
                <meta name="description" content="contact us page" />
              </Helmet>
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-4">
        Contact Us
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <SendQuestion />

        {/* Address Section */}
        <ContactDetails />
      </div>

      {/* Map Section */}
      <div className="mt-10">
        <iframe
          className="w-full h-80 border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0631303219695!2d107.6191229143144!3d-6.917463994998933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e63f0a6af507%3A0x5017d7cf3b09c0e!2sJakarta!5e0!3m2!1sen!2sid!4v1634303994470!5m2!1sen!2sid"
          allowFullScreen=""
          loading="lazy"
          title="Google Maps"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
