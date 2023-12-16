import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [],
        activeEvent: null,
        isLoadingEvents: true,
    },
    reducers: {
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map((event) => {
                if (event.id === payload.id) return payload;
                return event;
            });
        },
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onDeleteEvent: (state) => {
            state.events = state.events.filter(
                (event) => event.id !== state.activeEvent.id
            );
            state.activeEvent = null;
        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            /** Load just new Events, if event already exists in Store, dont save it  */
            payload.forEach((event) => {
                const exists = state.events.some(
                    (eventInStore) => eventInStore.id === event.id
                );
                if (!exists) state.events.push(event);
            });
        },
        onLogoutCalendar: (state) => {
            state.events = [];
            state.activeEvent = null;
            state.isLoadingEvents = false;
        },
    },
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar,
} = calendarSlice.actions;
