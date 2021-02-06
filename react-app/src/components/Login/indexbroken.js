// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory, Redirect } from "react-router-dom";
// import { login, setUser } from "../../store/sessionbroken";



// function LoginForm({ authenticated, setAuthenticated }) {
//     const dispatch = useDispatch();
//     const history = useHistory();

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState([]);


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // setErrors([]);
//         const user = await (login(email, password))
//         if (!user.errors) {
//             setAuthenticated(true);
//             dispatch(setUser(user.data));
//         } else {
//             setErrors(user.errors);
//         }
//     };
//     const demoLogin = async (e) => {
//         setEmail('demo_user@aa.io');
//         setPassword('password')
//         const user = await login(email, password);
//         console.log("USER", user)
//         setAuthenticated(true);
//         dispatch(setUser(user.data));

//     }

//     if (authenticated) {
//         return <Redirect to="/" />;
//     }


//     return (
//         <form onSubmit={handleSubmit} >
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <h1>Log In</h1>
//             <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//             />
//             <button type="submit" className="loginbutton buttonstyle">You May Enter</button>
//             <Link to="/sign-up" className="">Create an account</Link>
//             <button onClick={demoLogin}>Demo Login</button>
//         </form>
//     );
// }

// export default LoginForm;
