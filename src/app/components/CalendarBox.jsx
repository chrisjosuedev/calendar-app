export const CalendarBox = ({ event }) => {

    const { title, user } = event;

    return (
        <>
            <span> {title} </span>
            <span>- {user.name}</span>
        </>
    )
}
