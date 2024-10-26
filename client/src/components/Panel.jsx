import { Plus } from "lucide-react";

// Panel Component

export default function Panel({ title, children, isActive, onShow }) {
    return (
        <section className="relative panel w-full flex flex-col gap-2 ">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <div className="" >
                
                {isActive ? (
                    <p className="pt-2 pb-5">{children}</p>
                ) : (
                <button className="absolute top-1 right-0 " onClick={onShow}><Plus /></button>
                )}


            </div>
           <hr className="border-black pb-2"/>
        </section>
    );
}
