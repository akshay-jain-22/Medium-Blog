import type { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "@akshuuu22/common12";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            // handle error
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-white">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold text-center mb-2">
                        {type === "signup" ? "Create an account" : "Sign in to your account"}
                    </div>
                    <div>
                        <div className="flex justify-center text-slate-500">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link className="underline pl-2 " to={type === "signin" ? "/signup" : "/signin"}> {type === "signin" ? "Signup" : "Login"} </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <form className="pt-8 w-96" onSubmit={e => { e.preventDefault(); sendRequest(); }}>
                        {type === "signup" ? <LabelInput label="Name" placeholder="Akshay Jain...." onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null}
                        <LabelInput label="Username" placeholder="akshay@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                username: e.target.value
                            })
                        }} />
                        <LabelInput label="Password" type={"password"} placeholder="123456" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up " : "Sign in"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
interface LabelInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelInput({label,placeholder,onChange,type}: LabelInputType){
    return (
        <div className="mb-4 w-full">
            <label className="block mb-2 text-sm font-extrabold text-gray-900 dark:black">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}