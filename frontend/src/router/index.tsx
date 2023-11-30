import { Route, Routes, BrowserRouter } from "react-router-dom";

import { Main } from "../pages/main/Main";
import { Game } from "../pages/game/Game";
import { Auth } from "../pages/auth/Auth";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/game/:room_code" element={<Game />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router