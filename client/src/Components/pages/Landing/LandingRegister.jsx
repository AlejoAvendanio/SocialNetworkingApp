import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { postUser } from "../../../Redux/actions.js"


const LandingRegister = () => {
	const dispatch = useDispatch()

    const [input, setInput] = useState({
			name:"",
			email:"",
			password: "",
	});

	const [errors, setErrors] = useState({});

	function validate(input) {
		let errors = {};
		if (!input.name ) {
			errors.name = "The name is requiered";
		}
		if (!input.email || !/^[^@]+@[^@]+\.[a-zA-Z]{3,}$/.test(input.email)) {
			errors.email = "invalid e-mail example: example@example.com";
		}
		// contrasena asi:
		// Minimo 8 caracteres
		// Maximo 15
		// Al menos una letra mayúscula
		// Al menos una letra minucula
		// Al menos un dígito
		// No espacios en blanco
		// Al menos 1 caracter especial
		if (!input.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@$!%*?&])([A-Za-z\d$@$!%*?&]|[^]){8,15}$/.test(input.password)){
			errors.password = "invalid e-mail: -8 a 15 characters is necessary -At least one capital letter -At least one digit -Not espaces -At least one special character";
		}
		return errors;
	}

	function handleChange(e) {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		console.log(input)
	}

	function handleSubmit(e) {
		console.log(input)
		e.preventDefault();
		dispatch(postUser(input));
		setInput({
			name:"",
			email:"",
			password: "",
		});
	}

	return (
		<div>
			<h1>Register</h1>
				<br />
				<div>
					<label>Name :</label>
					<input
						type="text"
						value={input.name}
						name="name"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("name") ? (
						<p>{errors.name}</p>
					) : null}
				</div>
				<div>
					<label>E-mail :</label>
					<input
						type="text"
						value={input.email}
						name="email"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("email") ? (
						<p>{errors.email}</p>
					) : null}
				</div>
				<label>Password :</label>
					<input
						type="text"
						value={input.password}
						name="password"
						onChange={(e) => handleChange(e)}
					/>
					{errors.hasOwnProperty("password") ? (
						<p>{errors.password}</p>
					) : null}
					<br/>
					{Object.entries(errors).length > 0 ? (
						<button className="falso">RegisterM</button>
					) : (
						<button onClick={(e) => handleSubmit(e)} className="bueno">
							RegisterB
						</button>
					)}
		</div>
	)
}

export default LandingRegister