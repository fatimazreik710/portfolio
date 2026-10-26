import React, { useState } from 'react';
import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import Icons from '@/Components/Icons';

export default function Dashboard({ home, counters, about, aboutFeatures, services, categories, projects }) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('home');


    const homeForm = useForm({
        badge_text: home?.badge_text || '',
        main_title: home?.main_title || '',
        subtitle: home?.subtitle || '',
        bg_image: home?.bg_image || '',
    });

    const submitHome = (e) => {
        e.preventDefault();
        homeForm.put(route('admin.home.update'));
    };

    const counterForm = useForm({
        count_value: '',
        label: '',
        display_order: (counters?.length || 0) + 1,
    });

    const submitCounter = (e) => {
        e.preventDefault();
        counterForm.post(route('admin.counters.store'), {
            onSuccess: () => counterForm.reset(),
        });
    };

    const deleteCounter = (id) => {
        if (confirm('Are you sure you want to delete this counter?')) {
            router.delete(route('admin.counters.delete', id));
        }
    };

    const aboutForm = useForm({
        badge_text: about?.badge_text || '',
        title: about?.title || '',
        description: about?.description || '',
        main_image: about?.main_image || '',
        secondary_image: about?.secondary_image || '',
        experience_years: about?.experience_years || '',
        experience_label: about?.experience_label || '',
    });

    const submitAbout = (e) => {
        e.preventDefault();
        aboutForm.put(route('admin.about.update'));
    };

    const serviceForm = useForm({
        title: '',
        description: '',
        icon: '🏠',
    });

    const submitService = (e) => {
        e.preventDefault();
        serviceForm.post(route('admin.services.store'), {
            onSuccess: () => serviceForm.reset(),
        });
    };

    const deleteService = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            router.delete(route('admin.services.delete', id));
        }
    };

    const projectForm = useForm({
        project_category_id: categories?.[0]?.id || '',
        title: '',
        description: '',
        image: '',
    });

    const submitProject = (e) => {
        e.preventDefault();
        projectForm.post(route('admin.projects.store'), {
            onSuccess: () => projectForm.reset(),
        });
    };

    const deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('admin.projects.delete', id));
        }
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Constructify Admin Dashboard" />

            <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800 flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-72 bg-slate-950 text-white flex flex-col p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <Icons.Logo />
                        <div>
                            <span className="text-xl font-black text-white">Constructify</span>
                            <span className="block text-[11px] font-bold text-orange-400 uppercase">Admin Console</span>
                        </div>
                    </div>

                    <div className="space-y-2 flex-1">
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${activeTab === 'home' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:bg-slate-900'}`}
                        >
                            Home& Counters
                        </button>
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${activeTab === 'about' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:bg-slate-900'}`}
                        >
                            About Us
                        </button>
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${activeTab === 'services' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:bg-slate-900'}`}
                        >
                            Services ({services?.length || 0})
                        </button>
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm ${activeTab === 'projects' ? 'bg-[#ea580c] text-white' : 'text-slate-400 hover:bg-slate-900'}`}
                        >
                            Projects ({projects?.length || 0})
                        </button>
                    </div>

                    <div className="pt-6 border-t border-slate-900 flex justify-between items-center">
                        <span className="text-xs text-slate-400">{auth?.user?.name || 'Admin'}</span>
                        <button onClick={handleLogout} className="text-xs text-red-400">Logout</button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 max-w-5xl">

                    {/* HERO TAB */}
                    {activeTab === 'home' && (
                        <div className="space-y-8">
                            <form onSubmit={submitHome} className="bg-white p-6 rounded-2xl border space-y-4">
                                <h2 className="text-lg font-bold">Manage Hero Section</h2>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Badge Text</label>
                                    <input type="text" value={homeForm.data.badge_text} onChange={e => homeForm.setData('badge_text', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Main Title</label>
                                    <input type="text" value={homeForm.data.main_title} onChange={e => homeForm.setData('main_title', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Subtitle</label>
                                    <textarea value={homeForm.data.subtitle} onChange={e => homeForm.setData('subtitle', e.target.value)} className="w-full border p-2 rounded-lg text-sm" rows="3" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Background Image URL</label>
                                    <input type="text" value={homeForm.data.bg_image} onChange={e => homeForm.setData('bg_image', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                                </div>
                                <button type="submit" className="bg-[#ea580c] text-white px-6 py-2 rounded-lg text-sm font-bold">Save Hero</button>
                            </form>

                            {/* Counter Add */}
                            <div className="bg-white p-6 rounded-2xl border space-y-4">
                                <h2 className="text-lg font-bold">Manage Counters</h2>
                                <form onSubmit={submitCounter} className="flex gap-2">
                                    <input type="text" placeholder="Value (e.g. 25+)" value={counterForm.data.count_value} onChange={e => counterForm.setData('count_value', e.target.value)} className="border p-2 rounded-lg text-sm w-1/3" required />
                                    <input type="text" placeholder="Label (e.g. Years)" value={counterForm.data.label} onChange={e => counterForm.setData('label', e.target.value)} className="border p-2 rounded-lg text-sm w-1/2" required />
                                    <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold">Add</button>
                                </form>
                                <div className="space-y-2">
                                    {counters?.map(c => (
                                        <div key={c.id} className="flex justify-between items-center border p-3 rounded-lg">
                                            <div>
                                                <span className="font-bold text-[#ea580c] mr-2">{c.count_value}</span>
                                                <span className="text-xs">{c.label}</span>
                                            </div>
                                            <button onClick={() => deleteCounter(c.id)} className="text-xs text-red-500">Delete</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ABOUT TAB */}
                    {activeTab === 'about' && (
                        <form onSubmit={submitAbout} className="bg-white p-6 rounded-2xl border space-y-4">
                            <h2 className="text-lg font-bold">Manage About Section</h2>
                            <div>
                                <label className="block text-xs font-bold mb-1">Badge Text</label>
                                <input type="text" value={aboutForm.data.badge_text} onChange={e => aboutForm.setData('badge_text', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Title</label>
                                <input type="text" value={aboutForm.data.title} onChange={e => aboutForm.setData('title', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold mb-1">Description</label>
                                <textarea value={aboutForm.data.description} onChange={e => aboutForm.setData('description', e.target.value)} className="w-full border p-2 rounded-lg text-sm" rows="3" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold mb-1">Main Image URL</label>
                                    <input type="text" value={aboutForm.data.main_image} onChange={e => aboutForm.setData('main_image', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Secondary Image URL</label>
                                    <input type="text" value={aboutForm.data.secondary_image} onChange={e => aboutForm.setData('secondary_image', e.target.value)} className="w-full border p-2 rounded-lg text-sm" />
                                </div>
                            </div>
                            <button type="submit" className="bg-[#ea580c] text-white px-6 py-2 rounded-lg text-sm font-bold">Save About</button>
                        </form>
                    )}

                    {/* SERVICES TAB */}
                    {activeTab === 'services' && (
                        <div className="space-y-8">
                            <form onSubmit={submitService} className="bg-white p-6 rounded-2xl border space-y-4">
                                <h2 className="text-lg font-bold">Add New Service</h2>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Title</label>
                                    <input type="text" value={serviceForm.data.title} onChange={e => serviceForm.setData('title', e.target.value)} className="w-full border p-2 rounded-lg text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Description</label>
                                    <textarea value={serviceForm.data.description} onChange={e => serviceForm.setData('description', e.target.value)} className="w-full border p-2 rounded-lg text-sm" rows="2" required />
                                </div>
                                <button type="submit" className="bg-[#ea580c] text-white px-6 py-2 rounded-lg text-sm font-bold">Add Service</button>
                            </form>

                            <div className="bg-white p-6 rounded-2xl border space-y-3">
                                <h2 className="text-lg font-bold">Existing Services</h2>
                                {services?.map(s => (
                                    <div key={s.id} className="flex justify-between items-center border p-3 rounded-lg">
                                        <div>
                                            <div className="font-bold text-sm">{s.title}</div>
                                            <div className="text-xs text-gray-500">{s.description}</div>
                                        </div>
                                        <button onClick={() => deleteService(s.id)} className="text-xs text-red-500">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROJECTS TAB */}
                    {activeTab === 'projects' && (
                        <div className="space-y-8">
                            <form onSubmit={submitProject} className="bg-white p-6 rounded-2xl border space-y-4">
                                <h2 className="text-lg font-bold">Add New Project</h2>
                                <div>
                                    <label className="block text-xs font-bold mb-1"> Project Title</label>
                                    <input type="text" value={projectForm.data.title} onChange={e => projectForm.setData('title', e.target.value)} className="w-full border p-2 rounded-lg text-sm" required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Category</label>
                                    <select value={projectForm.data.project_category_id} onChange={e => projectForm.setData('project_category_id', e.target.value)} className="w-full border p-2 rounded-lg text-sm">
                                        {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold mb-1">Image URL</label>
                                    <input type="text" value={projectForm.data.image} onChange={e => projectForm.setData('image', e.target.value)} className="w-full border p-2 rounded-lg text-sm" required />
                                </div>
                                <button type="submit" className="bg-[#ea580c] text-white px-6 py-2 rounded-lg text-sm font-bold">Add Project</button>
                            </form>

                            <div className="bg-white p-6 rounded-2xl border space-y-3">
                                <h2 className="text-lg font-bold">current Projects</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {projects?.map(p => (
                                        <div key={p.id} className="border p-3 rounded-lg">
                                            <img src={p.image} className="h-28 w-full object-cover rounded mb-2" />
                                            <div className="font-bold text-sm">{p.title}</div>
                                            <button onClick={() => deleteProject(p.id)} className="text-xs text-red-500 mt-2 block">Delete</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </>
    );
}