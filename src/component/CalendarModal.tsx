import { useState } from "react";

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (
        title: string,
        description: string,
        startTime: string,
        endTime: string
    ) => void;
}

export default function CalendarModal({
    isOpen,
    onClose,
    onSave,
}: CalendarModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    if (!isOpen) return null;

    return (
        <div className="z-10 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg text-center mb-4">일정 등록</h3>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full mb-2"
                />
                <input
                    type="text"
                    placeholder="설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full mb-2"
                />
                <input
                    type="datetime-local"
                    placeholder="시작 시간"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="block w-full mb-2"
                />
                <input
                    type="datetime-local"
                    placeholder="종료 시간"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="block w-full mb-4"
                />
                <button
                    onClick={() => {
                        onSave(title, description, startTime, endTime);
                        onClose();
                    }}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    등록
                </button>
            </div>
        </div>
    );
}
