// utils/Mailitem.tsx
import React from "react";

interface MailItemProps {
    subject: string;
    date: string;
    onClick: () => void;
}

const Mailitem: React.FC<MailItemProps> = ({ subject, date, onClick }) => {
    return (
        <div
            className="block p-4 border-b-2 border-gray-800 cursor-pointer mt-2 hover:rounded-lg hover:bg-slate-950 hover:border-slate-950 transition duration-200"
            onClick={onClick}
        >
            <h3 className="text-lg font-semibold">{subject}</h3>
            <p className="text-sm">{date}</p>
        </div>
    );
};

export default Mailitem;
