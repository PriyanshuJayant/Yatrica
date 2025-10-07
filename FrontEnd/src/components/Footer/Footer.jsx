import React from "react";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const data = {
  facebookLink: "https://facebook.com/mvpblocks",
  instaLink: "https://instagram.com/mvpblocks",
  twitterLink: "https://twitter.com/mvpblocks",
  githubLink: "https://github.com/mvpblocks",
  dribbbleLink: "https://dribbble.com/mvpblocks",
  services: {
    webdev: "/web-development",
    webdesign: "/web-design",
    marketing: "/marketing",
    googleads: "/google-ads",
  },
  about: {
    history: "/company-history",
    team: "/meet-the-team",
    handbook: "/employee-handbook",
    careers: "/careers",
  },
  help: {
    faqs: "/faqs",
    support: "/support",
    livechat: "/live-chat",
  },
  contact: {
    email: "hello@mvpblocks.com",
    phone: "+91 8637373116",
    address: "Kolkata, West Bengal, India",
  },
  company: {
    name: "Mvpblocks",
    description:
      "Building beautiful and functional web experiences with modern technologies. We help startups and businesses create their digital presence.",
    logo: "https://i.postimg.cc/2SRcktkT/Mvpblocks.webp",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
  { icon: Twitter, label: "Twitter", href: data.twitterLink },
  { icon: Github, label: "GitHub", href: data.githubLink },
  { icon: Dribbble, label: "Dribbble", href: data.dribbbleLink },
];

const aboutLinks = [
  { text: "Company History", href: data.about.history },
  { text: "Meet the Team", href: data.about.team },
  { text: "Employee Handbook", href: data.about.handbook },
  { text: "Careers", href: data.about.careers },
];

const serviceLinks = [
  { text: "Web Development", href: data.services.webdev },
  { text: "Web Design", href: data.services.webdesign },
  { text: "Marketing", href: data.services.marketing },
  { text: "Google Ads", href: data.services.googleads },
];

const helpfulLinks = [
  { text: "FAQs", href: data.help.faqs },
  { text: "Support", href: data.help.support },
  { text: "Live Chat", href: data.help.livechat, hasIndicator: true },
];

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#F5F5F5",
        marginTop: "4rem",
        width: "100%",
        borderTopLeftRadius: "1rem",
        borderTopRightRadius: "1rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 1.5rem 1.5rem",
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
        >
          {/* Left Column */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={data.company.logo}
                alt="logo"
                style={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "50%",
                }}
              />
              <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                {data.company.name}
              </span>
            </div>

            <p
              style={{
                color: "rgba(0,0,0,0.6)",
                marginTop: "1.5rem",
                maxWidth: "300px",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: "1.6",
              }}
            >
              {data.company.description}
            </p>

            <ul
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                gap: "1.5rem",
                listStyle:"none"
              }}
            >
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    style={{
                      color: "#0077B6",
                      transition: "0.3s",
                    }}
                  >
                    <Icon size={22} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "2rem",
              marginTop: "2rem",
            }}
          >
            {/* About */}
            <div>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>About Us</p>
              <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                {aboutLinks.map(({ text, href }) => (
                  <li key={text} style={{ marginBottom: "0.75rem" }}>
                    <a
                      href={href}
                      style={{
                        color: "rgba(0,0,0,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                Our Services
              </p>
              <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                {serviceLinks.map(({ text, href }) => (
                  <li key={text} style={{ marginBottom: "0.75rem" }}>
                    <a
                      href={href}
                      style={{
                        color: "rgba(0,0,0,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpful */}
            <div>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                Helpful Links
              </p>
              <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                {helpfulLinks.map(({ text, href }) => (
                  <li key={text} style={{ marginBottom: "0.75rem" }}>
                    <a
                      href={href}
                      style={{
                        color: "rgba(0,0,0,0.6)",
                        textDecoration: "none",
                      }}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>Contact Us</p>
              <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                {contactInfo.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <Icon size={18} color="#0077B6" />
                    <span style={{ color: "rgba(0,0,0,0.6)" }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            marginTop: "3rem",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            paddingTop: "1rem",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.6)" }}>
            © 2025 {data.company.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
