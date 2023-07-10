import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserStorage } from "./UserContext";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import User from "./Components/User/User";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Photo from "./Components/Photo/Photo";
import Footer from "./Components/Footer";
import "./App.css";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <UserStorage>
                    <Header />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="login/*" element={<Login />} />
                        <Route path="conta/*" 
                            element={
                                <ProtectedRoute>
                                    <User />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="foto/:id" element={<Photo />} />
                    </Routes>

                    <Footer />
                </UserStorage>
            </BrowserRouter>
        </div>
    )
}

export default App
