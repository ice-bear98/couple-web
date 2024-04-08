import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const startDay: Date = new Date("2023-06-07");
    const today: Date = new Date();
    const diffTime = today.getTime() - startDay.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password === "0607") {
            navigate("/main");
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayOfWeek = days[today.getDay()];

    return (
        <div className="max-h-screen bg-stone-300 text-center">
            <div className="bg-stone-100 min-h-screen mx-auto max-w-80 sm:max-w-lg  md:max-w-xl lg:max-w-4xl">
                <div className=" space-y-4">
                    <div className="pt-6 text-4xl text-red-200">
                        D + <span>{diffDays}일</span>
                    </div>
                    <div className="pb-6 text-xl text-stone-300 ">
                        <span className="tracking-widest">{dayOfWeek}</span>
                    </div>
                </div>
                <div
                    style={{ height: "50vh" }}
                    className="bg-black bg-center bg-cover bg-no-repeat bg-home-image "
                ></div>
                <div>
                    <p className="text-pink-400 py-10">
                        인생에서 가장 행복한 때는 <br />
                        누군가에게서 사랑받는다고 <br /> 확신할 때이다.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="password"
                            className="text-black"
                        />
                        <button type="submit">입력</button>
                    </form>
                </div>
            </div>
            ;
        </div>
    );
}
