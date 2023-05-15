import { useEffect, useState, useRef } from "react";
import { InterfaceCountryInfo } from "app/config/@interfaces/hook.interface";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

type Props = { data: InterfaceCountryInfo[]; onChange: (e: string) => void };

export default function Select({ data, onChange }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [countries, setCountries] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({ code: "", name: "", flag: "" });

  useEffect(() => {
    setCountries(data);
    setSelected(data[0]);
    return () => {};
  }, [data]);

  useEffect(() => {
    if (!selected) return;
    onChange(selected.code);
    return () => {};
  }, [selected]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative flex-none w-full md:w-[300px]">
      <div onClick={toggleDropdown}>
        <div className="flex items-center gap-2 px-4 py-3 bg-green-200 dark:bg-neutral-950/50  rounded-md cursor-pointer">
          <img src={selected && selected.flag} className="w-8 h-5" />
          <div className="m-text-overflow">{selected && selected.name}</div>
          <ChevronUpDownIcon className="w-5 h-5 ml-auto" />
        </div>
      </div>
      {isOpen && (
        <div
          className={`absolute top-[110%] left-0 bg-green-200/80 dark:bg-neutral-950/80 z-10 backdrop-blur-sm rounded-md shadow-lg w-full h-[300px] px-2 py-3 ${
            isOpen ? "animate-fadeIn opacity-100" : "opacity-0"
          }`}
        >
          <div className=" flex flex-col w-full h-full overflow-x-auto">
            {countries.map((country) => {
              return (
                <div
                  key={`country-item-${country.code}`}
                  className={`flex items-center gap-2 text-sm p-2 cursor-pointer ${
                    selected.code === country.code
                      ? "bg-white/20 dark:bg-green-400/10"
                      : "hover:bg-white/10 dark:hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setSelected(country);
                    setIsOpen(false);
                  }}
                >
                  <img src={country.flag} className="w-8 h-5 flex-none" />
                  <div className="m-text-overflow">{country.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
