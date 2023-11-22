import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import translations from "./translations.json";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const form = useRef();
  const language = useSelector((state) => state.lang);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const translate = (key) => {
    return translations[language][key];
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_nnndbzw",
        "template_ce1tb5j",
        {
          from_name: form.current.from_name.value,
          to_name: form.current.email.value,
          message: form.current.message.value,
          to_email: "islamnady95@gmail.com",
        },
        "lTiqoZrmC_6pX8eLV"
      )
      .then(() => {
        console.log("Email sent");
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs.sendForm("service_kbjiyn1", "template_a5m6z5h", form.current, "12PFTLyebbEnu-mDe").then(
  //     (result) => {
  //       console.log(result.text);
  //       console.log(translate("successMessage"));
  //       e.target.reset();
  //     },
  //     (error) => {
  //       console.log(error.text);
  //     }
  //   );
  // };

  return (
    <div className="container mt-5" style={{ flex: "1 0 auto" }} dir={language === "ar" ? "rtl" : ""}>
      <div className="row justify-content-center">
        <div className="card custom-card  w-50 ">
          <div className="card-body ">
            {!isSubmitted ? (
              <>
                <h2 className="card-title text-center mb-4">{translate("title")}</h2>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      {translate("nameLabel")}
                    </label>
                    <input type="text" className="form-control" name="from_name" id="name" placeholder={translate("namePlaceholder")} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      {translate("emailLabel")}
                    </label>
                    <input type="email" className="form-control" name="email" id="email" placeholder={translate("emailPlaceholder")} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      {translate("messageLabel")}
                    </label>
                    <textarea className="form-control" name="message" id="message" rows="4" placeholder={translate("messagePlaceholder")} required></textarea>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-warning btn-block">
                      {translate("buttonText")}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center">
                <p>{translate("successMessage")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
