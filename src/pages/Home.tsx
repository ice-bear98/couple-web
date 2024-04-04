export default function Home() {
    const startDay: Date = new Date("2023-06-07");
    const today: Date = new Date(); //
    const diffTime = today.getTime() - startDay.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //

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
        <div className="max-h-screen bg-stone-300">
            <div className=" min-h-screen max-w-xs mx-auto sm:max-[300px] md:max-w-xl lg:max-w-3xl bg-white">
                <div className="text-center space-y-4">
                    <div className="pt-6 text-4xl text-red-200">
                        D + <span>{diffDays}일</span>
                    </div>
                    <div className="pb-6 text-xl text-stone-300 ">
                        <span className="tracking-widest">{dayOfWeek}</span>
                    </div>
                </div>
                <div className="bg-black bg-center bg-cover bg-no-repeat bg-home-image">
                    123
                </div>
                <div></div>
            </div>
            ;
        </div>
    );
}
