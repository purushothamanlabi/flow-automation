import "./LandingPage.css";
import React, { useState } from "react";
import image1 from "./../assets/2.webp";
import image2 from "./../assets/ai.webp";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from framer-motion
import { Routes as AppRoutes } from "../util/Routes";
import { useNavigate } from "react-router-dom";
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
      { 
        label: "Overview", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>,
        desc: "Learn about our platform and how it works"
      },
      { 
        label: "Features", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>,
        desc: "Explore the powerful features we offer"
      },
      { 
        label: "Integrations", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>,
        desc: "Connect with your favorite tools and apps" 
      },
    ],
  },
  {
    label: "Make + AI",
    dropdown: [
      { 
        label: "AI Overview", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>,
        desc: "Discover how AI enhances our platform" 
      },
      { 
        label: "AI Use Cases", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>,
        desc: "Real-world examples of AI automation" 
      },
    ],
  },
  {
    label: "Solutions",
    dropdown: [
      { 
        label: "Marketing", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>,
        desc: "Drive faster growth with marketing automations" 
      },
      { 
        label: "Sales", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>,
        desc: "Level up your sales cycle to close more deals" 
      },
      { 
        label: "Operations", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>,
        desc: "Get teams and tools working together efficiently" 
      },
      { 
        label: "Customer Experience", 
        href: "#",
        icon: <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>,
        desc: "Take better care of customers with automation" 
      },
    ],
  },
  { label: "Pricing", href: "#" },
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
          <motion.div
            key={index}
            className={`grid gap-12 lg:grid-cols-2 lg:gap-8 items-center mb-24 ${
              index % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Content */}
            <div className={`max-w-xl ${index % 2 === 1 ? "lg:ml-auto" : ""}`}>
              <motion.h2 
                className="text-4xl font-extrabold tracking-tight text-[#25004b] sm:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {feature.title}
              </motion.h2>
              <motion.p 
                className="mt-6 text-xl text-gray-600 leading-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {feature.description}
              </motion.p>
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href="#"
                  className="inline-block rounded-lg bg-[#ff1fbf] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#e61baa] transition-colors duration-200"
                >
                  Learn more
                </a>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              className={`relative mt-12 lg:mt-0 ${
                index % 2 === 1 ? "lg:order-first" : ""
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div 
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for you
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            All plans include core features and controls. Viewers are always free.
          </motion.p>
          
          {/* Billing toggle */}
          <motion.div 
            className="inline-flex items-center bg-white rounded-full p-1 border border-gray-200"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full ${billingCycle === 'annual' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual billing
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Save 17%</span>
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-full ${billingCycle === 'monthly' ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly billing
            </button>
          </motion.div>
        </motion.div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="p-8 pb-6 relative">
              <div className="flex justify-start mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  FREE
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-6xl font-bold text-purple-900">$0</span>
                <span className="text-gray-500 ml-1">/ Month / Editor</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                For personal projects and flexible collaboration
              </p>
              
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Get started
              </button>
            </div>
            
            <div className="px-8 py-6 border-t border-gray-100">
              <p className="uppercase text-xs font-medium text-gray-500 mb-4">FREE INCLUDES:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Unlimited workspace members</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">All Whimsical file types</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">3 team boards</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">100 team tasks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">3 teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">10 guests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">7-day version history</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">100 AI actions / editor / total</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Pro Plan */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="p-8 pb-6 relative">
              <div className="flex justify-start mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  PRO
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-6xl font-bold text-purple-900">$10</span>
                <span className="text-gray-500 ml-1">/ Month / Editor</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                For small-but-mighty teams or individuals
              </p>
              
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                Start free trial
              </button>
            </div>
            
            <div className="px-8 py-6 border-t border-gray-100">
              <p className="uppercase text-xs font-medium text-gray-500 mb-4">EVERYTHING IN FREE, AND:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Unlimited team files and tasks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">100 custom templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Private teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">6 teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">50 guests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">90-day version history</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">500 AI actions / editor / month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Admin roles</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Business Plan */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="p-8 pb-6 relative">
              <div className="flex justify-start mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                  BUSINESS
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-6xl font-bold text-purple-900">$15</span>
                <span className="text-gray-500 ml-1">/ Month / Editor</span>
              </div>
              
              <p className="text-gray-600 mb-8">
                For large teams or entire organizations
              </p>
              
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                Start free trial
              </button>
            </div>
            
            <div className="px-8 py-6 border-t border-gray-100">
              <p className="uppercase text-xs font-medium text-gray-500 mb-4">EVERYTHING IN PRO, AND:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Unlimited teams</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">Unlimited custom templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">100 guests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">1-year version history</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">1000 AI actions / editor / month</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600">SSO / SAML</span>
                </li>
              </ul>
            </div>
          </motion.div>
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
      <div className="max-w-7xl mx-auto px-4 min-h-screen sm:px-6 lg:px-8 py-24 flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl mx-auto text-center lg:text-left">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                Scale AI Agents with Reptix
              </span>
            </motion.div>
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              The most connected AI orchestration platform
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Build and ship AI workflows in minutes—no IT bottlenecks, no
              complexity. Just results.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button className="bg-[#7B68EE] hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
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
            </motion.div>
          </div>

          {/* Right Illustration */}
          <motion.div 
            className="relative mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative">
              <div className="relative z-10 flex items-center justify-center">
                {/* Light Blue Circle with Connection Lines */}
                <div className="relative">
                  <div className="w-64 h-64 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white border-4 border-gray-100 rounded shadow-lg transform translate-x-1/3 translate-y-1/3"></div>
                  {/* Small decorative elements */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-blue-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="fixed top-4 sm:top-7 left-0 right-0 bg-transparent z-50">
      <div className="max-w-[1200px] h-16 mx-auto px-4">
        <div className="flex items-center justify-between bg-white rounded-full border border-gray-200 shadow-sm px-3 py-1.5 sm:py-2">
          {/* Logo - Updated to use Reptix logo */}
          <div className="flex items-center">
            <span className="font-extrabold text-sm sm:text-xl tracking-tight flex items-center gap-1 sm:gap-2">
                <p className="text-blue-400 font-bold text-xl">Reptix.ai</p>
            </span>
          </div>

          {/* Center Menu - Desktop */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center space-x-8 font-medium">
              {menu.map((item) => (
                <li key={item.label} className="relative group">
                  {item.dropdown ? (
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
                      {/* Standard Dropdown for all menu items */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 top-16 bg-white rounded-xl shadow-lg py-6 px-6 min-w-[360px] z-40 transition-all duration-200 border border-gray-100 ${
                          openDropdown === item.label ? "block" : "hidden"
                        }`}
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <p className="uppercase text-xs font-medium text-gray-400 mb-4">
                          {item.label.toUpperCase()}
                        </p>
                        <div className="space-y-4">
                          {item.dropdown.map((drop, _idx) => (
                            <a
                              key={drop.label}
                              href={drop.href}
                              className="flex items-start py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              {drop.icon && <div className="flex-shrink-0 mr-3">{drop.icon}</div>}
                              <div>
                                <div className="font-semibold text-gray-800 mb-1">
                                  {drop.label}
                                </div>
                                {drop.desc && (
                                  <div className="text-sm text-gray-500">
                                    {drop.desc}
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
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

          {/* Hamburger Menu Button - Mobile */}
          <button 
            className="lg:hidden p-1.5 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>

          {/* Actions - Only visible on desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#"
              className="text-gray-700 font-medium text-sm transition-colors hover:text-gray-900"
            >
              Contact sales
            </a>
            <a
              href="#"
              className="text-gray-700 font-medium text-sm bg-gray-50 hover:bg-gray-100 rounded-full px-5 py-2 transition-colors"
            >
              Log in
            </a>
            <a
              onClick={() => navigate(AppRoutes.Register)}
              className="bg-[#2e0052] hover:bg-[#3a0065] text-white font-medium text-sm px-5 py-2 rounded-full transition-colors flex items-center gap-2"
            >
              Sign up
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white rounded-xl border border-gray-200 shadow-lg mt-2 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-6 divide-y divide-gray-100">
            <ul className="mb-6 space-y-6">
              {menu.map((item) => (
                <li key={item.label} className="py-2">
                  {item.dropdown ? (
                    <div>
                      <div className="font-semibold text-gray-800 mb-3">{item.label}</div>
                      <ul className="space-y-4 ml-2">
                        {item.dropdown.map((drop, _idx) => (
                          <li key={_idx}>
                            <a 
                              href={drop.href} 
                              className="flex items-start py-2"
                            >
                              {drop.icon && <div className="flex-shrink-0 mr-3">{drop.icon}</div>}
                              <div>
                                <div className="font-medium text-gray-800 mb-1">{drop.label}</div>
                                {drop.desc && (
                                  <div className="text-sm text-gray-500">{drop.desc}</div>
                                )}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <a href={item.href} className="font-semibold text-gray-800">
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            
            <div className="pt-6 flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact Sales
              </a>
              {/* Login and Sign up buttons moved inside mobile menu */}
              <a
                href="#"
                className="text-gray-700 font-medium text-sm bg-gray-50 hover:bg-gray-100 rounded-full px-5 py-2 transition-colors text-center"
              >
                Log in
              </a>
              <a
                onClick={() => navigate(AppRoutes.Register)}
                className="bg-[#2e0052] hover:bg-[#3a0065] text-white font-medium text-sm px-5 py-2 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Sign up
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
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

// Adding placeholder images for preview component
// Note: Replace these with actual screenshots when available
const previewImages = {
  calendar: image1,
  tasks: image2,
  kanban: image1,
  projects: image2,
  notes: image1
};

const PreviewImages = () => {
  const [activeView, setActiveView] = useState<'calendar' | 'tasks' | 'kanban' | 'projects' | 'notes'>('calendar');

  const views = [
    { id: 'calendar', label: 'Calendar planner', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { id: 'tasks', label: 'Task list', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { id: 'kanban', label: 'Kanban board', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v12a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
      </svg>
    )},
    { id: 'projects', label: 'Projects', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    )},
    { id: 'notes', label: 'Notes', icon: (
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )}
  ];

  return (
    <section className="bg-gray-50 py-24 px-4 overflow-hidden relative">
      {/* Large blue gradient backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-blue-200/40 to-blue-100/10 rounded-full blur-3xl -z-10 transform translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-200/40 to-blue-100/10 rounded-full blur-3xl -z-10 transform -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="text-4xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            One platform for all your work
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Manage tasks, collaborate on docs, track goals, and streamline your workflow—all in one place.
          </motion.p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="flex justify-center mb-10 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-full shadow-md p-1.5 inline-flex">
            {views.map((view, index) => (
              <motion.button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeView === view.id
                    ? 'bg-[#7B68EE] text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {view.icon}
                {view.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Preview Image Area - Updated with simple border instead of device frame */}
        <motion.div 
          className="relative mx-auto max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Remove the old decorative elements since we have the new larger ones */}
          
          {/* App interface with simple border */}
          <motion.div 
            className="relative overflow-hidden bg-white rounded-lg border border-gray-200 shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Browser header with mac-style dots and Chrome-like tabs */}
            <div className="bg-[#f1f3f4] border-b border-gray-200">
              {/* Mac-style window controls */}
              <div className="flex items-center p-2">
                <div className="flex space-x-1.5 mr-4">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  ></motion.div>
                </div>
                
                {/* Chrome-style tabs */}
                <div className="flex">
                  <div className={`relative flex items-center px-4 py-2 bg-white rounded-t-lg border-t border-l border-r border-gray-200 text-sm font-medium text-gray-800 min-w-[180px]`}>
                    <span className="truncate">ClickUp | Dashboard</span>
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-[#dee1e6] rounded-t-lg border-t border-l border-r border-gray-200 text-sm font-medium text-gray-600 ml-1 min-w-[180px] opacity-80">
                    <span className="truncate">ClickUp | Projects</span>
                  </div>
                </div>
                
                {/* Browser controls */}
                <div className="ml-auto flex items-center space-x-3 mr-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v13a2 2 0 01-2 2H6a2 2 0 01-2-2V8m16 0H4" />
                  </svg>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>
              
              {/* URL bar */}
              <div className="flex items-center px-3 py-1.5 bg-white">
                <div className="flex items-center space-x-2 mr-2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="flex-1 bg-[#f1f3f4] rounded-full px-3 py-1 text-sm text-gray-800 flex items-center">
                  <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                  <span>app.clickup.com/{activeView}</span>
                </div>
                <div className="flex items-center space-x-3 ml-2 text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Container */}
            <div className="overflow-hidden bg-white">
              <motion.img 
                src={previewImages[activeView]} 
                alt={`${activeView} view`} 
                className="w-full object-contain max-h-[600px]"
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-sm"
            whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Time Management</h3>
            <p className="text-gray-600">Plan your schedule, set deadlines, and track progress with our intuitive interface.</p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-sm"
            whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Team Collaboration</h3>
            <p className="text-gray-600">Work together seamlessly with shared projects, tasks and real-time updates.</p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-6 shadow-sm"
            whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Monitor project progress with customizable dashboards and detailed analytics.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Create multiple sets of testimonials
  const testimonialSets = [
    // First set
    [
      {
        name: "Mati Greenspan",
        position: "Founder & CEO @ QE.Finance",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "scalerX has revolutionized our Telegram channel. Setting up the agent was easy, and training it with our research articles has been a game-changer. It educates, analyzes..."
      },
      {
        name: "Sunil Pandit",
        position: "MD EMEA @ meshIQ",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        text: "Answers at your finger tips in seconds! I've successfully used the scalerX agent when working alongside pre sales in a demo capacity. The participants enter their..."
      },
      {
        name: "Lev Gelfer",
        position: "CEO @ DeVol Network",
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        text: "I've been using a scalerX specifically tailored for options trading, and I must say it has been an impressive experience. Here's a breakdown of my thoughts 1) Seamless Integration: The..."
      }
    ],
    // Second set
    [
      {
        name: "Sarah Johnson",
        position: "CTO @ TechSolutions",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        text: "scalerX has transformed how we handle customer support. The ability to train it on our product documentation has reduced our response time by 75% and improved customer satisfaction scores..."
      },
      {
        name: "Michael Chen",
        position: "Head of AI @ DataStream",
        image: "https://randomuser.me/api/portraits/men/22.jpg",
        text: "As someone who works with AI systems daily, I'm incredibly impressed with scalerX's capabilities. The contextual understanding and ability to reason through complex problems makes it feel like..."
      },
      {
        name: "Priya Sharma",
        position: "Marketing Director @ GrowthLabs",
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        text: "Our content creation pipeline has been completely revolutionized by scalerX. We're able to produce high-quality, targeted content at 3x our previous pace. The accuracy and relevance..."
      }
    ],
    // Third set
    [
      {
        name: "James Wilson",
        position: "Founder @ CryptoIntel",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        text: "In the fast-moving world of crypto, having scalerX has been a game-changer. It processes market data and provides insights faster than any human analyst. Our community engagement has increased by 40%..."
      },
      {
        name: "Elena Rodriguez",
        position: "Chief Data Officer @ FinanceAI",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        text: "The customization capabilities of scalerX are unmatched. We've trained it on financial regulations and internal policies, and it now serves as our first line of compliance checking. This has reduced..."
      },
      {
        name: "Tom Baker",
        position: "Product Lead @ EdTech Innovations",
        image: "https://randomuser.me/api/portraits/men/39.jpg",
        text: "We integrated scalerX into our education platform to provide personalized learning assistance. Students now receive immediate feedback that's tailored to their learning style and progress. Retention rates..."
      }
    ]
  ];
  
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? testimonialSets.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentPage((prev) => (prev === testimonialSets.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.p 
            className="text-indigo-600 font-semibold mb-3 tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TESTIMONIALS
          </motion.p>
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Users <span className="text-pink-500">❤️</span> Reptix.ai
          </motion.h2>
        </motion.div>

        <div className="relative">
          {/* Testimonial Carousel */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              className="grid md:grid-cols-3 gap-8 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {testimonialSets[currentPage].map((testimonial, _index) => (
                <motion.div 
                  key={`${currentPage}-${_index}`}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-[450px] flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: _index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 flex-1 overflow-hidden">
                    <span className="line-clamp-6">{testimonial.text}</span>
                  </p>
                  <a href="#" className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 mt-auto">
                    Read more 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 transform -translate-x-2 lg:-translate-x-6 z-10"
          >
            <motion.button 
              onClick={handlePrevious}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </motion.button>
          </motion.div>
          
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 transform translate-x-2 lg:translate-x-6 z-10"
          >
            <motion.button 
              onClick={handleNext}
              className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </motion.button>
          </motion.div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonialSets.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentPage === index ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <PreviewImages />
      <IntegrationsSection />
      <FeaturesSection />
      <ReviewsSection />
      <PricingSection />
      <TrialRequestSection />
      <Footer />
    </>
  );
};

export default LandingPage;
