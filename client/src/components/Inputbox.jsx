export function Inputbox({ placeholder, label ,onChange}) {
    return (
      <div className="py-2">
        <div className=" text-xl font-semibold text-left pb-1.5">{label}</div>
        <input 
          onChange={onChange}
          className="rounded-sm p-2 w-[100%] outline-none focus:border-black border border-slate-300"
          placeholder={placeholder}
        />
      </div>
    );
  }
  