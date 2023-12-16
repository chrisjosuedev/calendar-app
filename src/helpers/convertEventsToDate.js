import { parseISO } from "date-fns";

/** Convert String Date to JS Date */
export const convertEventsToDate = (events = []) => {
    return events.map((event) => {
        event.start = parseISO(event.start);
        event.end = parseISO(event.end);
        return event;
    });
};
