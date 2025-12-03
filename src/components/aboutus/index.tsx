import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreateDesign,
  Customise,
  Development,
  DotIcon,
  Optimisation,
  Residential,
  Support,
} from "../Icons";
import CustomInput from "@/common/FormElements/CustomInput";
import Button from "@/common/Button";
import { motion } from "framer-motion";

const H = {
  section: "max-w-7xl mx-auto px-5 md:px-8",
  h1: "text-3xl md:text-4xl font-Gordita-Bold tracking-tight",
  h2: "text-xl md:text-2xl font-Gordita-Bold tracking-tight",
  p: "text-[12px] md:text-[14px] leading-7 text-[#50525a] font-Gordita-Medium",
  card: "rounded-2xl shadow-sm border border-gray-200 bg-white",
};

const highlights = [
  { title: "CUSTOM ARCHITECTURAL DESIGN", sub: "Bring your complex ideas to life with tailored and innovative architectural blueprints.", Icon: CreateDesign },
  { title: "END-TO-END CUSTOMIZATION", sub: "Tailor every aspect of the project lifecycle to precisely match your unique business needs and specifications.", Icon: Customise },
  { title: "PREMIUM RESIDENTIAL SOLUTIONS", sub: "Expert solutions for creating beautiful, sustainable, and high-value residential spaces in the USA.", Icon: Residential },
  { title: "STRATEGIC DEVELOPMENT", sub: "Innovative and efficient full-stack development and construction management for modern projects.", Icon: Development },
  { title: "PERFORMANCE OPTIMIZATION", sub: "Maximize operational efficiency and system performance through data-driven optimization strategies.", Icon: Optimisation },
  { title: "RELIABLE PROJECT SUPPORT", sub: "Our dedicated team is available around the clock to support your project and ensure smooth execution.", Icon: Support },
];

const impactStats = [
  { label: "Projects Completed", value: "50+" },
  { label: "US States Served", value: "12+" },
  { label: "Avg. Project Satisfaction", value: "98%" },
  { label: "Partner Network", value: "50+" },
];

const values = [
  {
    title: "Client-First Partnership",
    description:
      "We obsess over clarity, timelines, and results so our clients stay in complete control and feel empowered throughout the process.",
    icon: "🤝",
  },
  {
    title: "Radical Transparency",
    description:
      "From project scoping and budget breakdowns to technical challenges, we present facts without the fluff, fostering total trust.",
    icon: "🔍",
  },
  {
    title: "Design + Data Integration",
    description:
      "Aesthetics and functionality meet analytics—every design choice and recommendation is backed by real performance signals and metrics.",
    icon: "📊",
  },
  {
    title: "Always Accessible Support",
    description:
      "Got a critical question? Our reliable support team is structured to be around when you need us most, ensuring project momentum.",
    icon: "📞",
  },
];

// UPDATED: Leadership Team for Improvement LLC
const team = [
  {
    name: "ALEX JOHNSON",
    role: "FOUNDER & CEO — Improvement LLC",
    bio: `As the Founder & CEO of Improvement LLC, I bring over a decade of experience in large-scale digital transformation and architectural design. My journey began with a commitment to demystify complex development and construction processes. At Improvement LLC, my focus is on leveraging technology, data, and innovation to bridge traditional industry gaps, offering clients a seamless, high-ROI platform for their projects. I am committed to creating a trustworthy, future-ready ecosystem where clients feel empowered and confident in their strategic investments.`,
    img: "/images/team/alex_johnson.png", // Placeholder image path
  },
  {
    name: "MARIA LOPEZ",
    role: "STRATEGIC DIRECTOR — Improvement LLC",
    img: "/images/team/maria_lopez.png", // Placeholder image path (you'll need to create this image)
    bio: `As the Strategic Director and an early investor at Improvement LLC, I provide the financial acumen and a strong belief in the company’s mission to transform the design and development landscape. My role is centered on shaping strategies that ensure long-term growth, scalability, and sustainability. With a focus on creating measurable value, I support initiatives that make large-scale projects simpler, smarter, and more efficient. I believe in driving a results-oriented approach, helping Improvement LLC become a leader in providing transparent, future-proof development solutions.`,
  },
];


const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AboutImprovementLLC() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", about: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const isValidPhone = (p: string) => /^\d{10}$/.test(p);
  const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((s) => ({ ...s, [key]: value }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!isValidPhone(form.phone)) e.phone = "Enter a valid 10‑digit phone";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email";
    if (form.about.trim().length < 20) e.about = "Tell us a bit more (20+ chars)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      // TODO: swap with your API endpoint
      // await apiClient.post("/careers/apply", form);
      await new Promise((r) => setTimeout(r, 900));
      alert("Thanks! We'll get back to you soon.");
      setForm({ name: "", phone: "", email: "", about: "" });
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  const crumb = useMemo(
    () => (
      <nav aria-label="Breadcrumb" className="text-white/90">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li className="opacity-70">›</li>
          <li className="font-Gordita-Medium text-[#1d547]">About us</li>
        </ol>
      </nav>
    ),
    []
  );

  return (
    <div className="min-h-screen w-full bg-white">
      <section className="relative">
        <div className="relative h-[140px] md:h-[180px] w-full overflow-hidden">
          <Image
            src="/images/background/aboutus_bg.jpg" // Keep or replace this image
            alt="About Improvement LLC background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#090a12]/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
            <motion.h1
              variants={fadeIn}
              initial="hidden"
              animate="show"
              className="text-3xl md:text-4xl font-Gordita-Bold text-white "
            >
              About Improvement<span className="text-[#2872a1]">
                LLC
              </span>
            </motion.h1>
            <motion.div variants={fadeIn} initial="hidden" animate="show" className="mt-2">
              {crumb}
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTRO - UPDATED CONTENT */}
      <section className={`${H.section} py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center`}>
        <div className="space-y-4">
          <h2 className={H.h1}>Driving Innovation and Excellence in Design & Development.</h2>
          <p className={H.p}>
            Improvement LLC is a USA-based design and development firm dedicated to delivering
            **custom, high-impact solutions** across architecture, technology, and process optimization.
            We partner with businesses and individuals to transform visions into tangible realities,
            ensuring every project is marked by quality, efficiency, and radical transparency.
            Our expert-led approach puts you in control of your successful outcome.
          </p>
          <div className="flex gap-3 max-md:justify-center">
            <Link href="/services/custom-builder" className="inline-block">
              <Button className="bg-[#4388ef] text-white font-Gordita-Medium md:text-[14px] text-[12px] rounded-xl px-5 py-2">Explore Our Services</Button>
            </Link>
            <Link href="/contact" className="inline-block">
              <Button className="bg-white border border-gray-300 font-Gordita-Medium md:text-[14px] text-[12px] rounded-xl px-5 py-2 text-gray-700 hover:bg-gray-50 transition-colors">Contact Us</Button>
            </Link>
          </div>
        </div>

        <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <div className="flex items-center justify-center h-full text-gray-500 font-Gordita-Medium">
            [Image of Development or Design graphic]
          </div>
        </div>
      </section>

      <section className={`${H.section} py-12 md:py-16 bg-gray-50`}>
        <h2 className={`${H.h1} text-center mb-10`}>What We Do Best</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className={`${H.card} p-6 space-y-3 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
            >
              <h3 className="text-lg font-Gordita-Bold text-[#090a12]">{item.title}</h3>
              <p className={H.p}>{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* IMPACT/STATS SECTION - Uses updated 'impactStats' array */}
      <section className="bg-[#090a12] py-12 md:py-16">
        <div className={`${H.section} text-white`}>
          <h2 className={`${H.h1} text-center mb-10 text-white`}>Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Using a placeholder for CountUp component, assuming it handles animation */}
                <div className="text-4xl md:text-5xl font-Gordita-Bold text-[#2872a1] mb-1">
                  {/* In a real app, you'd use <CountUp end={stat.value} duration={2} /> */}
                  {stat.value}
                </div>
                <p className="text-sm md:text-base opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION - Uses updated 'values' array */}
      <section className={`${H.section} py-12 md:py-16`}>
        <h2 className={`${H.h1} text-center mb-10`}>Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className={`${H.card} p-6 space-y-3 transition-all duration-300 hover:shadow-xl`}
            >
              <div className="text-4xl mb-2">{v.icon}</div>
              <h3 className="text-xl font-Gordita-Bold text-[#090a12]">{v.title}</h3>
              <p className={H.p}>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP/TEAM SECTION - Uses updated 'team' array */}
      <section className={`${H.section} py-12 md:py-16 bg-gray-50`}>
        <h2 className={`${H.h1} text-center mb-12`}>Meet the Leadership</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className={`${H.card} p-8 flex flex-col sm:flex-row gap-6`}
            >
              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-full overflow-hidden relative border-4 border-[#2872a1]/50">
                <Image
                  src={member.img || "/images/team/placeholder.png"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-Gordita-Bold text-[#090a12]">{member.name}</h3>
                <p className="text-sm font-Gordita-Medium text-[#4388ef] mb-3">{member.role}</p>
                <p className={H.p}>{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CAREER/CONTACT FORM SECTION - Kept submission logic the same */}
      <section className={`${H.section} py-12 md:py-16`}>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className={H.h1}>Join Our Team!</h2>
            <p className={H.p}>
              We are always looking for passionate individuals who share our commitment to innovation and transparency.
              If you are ready to make a significant impact in design and development,
              tell us about yourself and your skills.
            </p>
            {/* Placeholder for career image/pitch graphic */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden mt-6 bg-blue-50">
              <div className="flex items-center justify-center h-full text-[#2872a1] font-Gordita-Medium">
                [Image: Career Opportunities at Improvement LLC]
              </div>
            </div>
          </div>

          <div className={`${H.card} p-6 md:p-8 space-y-4`}>
            <h3 className={H.h2}>Connect With Us</h3>
            <form onSubmit={submit} className="space-y-4">
              <CustomInput
                label="Your Name"
                value={form.name}
                onChange={(e: any) => handleChange("name", e.target.value)}
                className="md:py-1 py-[2px]"
                name="name"
                type="text"
              />
              <CustomInput
                label="Phone Number"
                value={form.phone}
                onChange={(e: any) => handleChange("phone", e.target.value)}
                type="number"
                className="md:py-1 py-[2px]"
              />
              <CustomInput
                label="Email Address"
                value={form.email}
                onChange={(e: any) => handleChange("email", e.target.value)}
                name="email"
                required
                className="md:py-1 py-[2px]"
                type="text"
              />
              <div>
                <label className="block text-sm font-Gordita-Medium text-gray-700 mb-1">Tell us about your interest/skill (min 20 chars)</label>
                <textarea
                  value={form.about}
                  onChange={(e) => handleChange("about", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-[#4388ef] focus:border-[#4388ef]"
                  placeholder="I am interested in..."
                ></textarea>
                {errors.about && <p className="text-xs text-red-500 mt-1">{errors.about}</p>}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#4388ef] text-white font-Gordita-Bold rounded-xl py-3 disabled:opacity-50 transition-opacity"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* TIMELINE/JOURNEY SECTION (assuming it uses the OurJourney component) */}
      <section className={`${H.section} py-12 md:py-16 bg-gray-50`}>
        <h2 className={`${H.h1} text-center mb-10`}>Our Journey So Far</h2>
        {/* <OurJourney /> */}
        <div className="h-64 flex items-center justify-center text-gray-500 border border-dashed rounded-lg">
          [Timeline Component (OurJourney) Goes Here]
        </div>
      </section>

    </div>
  );
}