import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import InteractiveGlobe from "./canvas/InteractiveGlobe";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const API_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:8000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill in your name, email, and message before sending.");
      return;
    }

    setLoading(true);

    // 1. Try FastAPI Backend Endpoint (/api/contact)
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setLoading(false);
        alert(data.message || "Thank you! I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
        return;
      }
    } catch (err) {
      console.warn("Backend /api/contact offline, checking EmailJS / Mailto fallback");
    }

    // 2. Try EmailJS if environment variables are set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            to_name: "Adarsh Patel",
            from_email: form.email,
            to_email: "adarshaldkar@gmail.com",
            message: form.message,
          },
          publicKey
        );
        setLoading(false);
        alert("Thank you! I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
        return;
      } catch (emailJsErr) {
        console.error("EmailJS Error:", emailJsErr);
      }
    }

    // 3. Fallback to direct mailto launcher (guaranteed zero message loss)
    setLoading(false);
    const subject = encodeURIComponent(`Portfolio Message from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
    );
    window.location.href = `mailto:adarshaldkar@gmail.com?subject=${subject}&body=${body}`;
    alert("Message prepared in your email client! Click send to deliver it directly to adarshaldkar@gmail.com");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Got a project in mind or want to discuss an opportunity? Let's talk.</p>
        <h3 className={styles.sectionHeadText}>Contact Me.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='group relative bg-[#915EFF] py-3 px-10 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-[#915EFF44] hover:shadow-[0_0_30px_#915EFF88] hover:bg-[#7c4de0] transition-all duration-300 overflow-hidden'
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#bf61ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex flex-col'
      >
        {/* 3D Interactive Globe — pin on Puducherry */}
        <InteractiveGlobe />
        {/* Fallback EarthCanvas below globe for visual depth */}
        <div className="flex-1 min-h-[200px]">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
