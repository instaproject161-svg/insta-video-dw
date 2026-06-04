"use client";

import { useState } from "react";
import { Mail, Clock, Send, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "instaproject161@gmail.com";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<FormState>("idle");

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setState("loading");

    // Simulate form submission — integrate real email service here
    await new Promise((r) => setTimeout(r, 1400));

    // For now always succeed (replace with real API call)
    setState("success");
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setState("idle");
  };

  if (state === "success") {
    return (
      <div className="glass-card rounded-2xl p-10 text-center flex flex-col items-center gap-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-400">
        <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
            Thanks for reaching out. We&apos;ll review your message and reply to{" "}
            <span className="text-foreground font-medium">{form.email}</span> within 48 business hours.
          </p>
        </div>
        <Button onClick={handleReset} variant="outline" className="border-border/60">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
            Full Name <span className="text-primary">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={form.name}
            onChange={set("name")}
            disabled={state === "loading"}
            className={cn(
              "h-11 bg-secondary/40 border-border/60 focus-visible:ring-primary",
              errors.name && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email Address <span className="text-primary">*</span>
          </label>
          <Input
            id="email"
            type="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={set("email")}
            disabled={state === "loading"}
            className={cn(
              "h-11 bg-secondary/40 border-border/60 focus-visible:ring-primary",
              errors.email && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
          Subject <span className="text-primary">*</span>
        </label>
        <Input
          id="subject"
          type="text"
          placeholder="How can we help you?"
          value={form.subject}
          onChange={set("subject")}
          disabled={state === "loading"}
          className={cn(
            "h-11 bg-secondary/40 border-border/60 focus-visible:ring-primary",
            errors.subject && "border-destructive focus-visible:ring-destructive"
          )}
        />
        {errors.subject && (
          <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />{errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us more about your question or issue..."
          value={form.message}
          onChange={set("message")}
          disabled={state === "loading"}
          className={cn(
            "w-full px-4 py-3 rounded-xl text-sm bg-secondary/40 border text-foreground placeholder:text-muted-foreground resize-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60",
            errors.message ? "border-destructive focus-visible:ring-destructive" : "border-border/60"
          )}
        />
        <div className="flex items-start justify-between mt-1.5">
          {errors.message ? (
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" />{errors.message}
            </p>
          ) : (
            <span />
          )}
          <span className={cn(
            "text-xs ml-auto shrink-0",
            form.message.length < 20 ? "text-muted-foreground" : "text-primary"
          )}>
            {form.message.length} / 20 min
          </span>
        </div>
      </div>

      {state === "error" && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <Button
        type="submit"
        disabled={state === "loading"}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 disabled:opacity-60"
      >
        {state === "loading" ? (
          <>
            <Loader className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

export function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
          Get in <span className="gradient-text">Touch</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto text-pretty">
          Have a question, suggestion, or issue? We&apos;d love to hear from you. We typically respond within 48 hours.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Email Us</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-primary hover:underline break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Business Hours</p>
                <p className="text-sm text-muted-foreground">24/7 Online Support</p>
                <p className="text-xs text-muted-foreground mt-0.5">Response within 48 hours</p>
              </div>
            </div>
          </div>

          {/* Quick topics */}
          <div className="glass-card rounded-2xl p-5">
            <p className="text-sm font-semibold text-foreground mb-3">Common Topics</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "Download not working",
                "Privacy / data requests",
                "DMCA / copyright",
                "Feature requests",
                "Advertising",
                "General enquiry",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form — spans 2 cols */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
