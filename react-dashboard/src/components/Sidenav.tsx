import { useUI } from '@/context/UIContext';
import { menuItems } from '@/utils/utils';
import Modal from './Modal';
import About from './About';

export default function Sidenav() {
    const icons = { Home: menuItems.home, Geo: menuItems.geoSearch, Pipeline: menuItems.pipeline, LinkedIn: menuItems.linkedIn, Git: menuItems.git, Architecure: menuItems.architecture };
    const { openModal } = useUI();

    return (
        <>
            <aside className="hidden max-h-[800px] mt-1 bg-gradient-to-b from-indigo-700 to-cyan-600 text-white flex flex-col justify-between shadow-xl md:block lg:w-64">
                <div className="p-6 space-y-6">
                    <div className="md:hidden lg:block">
                        <h1 className="text-2xl font-bold">Real Time Data Dashboard</h1>
                        <p className="text-sm opacity-80 mt-1">Built with React - Node </p>
                    </div>

                    <nav className="flex flex-col space-y-3 mt-8">
                        <a href="#" className="glass text-[18px] md:w-[50px] lg:w-full md:justify-items-end px-3 py-2 rounded-md hover:bg-white/20 transition"><icons.Home className="inline mb-1" size={24} /> <span className="md:hidden lg:inline">Home </span></a>
                        <a href="#" className="glass text-[18px] md:w-[50px] lg:w-full px-3 py-2 rounded-md hover:bg-white/20 transition"><icons.Geo className="inline mb-1" size={24} /> <span className="md:hidden lg:inline">Geo Search </span></a>
                        <a href="#" className="glass text-[18px] md:w-[50px] lg:w-full px-3 py-2 rounded-md hover:bg-white/20 transition"><icons.Pipeline className="inline mb-1" size={24} /> <span className="md:hidden lg:inline">Data Pipeline </span></a>
                        <a href="https://www.linkedin.com/in/smvijay" target='blank' className="glass text-[18px] md:w-[50px] lg:w-full px-3 py-2 rounded-md hover:bg-white/20 transition"><icons.LinkedIn className="inline mb-1" size={24} /> <span className="md:hidden lg:inline">LinkedIn </span></a>
                        <a href="https://github.com/Vijayanand-debug/real-time-analytics-pipeline.git" target="_blank" className="glass text-[18px] md:w-[50px] lg:w-full px-3 py-2 rounded-md hover:bg-white/20 transition"><icons.Git className="inline mb-1" size={24} /> <span className="md:hidden lg:inline">Source Code </span></a>

                        <a
                            href="#"
                            onClick={() => openModal()}
                            className="group relative text-[18px] md:w-[50px] lg:w-full px-3 py-2 rounded-md font-semibold flex items-center gap-2 
                                       bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-600
                                       text-white shadow-md hover:shadow-lg hover:shadow-indigo-300/30
                                       transition-all duration-300 hover:-translate-y-[2px]">
                            <icons.Architecure
                                size={24}
                                className="transition-transform duration-300 group-hover:rotate-12"
                            />
                            <span className="md:hidden lg:inline">Architecture</span>

                            <span className="absolute inset-0 rounded-md bg-white/10 blur-md opacity-0 group-hover:opacity-60 transition duration-500"></span>
                        </a>

                    </nav>
                </div>

            </aside>

            <Modal>
                <About />
            </Modal>
        </>
    );
}