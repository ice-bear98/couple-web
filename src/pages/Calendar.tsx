import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import CalendarModal from "../component/CalendarModal";
import { realtimeDb } from "../firebase/FirebaseConfig";
import { onValue, push, ref, remove, set } from "firebase/database";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface ICalendar {
    id: string;
    title: string;
    start: string;
    end?: string;
    description?: string;
}

export default function Calendar() {
    const [isActive, setIsActive] = useState(false);
    const [events, setEvents] = useState<ICalendar[]>([]);

    useEffect(() => {
        const eventsRef = ref(realtimeDb, "calendar/events");
        onValue(
            eventsRef,
            (snapshot) => {
                const data = snapshot.val();
                const loadedEvents = [];
                for (const key in data) {
                    loadedEvents.push({
                        id: key,
                        ...data[key],
                    });
                }
                setEvents(loadedEvents);
            },
            (error) => {
                console.error("Firebase read failed: ", error);
            }
        );
    }, []);

    const handleAddEvent = (
        title: string,
        description: string,
        startTime: string,
        endTime: string
    ) => {
        const newEventRef = push(ref(realtimeDb, "calendar/events"));
        const newEvent = {
            title,
            start: startTime,
            end: endTime,
            description,
        };
        set(newEventRef, newEvent).then(() => {
            const safeId = newEventRef.key || Date.now().toString();
            setEvents((prevEvents) => [
                ...prevEvents,
                { ...newEvent, id: safeId },
            ]);
        });
        setIsActive(false);
    };

    const handleDeleteEvent = (eventId: string) => {
        const eventRef = ref(realtimeDb, `calendar/events/${eventId}`);
        remove(eventRef).then(() => {
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.id !== eventId)
            );
        });
    };

    const eventRender = (info: any) => {
        let startDate = info.event.start
            ? info.event.start.toLocaleString()
            : "시작 날짜 없음";
        let endDate = info.event.end
            ? info.event.end.toLocaleString()
            : "종료 날짜 없음";

        tippy(info.el, {
            content: `제목: ${info.event.title}<br>
            내용: ${
                info.event.extendedProps.description || "설명 없음"
            }<br>${startDate} - ${endDate}`,
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
