import { useAuthStore } from "../../hooks"

export const NavBar = () => {

    const { user, startLogout } = useAuthStore();

    const onLogout = () => {
        startLogout();
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <a href="/">
                <span className="navbar-brand">
                    <i className="fas fa-calendar-alt">
                        &nbsp;
                        Calendar App
                    </i>
                </span>
            </a>
            <div className="d-flex">
                <div className="text-center m-2">
                    <span className="text-success"> Online: </span>
                    <span className="text-white">
                        {user.name}
                    </span>
                </div>
                <button onClick={onLogout} className="btn btn-outline-danger">
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
