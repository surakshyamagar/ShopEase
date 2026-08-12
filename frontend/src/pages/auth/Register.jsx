import { useState } from "react";
import api from "../../services/api";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // function for handle, (e)= form event
  const handleSubmit = async (e) => {
    // stops default reload/refresh
    e.preventDefault();

    // Check passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Send data to backend
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // 
      console.log(response.data);

      alert("Registration successful!");

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            // event handler function runs (when we do something like write)
            // e = event object (info about chnage)
            // setName = update name state
            // e.target = html element where event happened (<input/>)
            // e.target.value = Give me the current value inside that input.
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

         <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>

        <button type="submit">
          Create Account
        </button>


      </form>
    </div>
  )
}

export default Register;

// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

// function Register() {
//   const [showPassword, setShowPassword] = useState(false);

//   // store what user types
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // handleSubmit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Password do not macth");
//       return;
//     }
//     try{
//       const response = await api.post("/auth/register", {
//         name,
//         email,
//         password,
//       });

//       console.log(response.data);

//       alert("Account created successfully!");

//     } catch(error){
//       console.log(error.reponse?.data);

//       alert(
//         error.reponse?.data?.message || "Registration failed"
//       );
      
//     }
//   };

//   return (
//     <>
//       <h2 className="mb-6 text-center text-2xl font-bold">
//         Create Account
//       </h2>

//       <form className="space-y-5">

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Full Name
//           </label>

//           <input
//             type="text"
//             placeholder="Enter your full name"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
//           />
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Password
//           </label>

//           <div className="relative">

//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-emerald-500"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-3"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>

//           </div>
//         </div>

//         <div>
//           <label className="mb-2 block text-sm font-medium">
//             Confirm Password
//           </label>

//           <input
//             type="password"
//             placeholder="Confirm password"
//             className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-emerald-500"
//           />
//         </div>

//         <button
//           className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
//         >
//           Create Account
//         </button>

//       </form>

//       <p className="mt-6 text-center text-sm">
//         Already have an account?{" "}
//         <Link
//           to="/"
//           className="font-semibold text-emerald-600 hover:underline"
//         >
//           Login
//         </Link>
//       </p>
//     </>
//   );
// }

// export default Register;