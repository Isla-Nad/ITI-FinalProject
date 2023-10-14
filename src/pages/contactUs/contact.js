import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_kbjiyn1", "template_a5m6z5h", form.current, "12PFTLyebbEnu-mDe").then(
      (result) => {
        console.log(result.text);
        console.log("Email sent ");
        e.target.reset();
      },
      (error) => {
        console.log(error.text);
      }
    );
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card custom-card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" name="from_name" id="name" placeholder="Your Name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control" id="email" placeholder="Your Email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea className="form-control" name="message" id="message" rows="4" placeholder="Your Message" required></textarea>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-warning btn-block">
                  Send Messege
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
