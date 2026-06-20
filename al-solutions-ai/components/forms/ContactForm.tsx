"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "", // spam protection
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.log("Spam detected - honeypot field filled");
      return;
    }

    try {
      // TODO: Connect to form handler (Formspree, Resend, or custom API endpoint)
      // For now, log the data
      console.log("Contact form submission:", {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      // Example: Replace with actual form handler
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      alert("Thank you! We&apos;ll be in touch within 4 business hours.");
      setFormData({ name: "", company: "", email: "", phone: "", message: "", honeypot: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again or email us directly.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot field - hidden from users */}
      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: "none" }} />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border-subtle bg-bg-default px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/20"
            placeholder="Your name"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Company *</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border-subtle bg-bg-default px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/20"
            placeholder="Your company"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border-subtle bg-bg-default px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/20"
            placeholder="you@company.com"
          />
        </div>

        {/* Phone (Optional) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-border-subtle bg-bg-default px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/20"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-tertiary mb-1.5">What are you looking to build? *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-lg border border-border-subtle bg-bg-default px-4 py-3 text-sm text-text-primary placeholder-text-tertiary transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-400/20 resize-none"
          placeholder="Tell us about your project, timeline, and goals..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-accent-400 text-sm font-semibold text-bg-default transition-all hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-400/20"
      >
        Send message
      </button>

      <p className="mt-3 text-xs text-text-tertiary">We&apos;ll respond within 2 hours.</p>
    </form>
  );
}
