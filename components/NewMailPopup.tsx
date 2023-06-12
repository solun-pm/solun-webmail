import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowUp } from "@fortawesome/free-solid-svg-icons";

interface NewMailPopupProps {
    onClose: () => void;
}

export const NewMailPopup: React.FC<NewMailPopupProps> = ({ onClose }) => {
    // Form elements
    const [to, setTo] = useState<string>('');
    const [copy, setCopy] = useState<string>('');
    const [blindcopy, setBlindcopy] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    // Desing elemtents
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const expandedFieldsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isExpanded &&
                expandedFieldsRef.current &&
                !expandedFieldsRef.current.contains(event.target as Node) &&
                !copy &&
                !blindcopy
            ) {
                setIsExpanded(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded, copy, blindcopy]);


    const handleExpandClick = () => {
        setIsExpanded(true);
    }

    const handleBlur = () => {
        if (!copy && !blindcopy) {
            setIsExpanded(false);
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/smtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to,
                    copy,
                    blindcopy,
                    subject,
                    message
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-950 p-8 rounded-lg w-10/12 lg:w-1/2 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <button
                            className="w-8 h-8 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-950 flex items-center justify-center mb-2"
                            onClick={onClose}
                        >
                            <FontAwesomeIcon icon={faTimes} size="lg" />
                        </button>
                        <h2 className="text-2xl font-semibold text-white">
                            New Mail
                        </h2>
                    </div>
                    <button
                        type="submit"
                        className="w-12 h-12 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-700 flex items-center justify-center"
                        onClick={handleSubmit}
                    >
                        <FontAwesomeIcon icon={faArrowUp} size="2x" />
                    </button>
                </div>
                <form className="mt-4 flex-grow" onSubmit={handleSubmit}>
                    <div className="border-t border-blue-500 bg-gray-950">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="email"
                            placeholder="To:"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                    {!isExpanded ? (
                        <div className="border-t border-blue-500">
                            <button
                                className="w-full p-2 bg-gray-950 border-none outline-none text-left flex justify-start items-center"
                                onClick={handleExpandClick}
                            >
                            <span
                                className={isHovering ? "text-blue-500 mr-2" : "text-white mr-2"}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                CC/BCC,
                            </span>
                                                        <span className="text-white">
                                From: Your Name your@mailaddress
                            </span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <div ref={expandedFieldsRef}>
                                <div className="border-t border-blue-500">
                                    <input
                                        className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                                        type="text"
                                        placeholder="Copy:"
                                        value={copy}
                                        onChange={(e) => setCopy(e.target.value)}
                                    />
                                </div>
                                <div className="border-t border-blue-500">
                                    <input
                                        className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                                        type="text"
                                        placeholder="Blindcopy:"
                                        value={blindcopy}
                                        onChange={(e) => setBlindcopy(e.target.value)}
                                    />
                                </div>
                                <div className="border-t border-blue-500">
                                    <input
                                        className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                                        type="text"
                                        placeholder="From: Your Name your@mailaddress"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className="border-t border-blue-500">
                        <input
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="text"
                            placeholder="Subject:"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="border-t border-blue-500">
                        <textarea
                            className="w-full p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            placeholder="Message:"
                            rows={8}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};