import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  /** Create New Event */
  const onNewNote = () => {
    /** Clean Active Event */
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        id: "",
        name: "",
      },
    });

    // Open Modal
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={onNewNote}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
