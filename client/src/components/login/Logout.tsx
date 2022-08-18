// import { Navigate, Route } from 'react-router-dom';

export default function Logout() {
    localStorage.clear()

    if (localStorage.getItem("user") == null) {
        window.location.assign("/");
    }

    return (
        <>
            {/* <Route path="/" element={<Navigate to="/" />} /> */}
        </>
    )
}