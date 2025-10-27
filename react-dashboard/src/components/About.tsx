import { menuItems } from '@/utils/utils';
import { useUI } from "@/context/UIContext";

export default function About() {
    const icons = { CloseMenu: menuItems.closeMenu };
    const { closeModal } = useUI();

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="relative bg-white w-[90%] max-w-2xl rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden max-h-[80vh] flex flex-col">

                    <button
                        onClick={() => closeModal()}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition z-[9]"
                        aria-label="Close modal"
                    >
                        <icons.CloseMenu size={22} />
                    </button>

                    <div className="sticky top-0 bg-white border-b border-indigo-100">
                        <img
                            src="/arch_v1.png"
                            className="w-full object-contain max-h-[280px] md:max-h-[320px]"
                            alt="Architecture Diagram"
                        />
                    </div>

                    <div className="p-6 md:p-8 space-y-4 text-gray-800 overflow-y-auto">
                        <h2 className="text-lg font-semibold text-indigo-600">
                            About This Project
                        </h2>

                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            This project is an interactive analytics dashboard that shows what a real time data pipeline looks like under the hood.
                            As you explore and trigger the events, your events are sent through a Kafka message queue, processed, and broadcast back to you and any other connected users instantly.
                        </p>

                        <div className="mt-4 space-y-3">
                            <h2 className="text-lg font-semibold text-indigo-600">How It Works</h2>
                            <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                                <li>The <strong>React app</strong> captures user interactions and sends them to a Node.js API.</li>
                                <li>The <strong>API</strong>'s only job is to instantly publish these events to a <strong>Kafka</strong> topic and respond immediately to the client, ensuring a fast user experience..</li>
                                <li>A separate <strong>Worker</strong> service consumes the events, processes them, and saves them to a PostgreSQL database.</li>
                                <li>The API also listens for these events and pushes them out to all connected clients via <strong>WebSockets</strong>, creating the live updating dashboard.</li>
                            </ul>
                        </div>

                        <div className="mt-4 space-y-2">
                            <h2 className="text-lg font-semibold text-indigo-600">Tech Stack</h2>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">React</span>
                                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">Kafka</span>
                                <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">Tailwind CSS</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">Node.js</span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">PostgreSQL</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">WebSockets</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Docker</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">AWS ECR</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">AWS ECS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}