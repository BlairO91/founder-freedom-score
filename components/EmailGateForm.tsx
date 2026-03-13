'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { emailGateSchema, type EmailGateData } from '@/lib/assessment/engine/validation';

interface EmailGateFormProps {
  onSubmit: (data: EmailGateData) => void;
}

export default function EmailGateForm({ onSubmit }: EmailGateFormProps) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ firstName?: boolean; email?: boolean }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = emailGateSchema.safeParse({ firstName, email });

    if (!result.success) {
      const fieldErrors: { firstName?: string; email?: string } = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field as keyof typeof fieldErrors]) {
          fieldErrors[field as keyof typeof fieldErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setTouched({ firstName: true, email: true });
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  function handleBlur(field: 'firstName' | 'email') {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const result = emailGateSchema.safeParse({ firstName, email });
    if (!result.success) {
      const fieldError = result.error.issues.find((i) => i.path[0] === field);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    } else {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-inter font-medium text-navy/70 mb-1.5"
        >
          First name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onBlur={() => handleBlur('firstName')}
          placeholder="Your first name"
          autoComplete="given-name"
          className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-base text-charcoal placeholder:text-navy/30
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
            ${touched.firstName && errors.firstName ? 'border-red-400' : 'border-black/[0.08]'}
          `}
        />
        {touched.firstName && errors.firstName && (
          <p className="mt-1.5 text-sm font-inter text-red-500">{errors.firstName}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-inter font-medium text-navy/70 mb-1.5"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="you@example.com"
          autoComplete="email"
          className={`w-full px-4 py-3 rounded-lg border bg-white font-inter text-base text-charcoal placeholder:text-navy/30
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold
            ${touched.email && errors.email ? 'border-red-400' : 'border-black/[0.08]'}
          `}
        />
        {touched.email && errors.email && (
          <p className="mt-1.5 text-sm font-inter text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button type="submit" className="btn-primary w-full">
          Start My Assessment
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="ml-2">
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </motion.form>
  );
}
