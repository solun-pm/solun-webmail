import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowUp, faPaperclip } from "@fortawesome/free-solid-svg-icons";

interface NewMailPopupProps {
    onClose: () => void;
}

export const NewMailPopup: React.FC<NewMailPopupProps> = ({ onClose }) => {
    // Form elements
    const [to, setTo] = useState<Email[]>([]);
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


    //Einbettung
    interface Email {
        email: string;
        valid: boolean;
    }

// Form elements
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [editMode, setEditMode] = useState<number | null>(null);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleTagDoubleClick = (index: number) => {
        setEditMode(index);
        setCurrentEmail(to[index].email);
    };

    const handleTagBlur = (index: number, newEmail: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        const valid = emailRegex.test(newEmail);

        if (newEmail === '') {
            setTo(to.filter((emailObj, i) => i !== index));
        } else {
            setTo(to.map((emailObj, i) => i === index ? { email: newEmail, valid } : emailObj));
        }
        setEditMode(null);
        setCurrentEmail('');
    };

    const handleAddEmail = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        const valid = emailRegex.test(email);

        setTo([...to, { email, valid }]);
        setCurrentEmail('');
    };
    const handleStartEditing = (index: number) => {
        setCurrentEmail(to[index].email);
        setEditingIndex(index);
    };

    const handleEmailChange = (index: number, newEmail: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
        const valid = emailRegex.test(newEmail);

        setTo(to.map((emailObj, i) => i === index ? { email: newEmail, valid } : emailObj));
    };

    const handleDeleteLastEmail = () => {
        setTo(to.slice(0, -1));
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
                    <div className="flex items-center">
                        <label className="w-6 h-6 text-blue-700 hover:text-blue-900 flex items-center justify-center mr-4 cursor-pointer">
                            <input type="file" style={{display: 'none'}} />
                            <FontAwesomeIcon icon={faPaperclip} size="lg" />
                        </label>
                        <button
                            type="submit"
                            className="w-12 h-12 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-700 flex items-center justify-center"
                            onClick={handleSubmit}
                        >
                            <FontAwesomeIcon icon={faArrowUp} size="2x" />
                        </button>
                    </div>
                </div>


                <form className="mt-4 flex-grow" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap border-t border-blue-500 bg-gray-950">
                        {to.map((emailObj, index) => (
                            <div
                                className={`email-tag px-2 py-1 m-1 rounded ${emailObj.valid ? 'bg-blue-500 text-white' : 'bg-red-500 text-black'}`}
                                onDoubleClick={() => handleTagDoubleClick(index)}
                            >
                                {editMode === index ? (
                                    <input
                                        type="email"
                                        value={currentEmail}
                                        onBlur={(e) => handleTagBlur(index, e.target.value)}
                                        onChange={(e) => setCurrentEmail(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleTagBlur(index, e.target.value);
                                            }
                                        }}
                                        className={`${emailObj.valid ? 'bg-blue-500 text-white' : 'bg-red-500 text-black'}`}
                                        autoFocus
                                    />
                                ) : (
                                    emailObj.email
                                )}
                            </div>
                        ))}
                        <input
                            className="flex-grow p-2 text-white bg-gray-950 placeholder-gray-400 border-none outline-none"
                            type="email"
                            placeholder="To:"
                            value={editMode !== null ? '' : currentEmail}
                            onChange={(e) => setCurrentEmail(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Backspace' && currentEmail === '') {
                                    e.preventDefault();
                                    handleDeleteLastEmail();
                                } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (currentEmail !== '') {
                                        handleAddEmail(currentEmail);
                                    }
                                }
                            }}
                        />
                    </div>
                    {!isExpanded ? (
                        <div className="border-t border-blue-500">
                            <button
                                className="w-full p-2 bg-gray-950 border-none outline-none text-left flex justify-start items-center"
                                onClick={handleExpandClick}
                            >
                            <span
                                className={isHovering ? "text-blue-500 mr-2" : "text-gray-400 mr-2"}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                CC/BCC,
                            </span>
                                                        <span className="text-gray-400">
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