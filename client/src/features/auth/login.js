import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { credentials } from "./auth";
import { loginmutation } from "./authapi";

const login = () => {
    //CHANGE TO CONST 
} //remove when un commented

    /*do we need this if we have .html?
    const nav = useNav()
    const dispatch = useDispatch()
    const [login, {loading}] = loginmutation()
    const errorClass = error ? "error message" : "off the screen"
    const screen = (
        <section className= "public">
            <header>
                <h1>USER LOGIN</h1>
            </header>
            <main className="login"></main>
            <footer>
                <Link to={"/"}>Main Page</Link>
            </footer>
        </section>
    )
    return screen

    return (
        <h1>LOGIN</h1> //link to html//
    )
    }
export default login */