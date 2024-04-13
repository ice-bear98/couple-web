import { useEffect, useState } from "react";
import {
    ref,
    query,
    limitToFirst,
    orderByChild,
    onValue,
    startAt,
} from "firebase/database";
import { realtimeDb } from "../firebase/FirebaseConfig";
import { Link } from "react-router-dom";

interface IEvent {
    id: string;
    title: string;
    start: string;
    end?: string;
    description?: string;
}

export default function Main() {
    const [events, setEvents] = useState<IEvent[]>([]);

    useEffect(() => {
        const fetchEvents = () => {
            const now = new Date().toISOString();
            const eventsRef = query(
                ref(realtimeDb, "calendar/events"),
                orderByChild("start"),
                startAt(now),
                limitToFirst(5)
            );
            return onValue(eventsRef, (snapshot) => {
                const newEvents: IEvent[] = [];
                snapshot.forEach((childSnapshot) => {
                    const event = childSnapshot.val();
                    newEvents.push({ id: childSnapshot.key, ...event });
                });
                setEvents(newEvents);
            });
        };

        const unsubscribe = fetchEvents();

        return () => unsubscribe();
    }, []);

    return (
        <div className="max-h-screen bg-stone-300 text-center">
            <div className="bg-stone-100 min-h-screen mx-auto max-w-80 sm:max-w-lg  md:max-w-xl lg:max-w-4xl">
                <div className="py-4">제목</div>
                <div>
                    <ul className="flex justify-center items-center space-x-4 pb-4">
                        <li>
                            <Link to={"/main"}>Main</Link>
                        </li>
                        <li>
                            <Link to={"/history"}>History</Link>
                        </li>
                        <li>
                            <Link to={"/calendar"}>Calendar</Link>
                        </li>
                        <li>
                            <Link to={"/wishList"}>Wish List</Link>
                        </li>
                        <li>
                            <Link to={"/map"}>Date Map</Link>
                        </li>
                    </ul>
                </div>
                <div className="">Picture</div>
                <div className="">Wish List</div>
                <div className="">
                    <div className="flex text-blue-500">Calendar</div>
                    {events.map((event) => (
                        <div className="flex" key={event.id}>
                            <p className="text-red-300">
                                {event.title} -{" "}
                                <span className="text-yellow-600">
                                    {" "}
                                    {new Date(event.start).toLocaleDateString()}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
