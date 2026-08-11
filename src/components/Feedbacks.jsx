import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials as defaultTestimonials } from "../constants";

const API_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:8000";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.2, 0.75)}
    className="bg-black-200 p-8 rounded-3xl xs:w-[320px] w-full border border-[#ffffff0a] hover:border-[#915EFF44] transition-all duration-300 shadow-xl flex flex-col justify-between"
  >
    <div>
      <p className="text-[#915EFF] font-black text-[42px] leading-none">"</p>
      <p className="mt-2 text-white tracking-wider text-[15px] leading-relaxed">
        {testimonial}
      </p>
    </div>

    <div className="mt-6 flex justify-between items-center gap-2 pt-4 border-t border-[#ffffff0a]">
      <div className="flex-1 flex flex-col min-w-0">
        <p className="text-white font-semibold text-[15px] truncate">
          <span className="blue-text-gradient">@</span> {name}
        </p>
        <p className="mt-0.5 text-secondary text-[12px] truncate">
          {designation} {company ? `of ${company}` : ""}
        </p>
      </div>

      <img
        src={image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
        alt={`feedback_by-${name}`}
        className="w-10 h-10 rounded-full object-cover border border-[#915EFF66] flex-shrink-0"
      />
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const [reviews, setReviews] = useState(defaultTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    testimonial: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/api/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        console.warn("[Reviews] Using default testimonials", err);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.testimonial.trim()) {
      alert("Please fill in your name and review message.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          setReviews([data.review, ...reviews]);
        }
        setIsModalOpen(false);
        setFormData({ name: "", designation: "", company: "", testimonial: "" });
        alert("🎉 Thank you! Your review has been published dynamically.");
      } else {
        alert("Failed to post review. Please try again.");
      }
    } catch (err) {
      console.error("Submit review error:", err);
      alert("Could not connect to backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[20px] relative overflow-hidden">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[280px]`}>
        <motion.div variants={textVariant()} className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <p className={styles.sectionSubText}>What clients & team say</p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#915EFF] text-white font-semibold text-xs sm:text-sm hover:bg-[#7c4de0] transition-all duration-300 shadow-[0_0_15px_#915EFF66] flex items-center gap-2 cursor-pointer"
          >
            <span>✍️ Write a Review</span>
          </button>
        </motion.div>
      </div>

      <div className={`-mt-16 pb-14 ${styles.paddingX} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center relative z-10`}>
        {reviews.map((item, index) => (
          <FeedbackCard key={`${item.name}-${index}`} index={index} {...item} />
        ))}
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0f1424] border border-[#915EFF44] p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white text-xl font-bold">Write a Customer Review</h3>
                  <p className="text-secondary text-xs mt-1">Your feedback will be published live on the portfolio!</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-secondary hover:text-white text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-gray-300 text-xs font-semibold block mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    required
                    className="w-full bg-[#1d1836] border border-[#ffffff15] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#915EFF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-300 text-xs font-semibold block mb-1">Role / Position</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g. Senior Tech Lead"
                      className="w-full bg-[#1d1836] border border-[#ffffff15] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#915EFF]"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-xs font-semibold block mb-1">Company / Project</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-[#1d1836] border border-[#ffffff15] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#915EFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-xs font-semibold block mb-1">Your Feedback / Review *</label>
                  <textarea
                    name="testimonial"
                    rows={4}
                    value={formData.testimonial}
                    onChange={handleChange}
                    placeholder="Write your experience working with Adarsh..."
                    required
                    className="w-full bg-[#1d1836] border border-[#ffffff15] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#915EFF] resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#ffffff20] text-gray-300 text-xs font-semibold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 rounded-full bg-[#915EFF] text-white text-xs font-bold hover:bg-[#7c4de0] transition-colors shadow-[0_0_15px_#915EFF66] flex items-center gap-2"
                  >
                    {submitting ? "Publishing..." : "Publish Review 🚀"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedbacks");
