import { realtimeDb } from "./FirebaseConfig";
import { push, ref, set, update, remove } from "firebase/database";

export function addEvent(
    title: string,
    startTime: string,
    endTime: string,
    description: string
) {
    const newEventRef = push(ref(realtimeDb, "calendar/events"));
    const event = {
        title,
        start: startTime,
        end: endTime,
        description,
    };

    set(newEventRef, event);
}

export function updateEvent(
    eventId: string,
    title: string,
    startTime: string,
    endTime: string,
    description: string
) {
    const eventRef = ref(realtimeDb, `calendar/events/${eventId}`);
    const updatedEvent = {
        title,
        start: startTime,
        end: endTime,
        description,
    };

    update(eventRef, updatedEvent);
}

export function deleteEvent(eventId: string) {
    const eventRef = ref(realtimeDb, `calendar/events/${eventId}`);
    remove(eventRef);
}
