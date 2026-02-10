import { useState, useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Facebook, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GetInTouch = () => {
  const { toast } = useToast();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setErrors({});
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-background border transition-colors text-foreground placeholder:text-muted-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30 ${
      errors[field] ? "border-destructive" : "border-border"
    }`;

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 bg-surface">
      <div className="container">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-0.5 bg-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Reach Out</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Get In Touch</h2>
          <p className="text-muted-foreground mt-2">Meet our distinguished leadership team driving the vision and growth of PropManage.</p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-lg text-foreground">ALCHIEPOY</span>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Call Us</h4>
                <p className="text-muted-foreground text-sm">Our call center is 7 AM to 5 PM</p>
                <div className="flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm font-medium">09012345890</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Chat With Us</h4>
                <p className="text-muted-foreground text-sm">Reach our friendly team via email.</p>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm font-medium">Book us on email</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Facebook className="w-4 h-4 text-primary" />
                  <span className="text-foreground text-sm font-medium">Message us on Facebook</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">Visit Us</h4>
                <p className="text-muted-foreground text-sm">Chat to us in person at a HQ</p>
                <div className="flex items-start gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-foreground text-sm font-medium">
                    Alchiepoy Business Centre,<br />
                    Brgy. Mabalacat, San Fernando
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">First Name</label>
                <input
                  className={inputClass("firstName")}
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Last Name</label>
                <input
                  className={inputClass("lastName")}
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input
                type="email"
                className={inputClass("email")}
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Phone Number</label>
              <input
                className={inputClass("phone")}
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <textarea
                rows={4}
                className={inputClass("message")}
                placeholder="Write us a message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 bg-gold text-accent-foreground font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
