import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal, onSetActiveEvent } from "../store";

export const useUiStore = () => {
    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui);

    /** Open Modal */
    const openDateModal = () => {
        dispatch(onOpenDateModal());
    }

    /** Close Modal */
    const closeDateModal = () => {
        dispatch(onCloseDateModal());
        dispatch(onSetActiveEvent(null));
    }

    return {
        // Properties
        isDateModalOpen,
        // Methods
        openDateModal,
        closeDateModal
    }

}
