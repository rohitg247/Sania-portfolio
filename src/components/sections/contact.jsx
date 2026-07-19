'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SectionWrapper, SectionHeading, FadeIn } from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PROFILE, SOCIALS } from '@/lib/constants';

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram };

const EMPTY = { name: '', email: '', subject: '', message: '' };

function ContactInfo() {
  const rows = [
    { Icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { Icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phoneHref}` },
    { Icon: MapPin, label: 'Location', value: PROFILE.location, href: null },
  ];

  return (
    <div className="glass-card h-full p-7 sm:p-8">
      <h3 className="text-xl font-bold">Get in touch</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Open to full-time roles and freelance campaign work.
      </p>

      <div className="mt-8 space-y-5">
        {rows.map(({ Icon, label, value, href }) => {
          const content = (
            <>
              <span className="gradient-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
                <span className="block break-words text-sm font-semibold">{value}</span>
              </span>
            </>
          );

          return href ? (
            <a
              key={label}
              href={href}
              className="flex min-h-11 items-center gap-4 rounded-xl transition-colors hover:text-primary-text"
            >
              {content}
            </a>
          ) : (
            <div key={label} className="flex min-h-11 items-center gap-4">
              {content}
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Elsewhere
        </p>
        <div className="flex gap-3">
          {SOCIALS.map(({ label, icon, href }) => {
            const Icon = SOCIAL_ICONS[icon];
            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="glow-hover inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'That email looks invalid.';
    if (!values.subject.trim()) next.subject = 'Please add a subject.';
    if (!values.message.trim()) next.message = 'Please write a message.';
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No delivery wired up yet — this only confirms the UI flow.
    setSent(true);
    setValues(EMPTY);
  };

  const fields = [
    { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
  ];

  return (
    <SectionWrapper id="contact" className="mesh-gradient">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's Work Together" />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <FadeIn>
            <ContactInfo />
          </FadeIn>

          <FadeIn delay={0.12}>
            <div className="glass-card p-7 sm:p-8">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 220, delay: 0.1 }}
                      className="gradient-primary mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-glow"
                    >
                      <motion.span
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        <Check className="h-10 w-10" strokeWidth={3} />
                      </motion.span>
                    </motion.span>
                    <h3 className="text-2xl font-bold">Message ready</h3>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                      Thanks for reaching out. Delivery isn&apos;t connected yet — in the meantime,
                      email{' '}
                      <a className="font-semibold text-primary-text" href={`mailto:${PROFILE.email}`}>
                        {PROFILE.email}
                      </a>{' '}
                      directly.
                    </p>
                    <Button variant="outline" className="mt-8" onClick={() => setSent(false)}>
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {fields.map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <Label htmlFor={id}>{label}</Label>
                        <Input
                          id={id}
                          type={type}
                          placeholder={placeholder}
                          value={values[id]}
                          onChange={update(id)}
                          aria-invalid={Boolean(errors[id])}
                          aria-describedby={errors[id] ? `${id}-error` : undefined}
                        />
                        {errors[id] ? (
                          <p id={`${id}-error`} className="mt-1.5 text-sm text-crimson">
                            {errors[id]}
                          </p>
                        ) : null}
                      </div>
                    ))}

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={5}
                        placeholder="Tell me about the project or role…"
                        value={values.message}
                        onChange={update('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message ? (
                        <p id="message-error" className="mt-1.5 text-sm text-crimson">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full">
                      Send Message <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </SectionWrapper>
  );
}
