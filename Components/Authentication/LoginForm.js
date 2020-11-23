import React from "react";
import countries from "./countries";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";
function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var body = {
      email: `${email}`,
      password: `${password}`,
    };
    console.log(`
      Email: ${email}
      Password: ${password}
      Accepted Terms: ${acceptedTerms}
    `);
    props.login(body);
  };

  //   return (
  //     <form onSubmit={handleSubmit}>
  //       <h1>Create Account</h1>

  //       <label>
  //         Email:
  //         <input
  //           name="email"
  //           type="email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           required
  //         />
  //       </label>

  //       <label>
  //         Password:
  //         <input
  //           name="password"
  //           type="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </label>

  //       <label>
  //         Country:
  //         <select
  //           name="country"
  //           value={country}
  //           onChange={(e) => setCountry(e.target.value)}
  //           required
  //         >
  //           <option key=""></option>
  //           {countries.map((country) => (
  //             <option key={country}>{country}</option>
  //           ))}
  //         </select>
  //       </label>

  //       <label>
  //         <input
  //           name="acceptedTerms"
  //           type="checkbox"
  //           onChange={(e) => setAcceptedTerms(e.target.value)}
  //           required
  //         />
  //         I accept the terms of service
  //       </label>

  //       <button>Submit</button>
  //     </form>
  //   );
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2 mx-auto">
      <div className="w-full mx-auto text-center">
        <img
          src="Assets/unlock.svg"
          className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <img src="Assets/avatar.svg" className="w-32" />
        <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
          Welcome to you
        </h2>
        <div className="relative">
          <i className="fa fa-user absolute text-primarycolor text-xl"></i>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
          />
        </div>
        <div className="relative mt-8">
          <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
          <input
            type="password"
            placeholder="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
          />
        </div>
        <a href="#" className="self-end mt-4 text-gray-600 font-bold">
          Forgot password?
        </a>
        <a
          href="#"
          className="py-3 px-20 bg-primarycolor rounded-full text-black-300 font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
        >
          <button>Login</button>
        </a>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
