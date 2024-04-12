import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import CalendarModal from "../component/CalendarModal";

import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Calendar() {
    const [isActive, setIsActive] = useState(false);
    const [events, setEvents] = useState([
        {
            id: "",
            title: "",
            start: "",
        },
    ]);

    const handleAddEvent = (
        title: string,
        description: string,
        startTime: string,
        endTime: string
    ) => {
        const newEvent = {
            id: Date.now().toString(),
            title,
            start: startTime,
            end: endTime,
            description,
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setIsActive(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents((prevEvents) =>
            prevEvents.filter((event) => event.id !== eventId)
        );
    };

    const eventRender = (info: any) => {
        tippy(info.el, {
            content: `제목: ${info.event.title}<br> 
            내용: ${
                info.event.extendedProps.description
            }<br>${info.event.start.toLocaleString()} - ${info.event.end.toLocaleString()}`,
            allowHTML: true,
        });
    };

    return (
        <div className="max-h-screen bg-stone-300 text-center">
            <div className="bg-stone-100 min-h-screen mx-auto max-w-80 sm:max-w-lg  md:max-w-xl lg:max-w-4xl">
                {isActive && <div className="absolute">나는 모달!</div>}
                <div>
                    <Link to="/main">메인으로 이동</Link>
                    {isActive && (
                        <CalendarModal
                            isOpen={isActive}
                            onClose={() => setIsActive(false)}
                            onSave={handleAddEvent}
                        />
                    )}
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="dayGridMonth"
                        locale="ko"
                        headerToolbar={{
                            left: "prevYear prev today",
                            center: "title",
                            right: "next nextYear",
                        }}
                        titleFormat={{
                            year: "numeric",
                            month: "short",
                        }}
                        height={"90vh"}
                        events={events}
                        eventDidMount={eventRender}
                        eventClick={(clickInfo) => {
                            if (
                                window.confirm(
                                    `'${clickInfo.event.title}' 이벤트를 삭제하시겠습니까?`
                                )
                            ) {
                                handleDeleteEvent(clickInfo.event.id);
                            }
                        }}
                    />
                </div>
                <div className="flex justify-end p-2">
                    <button
                        className="hover:cursor-pointer bg-blue-100 rounded-lg p-2 text-lg"
                        onClick={() => setIsActive(true)}
                    >
                        일정 등록
                    </button>
                </div>
            </div>
        </div>
    );
    ``;
}
