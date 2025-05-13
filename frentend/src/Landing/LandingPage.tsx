import "./LandingPage.css";
import React, { useState } from "react";
import image1 from "./../assets/2.webp";
import image2 from "./../assets/ai.webp";
// Define types for menu and dropdowns
interface DropdownItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  desc?: string;
}

interface MenuItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const menu: MenuItem[] = [
  {
    label: "What is Make",
    dropdown: [
      { label: "Overview", href: "#" },
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    label: "Make + AI",
    dropdown: [
      { label: "AI Overview", href: "#" },
      { label: "AI Use Cases", href: "#" },
    ],
  },
  {
    label: "Solutions",
    dropdown: [], // handled specially
  },
  { label: "Pricing", href: "#" },
];

const solutionBusinessAreas: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}[] = [
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Marketing",
    desc: "Drive faster growth with marketing...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 17l6-6 4 4 8-8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14 7h7v7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sales",
    desc: "Level up your sales cycle to close more...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Operations",
    desc: "Get teams and tools working together...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Customer Experience",
    desc: "Take better care of customers with...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="2"
          y="7"
          width="20"
          height="14"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 3v4M8 3v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Finance",
    desc: "Manage time as well as you manage...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="16"
          rx="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M16 2v4M8 2v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Information Technology",
    desc: "Efficiently scale and control your IT...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 14s1.5 2 4 2 4-2 4-2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="10" r="1" />
        <circle cx="15" cy="10" r="1" />
      </svg>
    ),
    title: "People",
    desc: "Get your HR processes running...",
  },
  {
    icon: (
      <svg
        className="w-7 h-7 text-[#25004b] mr-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Workplace Productivity",
    desc: "Automate busy work to focus on what...",
  },
];

const solutionAutomations: { title: string; desc: string }[] = [
  { title: "Social Media Posting", desc: "More engagement, less effort" },
  { title: "Lead Management", desc: "Automate for more conversions" },
  { title: "Invoicing", desc: "Save time on invoicing and billing" },
  { title: "Contracting", desc: "Automate and make deals faster" },
  { title: "Email Marketing", desc: "Increase your email conversions" },
  { title: "Content Creation", desc: "Generate high quality content with AI" },
];

// Create more realistic integration logos for debugging
const createIntegrationLogo = (number: number, color: string) => (
  <div className="integration-logo">
    <div className={`integration-logo-inner ${color}`}>
      <span className="integration-logo-text">{number}</span>
    </div>
  </div>
);

// Create more integration logos for both rows
const topLogos = [
  createIntegrationLogo(1, "bg-blue-500"),
  createIntegrationLogo(2, "bg-pink-500"),
  createIntegrationLogo(3, "bg-green-500"),
  createIntegrationLogo(4, "bg-yellow-500"),
  createIntegrationLogo(5, "bg-purple-500"),
  createIntegrationLogo(6, "bg-red-500"),
  createIntegrationLogo(7, "bg-indigo-500"),
  createIntegrationLogo(8, "bg-orange-500"),
  createIntegrationLogo(9, "bg-teal-500"),
  createIntegrationLogo(10, "bg-cyan-500"),
];

const bottomLogos = [
  createIntegrationLogo(11, "bg-red-500"),
  createIntegrationLogo(12, "bg-blue-500"),
  createIntegrationLogo(13, "bg-green-500"),
  createIntegrationLogo(14, "bg-yellow-500"),
  createIntegrationLogo(15, "bg-purple-500"),
  createIntegrationLogo(16, "bg-pink-500"),
  createIntegrationLogo(17, "bg-indigo-500"),
  createIntegrationLogo(18, "bg-orange-500"),
  createIntegrationLogo(19, "bg-teal-500"),
  createIntegrationLogo(20, "bg-cyan-500"),
];

// Remove the inline style block since CSS is now in LandingPage.css
const IntegrationsSection = () => (
  <section className="integration-section">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="integration-heading mb-4">
        Plug AI into your own data <span className="text-white">&</span>
      </h2>
      <p className="integration-heading integration-highlight">
        over 500 integrations
      </p>
    </div>

    {/* First row - scrolling left */}
    <div className="integration-logos-container">
      <div className="integration-scrolling-row integration-scrolling-row-left">
        {[...topLogos, ...topLogos, ...topLogos].map((logo, i) => (
          <div key={`top-${i}`}>{logo}</div>
        ))}
      </div>
    </div>

    {/* Second row - scrolling right */}
    <div className="integration-logos-container">
      <div className="integration-scrolling-row integration-scrolling-row-right">
        {[...bottomLogos, ...bottomLogos, ...bottomLogos].map((logo, i) => (
          <div key={`bottom-${i}`}>{logo}</div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      title: "Realize the true potential of AI",
      description:
        "AI is transforming the way we work. Make accelerates this process, with 200+ pre-built integrations with AI apps. Make AI Agents open even more possibilities, with automation that thinks and acts in the moment.",
      image: image2,
      imageAlt: "AI Integration Features",
    },
    {
      title: "Seamless Workflow Automation",
      description:
        "Build powerful automated workflows without coding. Connect your favorite apps and services to create end-to-end automation that saves time and reduces errors.",
      image: image1,
      imageAlt: "Workflow Automation",
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Keep your data safe with enterprise-level security features. Benefit from advanced encryption, role-based access control, and compliance with major security standards.",
      image: image2,
      imageAlt: "Security Features",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 px-8">
      <div className="mx-auto max-w-7xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`grid gap-12 lg:grid-cols-2 lg:gap-8 items-center mb-24 ${
              index % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
          >
            {/* Content */}
            <div className={`max-w-xl ${index % 2 === 1 ? "lg:ml-auto" : ""}`}>
              <h2 className="text-4xl font-extrabold tracking-tight text-[#25004b] sm:text-5xl lg:text-6xl">
                {feature.title}
              </h2>
              <p className="mt-6 text-xl text-gray-600 leading-8">
                {feature.description}
              </p>
              <div className="mt-8">
                <a
                  href="#"
                  className="inline-block rounded-lg bg-[#ff1fbf] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#e61baa] transition-colors duration-200"
                >
                  Learn more
                </a>
              </div>
            </div>

            {/* Image */}
            <div
              className={`relative mt-12 lg:mt-0 ${
                index % 2 === 1 ? "lg:order-first" : ""
              }`}
            >
              {/* Decorative dots */}
              <div className="absolute -top-8 -right-8 w-72 h-72 opacity-10 bg-[radial-gradient(circle,_#ff1fbf_2px,_transparent_2px)] [background-size:20px_20px]"></div>
              <div className="absolute -bottom-8 -left-8 w-72 h-72 opacity-10 bg-[radial-gradient(circle,_#ff1fbf_2px,_transparent_2px)] [background-size:20px_20px]"></div>

              {/* Main image */}
              <div className="relative mx-auto max-w-xl lg:max-w-none">
                <img
                  src={feature.image}
                  alt={feature.imageAlt}
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-400 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-gray-900">$499</span>
              <span className="text-gray-500 line-through ml-2">$699</span>
              <span className="text-gray-500 ml-2">/project</span>
            </div>
            <p className="text-gray-600 mb-8">Quick, clean design for small projects.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Up to 3 screens or 1 landing page",
                "Basic UX flow & structure",
                "Responsive design (desktop & mobile)",
                "2 design revisions",
                "Typography & color styling",
                "Figma source file delivery",
                "Delivery in 5-7 business days"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-500 transition-colors">
              Upgrade to Starter
            </button>
          </div>

          {/* Growth Plan */}
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 hover:shadow-xl transition-shadow duration-300 relative box-shadow-md">
            <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
              POPULAR
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-400 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Growth</h3>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-gray-900">$1,299</span>
              <span className="text-gray-500 line-through ml-2">$1,300</span>
              <span className="text-gray-500 ml-2">/project</span>
            </div>
            <p className="text-gray-600 mb-8">Professional UI/UX for growing products.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Up to 8 web or app screens",
                "UX research & user flow mapping",
                "Wireframes + high-fidelity UI",
                "Interactive prototype (Figma/InVision)",
                "Mobile & desktop responsive design",
                "3-4 rounds of feedback/revisions",
                "Developer handoff with assets"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-emerald-400 text-white py-3 rounded-lg font-semibold hover:bg-emerald-500 transition-colors">
              Upgrade to Growth
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-400 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.866 15 19 11.866 19 8C19 4.134 15.866 1 12 1C8.13401 1 5 4.134 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 20H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-4xl font-bold text-gray-900">Custom</span>
            </div>
            <p className="text-gray-600 mb-8">Full-scale design tailored for your team.</p>
            <ul className="space-y-4 mb-8">
              {[
                "Complete web/app design (10+ screens)",
                "UX workshops & stakeholder interviews",
                "Full design system with components",
                "Journey mapping & flow diagrams",
                "Interactive prototype with animations",
                "Unlimited design revisions (within scope)",
                "Priority support & dedicated design lead"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-blue-400 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrialRequestSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden bg-gradient-to-br from-black to-[#2a0942] rounded-2xl shadow-2xl border border-gray-800">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#ff1fbf_0%,_transparent_60%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#7928ca_0%,_transparent_60%)]"></div>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-6 sm:p-8 lg:p-12">
            {/* Left Content */}
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                Supercharge your productivity
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Organize tasks, collaborate on docs, track goals, and streamline
                team communication—all in one place, enhanced by AI.
              </p>
              <button className="inline-flex items-center bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 group">
                Get started. It's FREE
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[450px] rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="relative bg-white/[0.02] backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400 text-xs">
                      Ops weekly | Meeting Notes
                    </span>
                  </div>
                </div>

                {/* Calendar Interface Mock */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white text-sm font-medium">
                      Calendar
                    </div>
                    <div className="text-gray-400 text-xs">Today</div>
                  </div>

                  <div className="space-y-2">
                    {/* Task Items */}
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="bg-white/5 p-3 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-purple-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6l4 2"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white text-xs font-medium">
                              Task Planning
                            </div>
                            <div className="text-gray-400 text-[11px]">
                              2:00 PM - 3:00 PM
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-8">
              <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                SCALE AI AGENTS WITH ZAPIER
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              The most connected AI orchestration platform
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Build and ship AI workflows in minutes—no IT bottlenecks, no
              complexity. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
                Start free with email
              </button>
              <button className="flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-gray-300 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 text-gray-700">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Start free with Google</span>
              </button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                {/* Orange Circle with Connection Lines */}
                <div className="relative">
                  <div className="w-64 h-64 bg-orange-500 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white border-4 border-gray-100 rounded shadow-lg transform translate-x-1/3 translate-y-1/3"></div>
                  {/* Small decorative elements */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-orange-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-300 rounded-full"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-orange-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  return (
    <nav className="fixed top-7 left-0 right-0 bg-transparent z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between bg-white rounded-full border border-gray-200 shadow-sm px-3 py-2">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-3">
            <span className="font-extrabold text-xl tracking-tight flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="8" fill="#7B68EE" />
                <rect x="6" y="8" width="6" height="20" rx="3" fill="#fff" />
                <rect x="15" y="8" width="6" height="20" rx="3" fill="#fff" />
                <rect x="24" y="8" width="6" height="20" rx="3" fill="#fff" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[#25004b] text-lg font-bold">ClickUp</span>
                <span className="text-gray-500 text-[10px] leading-none -mt-1">The everything app, for work.</span>
              </div>
            </span>
          </div>

          {/* Center Menu */}
          <div className="flex-1 flex justify-center">
            <ul className="hidden lg:flex items-center space-x-8 font-medium">
              {menu.map((item) => (
                <li key={item.label} className="relative group">
                  {item.label === "Solutions" ? (
                    <>
                      <button
                        className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none group-hover:text-gray-900 transition-colors"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.label}
                        <svg
                          className="ml-1.5 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {/* Mega Dropdown */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-16 bg-white rounded-2xl shadow-lg py-8 px-8 min-w-[900px] z-40 transition-all duration-200 border border-gray-100 ${
                          openDropdown === item.label ? "block" : "hidden"
                        }`}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <div className="font-extrabold text-2xl mb-6">
                          Make across your business
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 mb-8">
                          {solutionBusinessAreas.map((area, i) => (
                            <div key={area.title} className="flex items-start">
                              {area.icon}
                              <div>
                                <div className="font-bold text-lg mb-1">
                                  {area.title}
                                </div>
                                <div className="text-sm text-[#25004b] opacity-80 leading-snug">
                                  {area.desc}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="font-extrabold text-xl mb-3">
                          Popular automations
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                          {solutionAutomations.map((auto, i) => (
                            <div key={auto.title}>
                              <div className="font-bold text-base mb-1">
                                {auto.title}
                              </div>
                              <div className="text-sm text-[#25004b] opacity-80">
                                {auto.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : item.dropdown ? (
                    <>
                      <button
                        className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none group-hover:text-gray-900 transition-colors"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.label}
                        <svg
                          className="ml-1.5 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {/* Regular Dropdown */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-16 bg-white rounded-xl shadow-lg py-4 px-6 min-w-[280px] z-40 transition-all duration-200 border border-gray-100 ${
                          openDropdown === item.label ? "block" : "hidden"
                        }`}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        {item.dropdown.map((drop, i) => (
                          <a
                            key={drop.label}
                            href={drop.href}
                            className="flex items-start py-2 px-2 rounded-lg hover:bg-[#f3e8ff] transition-colors mb-1"
                          >
                            {"icon" in drop && drop.icon}
                            <div>
                              <div className="font-semibold text-base">
                                {drop.label}
                              </div>
                              {"desc" in drop && (
                                <div className="text-sm text-gray-500 max-w-xs">
                                  {drop.desc}
                                </div>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden md:inline-block text-gray-600 hover:text-gray-900 font-medium transition-colors bg-white rounded-full px-4 py-2"
            >
              Contact Sales
            </a>
            <a
              href="#"
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors bg-white rounded-full px-4 py-2"
            >
              Log In
            </a>
            <a
              href="#"
              className="bg-[#7B68EE] hover:bg-[#6A5ACD] text-white font-medium px-4 py-2 rounded-full transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Fact = () => {
  return (
    <section className="w-full bg-black bg-gradient-to-br from-black via-[#25004b] to-[#3a1a5d] text-white py-16 px-4 flex flex-col items-center">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-indigo-400 font-semibold mb-2 tracking-widest text-base">
          THE FACTS
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Facts <span className="text-indigo-300">that demand attention</span>
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          And require Outthink's human-centric approach to cybersecurity.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
          <div className="flex-1 min-w-[200px]">
            <div className="text-6xl font-extrabold mb-2 text-white">91%</div>
            <div className="text-base text-gray-300">
              Of Cyberattacks begin with a phishing email
              <br />
              (Deloitte, 2023)
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-6xl font-extrabold mb-2 text-white">93%</div>
            <div className="text-base text-gray-300">
              Of enterprise organizations already run traditional security
              awareness and phishing simulations (Gartner, 2023)
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-6xl font-extrabold mb-2 text-white">90%</div>
            <div className="text-base text-gray-300">
              Of security breaches still involve the human element (Verizon 2023
              DBIR)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <>
      {/* Landing Page Footer section */}
      <section className="min-h-screen flex flex-col bg-[#25004b] text-white">
        <header className="flex flex-col items-center justify-center flex-1 py-16 px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Realize your business's full potential
          </h1>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 text-lg">
            Get started free
          </button>
        </header>

        <footer className="w-full bg-[#25004b] border-t border-[#3a1a5d] pt-10 pb-6 px-4 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-10">
            <div className="flex-1 max-w-sm mb-8 lg:mb-0">
              <form className="flex flex-col">
                <label
                  htmlFor="newsletter"
                  className="font-semibold mb-2 text-white"
                >
                  Subscribe to news updates
                  <span className="text-pink-400">*</span>
                </label>
                <input
                  id="newsletter"
                  type="email"
                  placeholder="Your email address"
                  className="rounded-md px-4 py-2 mb-2 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <p className="text-xs text-gray-300 mb-2">
                  * By submitting this form, you confirm that you agree to the
                  storing and processing of your personal data as described in
                  our Privacy Notice.
                </p>
                <button
                  type="submit"
                  className="text-pink-400 font-semibold hover:underline text-left"
                >
                  SUBSCRIBE →
                </button>
              </form>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <h3 className="font-bold mb-3 text-white">Make</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Product
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Apps
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Get demo
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Enterprise
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Status
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-white">Solutions</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      How-to guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Success stories
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Partner directory
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Idea exchange
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-white">Resources</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Make Academy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Make Community
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Developers Hub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Webinars
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Affiliate
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Partners
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Security
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      On-prem agents
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-3 text-white">Company</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Contact us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Terms & conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Privacy and GDPR
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Disclaimer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Bug Bounty
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Our story
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-pink-400">
                      Ethics & Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center mt-10 border-t border-[#3a1a5d] pt-6 gap-4">
            <div className="text-xs text-gray-300">
              © 2025 Celonis, Inc. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 text-2xl">
              {/* Social Icons (SVGs from user) */}
              <a
                aria-label="Facebook"
                className="hover:text-pink-400 transition-colors"
                href="https://www.facebook.com/itsMakeHQ/"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M480 257.35c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"></path>
                </svg>
              </a>
              <a
                aria-label="Instagram"
                className="hover:text-pink-400 transition-colors"
                href="https://www.instagram.com/itsmakehq/"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"></path>
                  <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"></path>
                </svg>
              </a>
              <a
                aria-label="Twitter"
                className="hover:text-pink-400 transition-colors"
                href="https://twitter.com/make_hq"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"></path>
                </svg>
              </a>
              <a
                aria-label="LinkedIn"
                className="hover:text-pink-400 transition-colors"
                href="https://www.Linkedin.com/company/itsmakehq"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z"></path>
                </svg>
              </a>
              <a
                aria-label="Youtube"
                className="hover:text-pink-400 transition-colors"
                href="https://www.youtube.com/@itsmake"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M508.64 148.79c0-45-33.1-81.2-74-81.2C379.24 65 322.74 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.59-.06 220.19 0 255.79q-.15 53.4 3.4 106.9c0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8q91.2.3 178.6-3.8c40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107q.34-53.4-3.26-106.9zM207 353.89v-196.5l145 98.2z"></path>
                </svg>
              </a>
            </div>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <span className="font-bold text-white text-lg">'GLASSDOOR'</span>
              <span className="text-white text-base">4.8</span>
              <span className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-white inline"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
                  </svg>
                ))}
              </span>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <IntegrationsSection />
      <FeaturesSection />
      <PricingSection />
      <TrialRequestSection />
      <Fact />
      <Footer />
    </>
  );
};

export default LandingPage;
