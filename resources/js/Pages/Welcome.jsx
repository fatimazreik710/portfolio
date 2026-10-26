import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Icons from '@/Components/Icons';

export default function Welcome({ home, counters, about, aboutFeatures, services, categories, projects }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeModalImage, setActiveModalImage] = useState(null);
    const [activeSection, setActiveSection] = useState('home');
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            const sections = ['projects', 'services', 'about', 'home'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const el = document.getElementById(sectionId);
                if (el && el.offsetTop <= scrollPosition) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigateToSection = (e, sectionId) => {
        e.preventDefault();
        setActiveSection(sectionId);
        setMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleVisualOnlyClick = (e) => {
        e.preventDefault();
        setMobileMenuOpen(false);
    };


    const filteredProjects = selectedCategory === 'all'
        ? projects
        : projects?.filter(p => p.category?.abbreviation?.toLowerCase() === selectedCategory.toLowerCase());

    return (
        <>
            <Head title="Constructify - Building Tomorrow's Infrastructure Today" />

            <div className="font-sans text-slate-800 bg-white antialiased selection:bg-orange-500 selection:text-white">

                { }
                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
                        <a href="#home" onClick={(e) => navigateToSection(e, 'home')} className="flex items-center gap-2.5 group">
                            <Icons.Logo />
                            <span className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-orange-600 transition">
                                Constructify
                            </span>
                        </a>

                        <nav className="hidden lg:flex items-center gap-8 font-medium text-sm">
                            <a href="#home" onClick={(e) => navigateToSection(e, 'home')} className={`transition pb-1 ${activeSection === 'home' ? 'text-orange-600 border-b-2 border-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}>Home</a>
                            <a href="#about" onClick={(e) => navigateToSection(e, 'about')} className={`transition pb-1 ${activeSection === 'about' ? 'text-orange-600 border-b-2 border-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}>About</a>
                            <a href="#services" onClick={(e) => navigateToSection(e, 'services')} className={`transition pb-1 ${activeSection === 'services' ? 'text-orange-600 border-b-2 border-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}>Services</a>
                            <a href="#projects" onClick={(e) => navigateToSection(e, 'projects')} className={`transition pb-1 ${activeSection === 'projects' ? 'text-orange-600 border-b-2 border-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'}`}>Projects</a>
                            <span onClick={handleVisualOnlyClick} className="text-slate-600 hover:text-orange-600 transition pb-1 cursor-pointer select-none">Team</span>
                            <span onClick={handleVisualOnlyClick} className="text-slate-600 hover:text-orange-600 transition pb-1 cursor-pointer select-none">Pages</span>
                            <span onClick={handleVisualOnlyClick} className="text-slate-600 hover:text-orange-600 transition pb-1 cursor-pointer select-none">Contact</span>
                        </nav>

                        <div className="flex items-center gap-6">
                            <a href="tel:+15552346789" className="hidden sm:flex items-center text-sm font-bold text-slate-800 hover:text-orange-600 transition">
                                <Icons.Phone />
                                +1 (555) 234-6789
                            </a>
                            <button
                                type="button"
                                onClick={handleVisualOnlyClick}
                                className="hidden sm:inline-block bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-sm transition active:scale-95 cursor-pointer"
                            >
                                Get Estimate
                            </button>


                        </div>
                    </div>


                </header>

                <section
                    id="home"
                    className="relative text-white pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-8 text-center bg-cover bg-center transition-all"
                    style={{
                        backgroundImage: `linear-gradient(rgba(15,23,42,0.72), rgba(15,23,42,0.78)), url('${home?.bg_image || ''}')`
                    }}
                >
                    <div className="max-w-4xl mx-auto">
                        {home?.badge_text && (
                            <span className="inline-flex items-center bg-slate-800/80 backdrop-blur-sm text-orange-400 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-slate-700 shadow-sm">
                                🛡️ {home.badge_text}
                            </span>
                        )}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
                            {home?.main_title}
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                            {home?.subtitle}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="#projects" className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-3.5 rounded-lg font-bold shadow-lg transition">
                                Explore Our Projects
                            </a>
                        </div>
                    </div>

                    { }
                    <div className="max-w-6xl mx-auto mt-20 relative z-20 -mb-20 md:-mb-24 px-4">
                        <div className="bg-[#ea580c] py-8 px-6 md:px-12 rounded-2xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
                            {counters && counters.length > 0 ? (
                                counters.map(counter => (
                                    <div key={counter.id} className="py-2">
                                        <div className="text-3xl md:text-5xl font-black tracking-tight">{counter.count_value}</div>
                                        <div className="text-xs md:text-sm font-medium opacity-90 mt-1">{counter.label}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="col-span-4 text-white/80 italic text-sm py-2">No counters added yet.</p>
                            )}
                        </div>
                    </div>
                </section>

                { }
                <section id="about" className="pt-32 md:pt-40 pb-24 px-6 md:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-6 relative pr-6 pb-10">
                            <div className="w-[88%] h-[420px] md:h-[480px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                <img src={about?.main_image || ''} alt="About Main" className="w-full h-full object-cover" />
                            </div>
                            {about?.experience_years && (
                                <div className="absolute -top-5 right-2 md:right-8 z-20 w-24 h-24 rounded-full bg-[#ea580c] text-white flex flex-col items-center justify-center text-center shadow-xl border-4 border-white">
                                    <span className="text-2xl font-black leading-none">{about.experience_years}</span>
                                    <span className="text-[10px] font-bold leading-tight mt-1 max-w-[65px]">{about?.experience_label}</span>
                                </div>
                            )}
                            <div className="absolute -bottom-6 right-0 z-30 w-[60%] h-[220px] md:h-[260px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                                <img src={about?.secondary_image || ''} alt="About Secondary" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div className="lg:col-span-6">
                            <div className="flex items-center text-[#ea580c] font-bold text-xs tracking-widest uppercase mb-3">
                                <Icons.BadgeBuilding />
                                {about?.badge_text}
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-5 tracking-tight">
                                {about?.title}
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                                {about?.description}
                            </p>

                            { }
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                {aboutFeatures && aboutFeatures.map((feature) => (
                                    <div key={feature.id} className="flex flex-col">
                                        <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-3">
                                            <Icons.Shield />
                                        </div>
                                        <h3 className="text-base font-bold text-slate-900 mb-1">{feature.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                { }
                <section id="services" className="py-24 px-6 md:px-8 bg-[#fbfbf9] border-y border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Our Services</h2>
                            <div className="w-12 h-1 bg-[#ea580c] rounded mx-auto mt-3 mb-4"></div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 h-[420px] lg:h-full min-h-[460px] rounded-2xl overflow-hidden relative shadow-lg group">
                                <img src="https://images.unsplash.com/photo-1582490772231-20eb7d216852?auto=format&fit=crop&w=900&q=80" alt="Excavator" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl lg:text-3xl font-black text-white leading-snug">We Deliver Excellence</h3>
                                </div>
                            </div>

                            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {services && services.length > 0 ? (
                                    services.map((service) => (
                                        <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-start gap-4">
                                            <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 text-xl">
                                                {service.icon || '🏗️'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-base mb-1.5">{service.title}</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-2 text-center text-gray-400 italic py-6">No services available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                { }
                <section id="projects" className="py-24 px-6 md:px-8 bg-[#fbfbf9] border-t border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Our Projects</h2>
                            <div className="w-12 h-1 bg-[#ea580c] rounded mx-auto mt-3 mb-6"></div>

                            <div className="flex justify-center gap-2.5 mt-6 flex-wrap">
                                <button
                                    onClick={() => setSelectedCategory('all')}
                                    className={`px-5 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === 'all' ? 'bg-[#ea580c] text-white' : 'bg-white border text-gray-600'}`}
                                >
                                    All Projects
                                </button>
                                {categories && categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.abbreviation)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition ${selectedCategory === cat.abbreviation ? 'bg-[#ea580c] text-white' : 'bg-white border text-gray-600'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects && filteredProjects.map(project => (
                                <div
                                    key={project.id}
                                    onClick={() => setActiveModalImage(project.image)}
                                    className="group relative rounded-2xl overflow-hidden shadow-sm cursor-pointer bg-slate-900 h-80"
                                >
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{project.category?.name}</span>
                                        <h3 className="text-xl font-bold text-white mt-1">{project.title}</h3>
                                        <p className="text-gray-300 text-xs line-clamp-2 mt-1">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                { }
                {showBackToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shadow-xl"
                    >
                        <Icons.ArrowUp />
                    </button>
                )}



            </div>
        </>
    );
}