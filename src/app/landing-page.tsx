

"use client";

import { useState, useEffect, FC, ReactNode, Dispatch, SetStateAction, MouseEvent, FormEvent, ElementType } from 'react';
import { Menu, X, MapPin, Phone, Mail, CalendarCheck, Info, Stethoscope, Users, Home } from 'lucide-react';
import { Login } from './auth/login';
import { SwitchDemo } from './dashboard/switch';
import { SheetDemo } from './sheet';
import AppointmentForm from './client-booking-appointment';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SymptomCheckerDialog } from './landing-page/symptom-checker';
import Image from 'next/image';

// Mock for cn utility, typed for TypeScript
const cn = (...inputs: (string | undefined | null | boolean)[]): string => {
  return inputs.flat().filter(Boolean).join(' ');
}

// --- Prop Interfaces for Components ---

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  text: string;
}

interface TeamMemberProps {
  imgSrc: string;
  name: string;
  role: string;
  description: string;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  avatarSrc: string;
}

interface WhyChooseUsCardProps {
  icon: string;
  title: string;
  text: string;
}

function useIntersectionObserver(): [Dispatch<SetStateAction<HTMLElement | null>>] {
  const [node, setNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [setNode];
}

const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className = '' }) => {
  const [ref] = useIntersectionObserver();
  return <div ref={ref} className={cn("fade-in-up", className)}>{children}</div>;
}


const ServiceCard: FC<ServiceCardProps> = ({ icon, title, text }) => {
  return (
    <AnimatedSection>
      <Card className="text-center group hover:shadow-sm hover:-translate-y-2 transition-all duration-300 h-full bg-card/60 backdrop-blur-lg  border  ">
        <CardHeader>
          <div className="mx-auto bg-gradient-to-br from-green-100 to-emerald-200 rounded-full p-4 mb-4 w-max transition-all duration-300 group-hover:scale-110">
            <Image src={icon} alt={`${title} icon`} width={64} height={64} className="w-16 h-16" />
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{text}</p>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

const TeamMember: FC<TeamMemberProps> = ({ imgSrc, name, role, description }) => {
  return (
    <AnimatedSection>
      <Card className=" text-center group md:hover:shadow-2xl md:hover:-translate-y-2 transition-all duration-300 h-full bg-secondary overflow-hidden">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 h-24 dark:from-green-900/50 dark:to-emerald-800/50"></div>
        <CardContent className="pt-6 relative -mt-16">
          <Image src={imgSrc} alt={name} width={128} height={128} className="w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto mb-4 border-4 border-background object-cover shadow-lg transition-transform duration-300 group-hover:scale-110" />
          <h3 className="text-xl font-bold text-foreground">{name}</h3>
          <p className="text-primary font-semibold mb-2">{role}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

const TestimonialCard: FC<TestimonialCardProps> = ({ quote, name, location, avatarSrc }) => {
  return (
    <AnimatedSection>
      <Card className="h-full flex flex-col justify-between bg-card/60 backdrop-blur-lg shadow-sm border-primary/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 -mt-4 -ml-4 text-primary/10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 2.908-2.355 5.263-5.263 5.263s-5.263-2.355-5.263-5.263c0-2.908 2.355-5.263 5.263-5.263h3.333v-7.391h3.333zm14.017 0v7.391c0 2.908-2.355 5.263-5.263 5.263s-5.263-2.355-5.263-5.263c0-2.908 2.355-5.263 5.263-5.263h3.333v-7.391h3.333z" /></svg>
        </div>
        <CardContent className="pt-10 z-10">
<p className="text-muted-foreground mb-6 italic">&quot;{quote}&quot;</p>
        </CardContent>
        <CardHeader className="flex-row items-center gap-4 pt-0 z-10 bg-secondary/30 mt-auto p-4">
          <Image src={avatarSrc} alt="Patient avatar" width={48} height={48} className="w-12 h-12 rounded-full" />
          <div>
            <h4 className="font-bold text-foreground">{name}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </CardHeader>
      </Card>
    </AnimatedSection>
  );
}

const WhyChooseUsCard: FC<WhyChooseUsCardProps> = ({ icon, title, text }) => {
  return (
    <AnimatedSection>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 bg-gradient-to-br from-green-100 to-emerald-200 rounded-lg p-3">
          <Image src={icon} alt={`${title} icon`} width={40} height={40} className="w-10 h-10" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <p className="mt-1 text-muted-foreground">{text}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}



// --- Main Page Component ---
export default function LandingPage({ doctor }: { doctor: any }) {
const [active, setActive] = useState<string | null>("#home");
  const handleSmoothScroll = (
    e: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement | HTMLButtonElement;
    const href = (target as HTMLAnchorElement).getAttribute?.('href');
    const targetId = href?.substring(1);
    if (!targetId) return;
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
      setActive(href); // ✅ update active link

    }
  };


  return (
    <>

      <div className="bg-background">
        {/* Header */}
        <header className="bg-card/80   backdrop-blur-lg shadow-sm sticky top-0 z-30">
          <div className="container mx-auto px-2 py-4 flex justify-between items-center">
            <Link href="#home" onClick={handleSmoothScroll} className="text-2xl font-bold text-primary">
              <div>
                <span>
                  <Image src="/logo.png" alt="Uday Clinic Logo" width={40} height={40} className="inline-block mr-2 -mt-1" />
                </span>
                <span>
                  Uday Clinic
                </span>
              </div>
            </Link>
           {/* ✅ active now works here */}
        <nav className="hidden md:flex items-center space-x-0">
          <Link
            href="#home"
            onClick={handleSmoothScroll}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-colors ${
              active === "#home"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" /> Home
          </Link>

          <Link
            href="#about"
            onClick={handleSmoothScroll}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-colors ${
              active === "#about"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Info className="h-4 w-4" /> About
          </Link>

          <Link
            href="#services"
            onClick={handleSmoothScroll}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-colors ${
              active === "#services"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Stethoscope className="h-4 w-4" /> Services
          </Link>

          <Link
            href="#contact"
            onClick={handleSmoothScroll}
            className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-colors ${
              active === "#contact"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="h-4 w-4" /> Contact
          </Link>
        </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Login />
              <SwitchDemo />

              {/* <Link href="#appointment" onClick={handleSmoothScroll}>Book Appointment</Link> */}
            </div>
            <div className='md:hidden flex items-center'>
              <Login /> 
              <SwitchDemo />

              {/* <SheetDemo /> */}
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section id="home" className="relative overflow-hidden hero-gradient-bg">
            <div className="container mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-28">
              <div className="grid md:grid-cols-2 items-center gap-12">
                <AnimatedSection className="text-center md:text-left z-10">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight tracking-tighter">
                    Expert Care, <span className="hero-gradient-text">Compassionate</span> Healing.
                  </h1>
                  <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                    Your wellness is our priority. Experience state-of-the-art medical services with a personal touch.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
                      <Link href="#appointment" onClick={handleSmoothScroll}>Book Appointment</Link>

                    </Button>
                    <SymptomCheckerDialog />
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <div className="relative mt-8 md:mt-0 aspect-square md:aspect-[4/5] max-h-[550px] rounded-2xl shadow-sm overflow-hidden md:-rotate-2 md:hover:rotate-0 transition-transform duration-300">
                    {/* Light mode image */}
                    <Image
                      src="/doctor-img-light.png"
                      alt="Dr. Uday at Uday Clinic"
                      width={600}
                      height={500}
                      className="block dark:hidden w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/600x500/E6FFFA/10B981?text=Uday+Clinic";
                      }}
                    />
                    {/* Dark mode image */}
                    <Image
                      src="/doctor-img.png"
                      alt="Dr. Uday at Uday Clinic"
                      width={600}
                      height={500}
                      className="hidden dark:block w-full h-full object-cover object-top"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/600x500/E6FFFA/10B981?text=Uday+Clinic";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section id="about" className="py-16 sm:py-20 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Why Choose Uday Clinic?</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  We combine modern technology with a commitment to personalized patient care.
                </p>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/trophy.png" title="Experienced Specialists" text="Our team consists of highly skilled and experienced medical professionals." />
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/security-checked.png" title="Advanced Technology" text="We utilize the latest medical equipment for accurate diagnosis and treatment." />
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/conference-call.png" title="Patient-Centric Care" text="Your comfort and well-being are at the heart of everything we do." />
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/like.png" title="Comprehensive Services" text="From check-ups to surgery, we offer a wide range of medical services." />
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/microscope.png" title="Accurate Diagnostics" text="Leveraging top-tier labs for precise and timely diagnostic results." />
                <WhyChooseUsCard icon="https://img.icons8.com/fluency/96/stethoscope.png" title="Personalized Treatment" text="We create tailored treatment plans to meet your individual health needs." />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-16 sm:py-20 md:py-24 gradient-bg">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Comprehensive Medical Services</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  From routine check-ups to specialized treatments, we offer a wide range of services to meet your health needs.
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <ServiceCard icon="https://img.icons8.com/fluency/96/stethoscope.png" title="General Checkup" text="Routine health examinations and preventative care." />
                <ServiceCard icon="https://img.icons8.com/fluency/96/like.png" title="Emergency Care" text="Immediate medical attention for urgent conditions." />
                <ServiceCard icon="https://img.icons8.com/fluency/96/syringe.png" title="Surgical Procedures" text="Advanced and minimally invasive surgical solutions." />
                <ServiceCard icon="https://img.icons8.com/fluency/96/microscope.png" title="Diagnostics" text="Accurate testing to identify and treat health issues." />
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section id="team" className=" flex items-center justify-center w-full py-16 sm:py-20 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Meet Our Experienced Team</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our dedicated professionals are here to provide you with the best medical care.
                </p>
              </AnimatedSection>
              <div className="flex justify-center items-center w-full">
                <div className="md:w-6/12 space-y-4 md:space-y-0 md:flex justify-center items-center gap-10 place-items-center">
                  <TeamMember
                    imgSrc="https://placehold.co/600x500/E6FFFA/10B981?text=Dr.+U"
                    name="Dr. Uday Singh Rajpoot"
                    role="Physician"
                    description="Dr. Uday brings over 35+ years of experience in internal medicine, offering compassionate care and accurate diagnostics for patients."
                  />
                  <TeamMember
                    imgSrc="https://placehold.co/600x500/E6FFFA/10B981?text=Dr.+N"
                    name="Dr. Neeraj  Rajpoot"
                    role="Surgeon, MD"
                    description="With 10+ years of experience, Dr. Neeraj specializes in advanced surgical procedures and delivers patient-centered treatment."
                  />
                </div>
              </div>


            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 sm:py-20 md:py-24 testimonials-bg">
            <div className="container mx-auto px-6">
              <AnimatedSection className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">What Our Patients Say</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                  We are proud of the positive feedback from our community.
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard quote="The care I received at Uday Clinic was exceptional. The doctors were knowledgeable and the staff was incredibly supportive." name="Nikhil Rajpoot" location="Harpalpur, MP" avatarSrc="https://placehold.co/48x48/e2f5ea/16a34a?text=A" />
                <TestimonialCard quote="A very clean and modern facility. I felt comfortable and well-cared for from the moment I walked in. Highly recommended." name="Neeraj Singh" location="Kharatha, MP" avatarSrc="https://placehold.co/48x48/e2f5ea/16a34a?text=S" />
                <TestimonialCard quote="The laparoscopic surgery was a success with minimal recovery time. Thank you to the entire team at Uday Clinic!" name="Kuldeep Singh" location="Vijaypur, UP" avatarSrc="https://placehold.co/48x48/e2f5ea/16a34a?text=R" />
              </div>
            </div>
          </section>

          {/* Appointment Form Section */}
          <section id="appointment" className="py-16 sm:py-20 md:py-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedSection className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Book an Appointment</h2>
                  <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                    Your health is just a click away. Fill out the form, and our team will contact you to confirm your visit. We look forward to seeing you.
                  </p>
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-center lg:justify-start text-muted-foreground">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <span>Emergency Call: +91 7398391052</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start text-muted-foreground">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <span>Email: udayclivysclinic@gmail.com</span>
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection>
                  <AppointmentForm doctor={doctor} />
                </AnimatedSection>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}

        <footer
          id="contact"
          className="bg-gray-800 border-gray-500 text-gray-200 py-2"
        >
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* About */}
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4">Uday Clinic</h3>
                <p className="text-muted-foreground">
                  Your trusted partner in health and wellness. We are committed to
                  providing compassionate and comprehensive medical care.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4">Contact</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-primary" />
                    <span>
                      एफ-9, 10, फर्स्ट फ्लोर, वीरांगना जे.डी.ए. कॉम्पलैक्स, मेडिकल कॉलेज
                      के पास, झॉसी झॉसी, उत्तर प्रदेश, भारत
                    </span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                    <a href="tel:+917398391052">Tel. +(91) 7398391052</a>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-primary" />
                    <a href="mailto:udayclivysclinic@gmail.com">udaydivyaclinic@gmail.com</a>
                  </li>
                </ul>
              </div>

              {/* Opening Hours */}
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4">Opening Hours</h3>
                <table className="w-full text-left text-muted-foreground">
                  <tbody>
                    <tr>
                      <td className="py-4 pr-4">Mon - Sun</td>
                      <td>09:30 AM - 07:30 PM</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Quick Links with Lucide icons */}
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#about" onClick={handleSmoothScroll} className="flex items-center gap-2 text-muted-foreground">
                      <Info className="h-4 w-4 text-primary" /> About Us
                    </a>
                  </li>
                  <li>
                    <a href="#services" onClick={handleSmoothScroll} className="flex items-center gap-2 text-muted-foreground">
                      <Stethoscope className="h-4 w-4 text-primary" /> Services
                    </a>
                  </li>
                  <li>
                    <a href="#team" onClick={handleSmoothScroll} className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4 text-primary" /> Our Team
                    </a>
                  </li>
                  <li>
                    <a href="#appointment" onClick={handleSmoothScroll} className="flex items-center gap-2 text-muted-foreground">
                      <CalendarCheck className="h-4 w-4 text-primary" /> Appointment
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-16 pt-8 border-t  border-gray-700 text-center text-muted-foreground">
              <p>&copy;2024- {new Date().getFullYear()} Student Power Club.</p>
              <p>Tel. +(91) 9144462693</p>
            </div>
          </div>
        </footer>


      </div>
    </>
  );
}


