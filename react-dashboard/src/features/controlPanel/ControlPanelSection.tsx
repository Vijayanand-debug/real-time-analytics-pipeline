import { useAppStore } from '@/store/store';
import { menuItems } from '@/utils/utils';
import { useRef } from 'react';

export default function ControlPanel() {

    const sendEvent = useAppStore((state) => state.sendEvent);
    const Icon = menuItems.control_panel;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        const input = inputRef.current?.value;

        if (input && input.length > 0) {

            if (input.length > 20) {
                input.substring(0, 20);
            }
            sendEvent('search', { page: input });
            inputRef.current ? inputRef.current.value = '' : '';
        }
    }

    return (
        <>
            <section className="mt-[80px] card glass p-6 rounded-2xl shadow-md md:mt-[0px]">
                <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-4 flex items-center gap-2">
                    <Icon /> Control Panel
                </h2>
                <p className="text-sm text-gray-700 mb-4">Simulate user actions and trigger live updates across the dashboard.</p>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => sendEvent('view price', { page: '/customer clicked view pricing' })}
                            className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-2 px-3 rounded-md shadow hover:opacity-90 transition text-sm font-medium"
                        >
                            View Pricing
                        </button>
                        <button
                            onClick={() => sendEvent('sign up', { page: '/customer clicked sign up' })}
                            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 px-3 rounded-md shadow hover:opacity-90 transition text-sm font-medium"
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => sendEvent('request demo', { page: '/customer clicked on request demo' })}
                            className="bg-gray-800 text-white py-2 px-3 rounded-md shadow hover:bg-gray-700 transition text-sm font-medium"
                        >
                            Request Demo
                        </button>
                        <button
                            onClick={() => sendEvent('view docs', { page: '/customer clicked view docs' })}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-3 rounded-md shadow hover:opacity-90 transition text-sm font-medium"
                        >
                            View Docs
                        </button>
                    </div>

                    <div className="flex">
                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="Enter search term..."
                            className="flex-1 border border-indigo-300 p-2 rounded-l focus:outline-none focus:border-cyan-500 text-sm"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-2 px-4 rounded-r hover:opacity-90 transition text-sm font-medium"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}