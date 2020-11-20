import React from "react";

export default function Navbar({ fixed }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div
      className="container  w-full shadow-xl  mx-auto px-2"
      style={{
        maxHeight: "10vh",

        backgroundImage: "linear-gradient(to bottom right,#333333,#222222)",
        backgroundColor: "black",
        shadow: "5px 5px 10px #000000",
      }}
    >
      <div className="grid grid-cols-2 gap-1">
        <div className="mx-2 " style={{ maxHeight: "10vh" }}>
          <button
            className="text-white cursor-pointer text-xl leading-none float-left   border  border-transparent rounded block lg:hidden  text-center outline-none focus:outline-none align-center"
            type="button"
            style={{ maxHeight: "10vh" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="justify-center pr-2 ">
              <img
                src="https://demos.creative-tim.com/tailwindcss-starter-project/_next/static/images/team-1-800x800-fa5a7ac2c81a43925586ea85f2fea332.jpg"
                alt="..."
                style={{ maxHeight: "8vh" }}
                className="shadow rounded-full float-left   align-middle border-none object-contain"
              />
            </div>
          </button>
          <div className="text-white text-sm truncate">Employee Name</div>
          <div className=" text-white text-xs">Title</div>
        </div>

        <div style={{ maxHeight: "10vh" }}>
          <a
            className="text-sm float-right font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            href="#pablo"
          >
            BearFoot Pools
          </a>
        </div>
      </div>
    </div>
  );
}
