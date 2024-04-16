import { useEffect, useState } from "react";
import {
    ref,
    query,
    limitToFirst,
    orderByChild,
    onValue,
    startAt,
    orderByKey,
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

interface IWish {
    id: string;
    description: string;
}

export default function Main() {
    const [calendar, setCalendar] = useState<IEvent[]>([]);
    const [wishes, setWishes] = useState<IWish[]>([]);

    useEffect(() => {
        //calendar
        const fetchCalendar = () => {
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
                setCalendar(newEvents);
            });
        };

        //wishlist
        const fetchWishes = () => {
            const wishesRef = query(
                ref(realtimeDb, "wishlist"),
                orderByKey(),
                limitToFirst(5)
            );
            return onValue(wishesRef, (snapshot) => {
                const newWishes: IWish[] = [];
                snapshot.forEach((childSnapshot) => {
                    const wish = childSnapshot.val();
                    newWishes.push({
                        id: childSnapshot.key,
                        description: wish.description,
                    });
                });
                setWishes(newWishes);
            });
        };
        const unsubscribeEvents = fetchCalendar();
        const unsubscribeWishes = fetchWishes();

        return () => {
            unsubscribeEvents();
            unsubscribeWishes();
        };
    }, []);

    return (
        <div className="max-h-screen bg-stone-300 text-center">
            <div className="bg-stone-100 min-h-screen mx-auto max-w-80 sm:max-w-lg  md:max-w-xl lg:max-w-4xl">
                <div className="py-4">헥헥</div>
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
                <div className="flex">Wish List</div>
                <div>
                    {wishes.map((wish) => (
                        <div key={wish.id} className="flex text-gray-700">
                            {wish.description}
                        </div>
                    ))}
                </div>
                <div className="">
                    <div className="flex text-blue-500">Calendar</div>
                    {calendar.map((event) => (
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
