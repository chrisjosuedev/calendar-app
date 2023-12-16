import calendarApi from "../api/calendarApi";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /** Start Login */
    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/signin", {
                email,
                password,
            });
            const { uid, name, token } = data.data;

            // Save Token in LocalStorage
            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            // Dispatch OnLogin
            dispatch(onLogin({ uid, name }));
        } catch (error) {
            dispatch(onLogout("Credenciales incorrectas"));

            // Clear Message Error
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    /** Start Register */
    const startRegister = async ({
        registerName,
        registerEmail,
        registerPassword,
    }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/signup", {
                name: registerName,
                email: registerEmail,
                password: registerPassword,
            });

            const { uid, name, token } = data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({ uid, name }));
        } catch (error) {
            /** Errors Backend Response is a String Array */
            const { errors } = error.response.data;
            dispatch(onLogout(errors.toString()));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    /** Check Token */
    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout());
        try {
            const { data } = await calendarApi.get("/auth/renew");
            const { uid, name, token } = data.data;

            localStorage.setItem("token", token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({ uid, name }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    /** Start Logout */
    const startLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) return dispatch(onLogout());
        try {
            // Logout User in Backend...
            await calendarApi.post("/auth/logout");
            localStorage.clear();
            dispatch(onLogoutCalendar());           
            dispatch(onLogout()); 
        } catch (error) {
            dispatch(onLogout());
        }
    }

    return {
        // Properties
        status,
        user,
        errorMessage,

        // Methods
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    };
};
