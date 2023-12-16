import { useEffect } from "react"
import { useAuthStore, useForm } from "../../hooks"

import Swal from "sweetalert2";

import '../../styles/authStyle.css'

const loginFields = {
	loginEmail: '',
	loginPassword: ''
}

const registerFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerConfirmPassword: ''
}

export const AuthPage = () => {

	const { startLogin, startRegister, errorMessage } = useAuthStore();

	// When errorMessage changes
	useEffect(() => {
		if (errorMessage !== undefined) {
			Swal.fire('Error', errorMessage, 'error');
		}
	}, [errorMessage])


	// Login Form
	const { loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange } = useForm(loginFields);

	// Register Form
	const { registerName,
		registerEmail,
		registerPassword,
		registerConfirmPassword,
		onInputChange: onRegisterInputChange } = useForm(registerFields);

	const onLoginSubmit = (event) => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword })
	}

	const onRegisterSubmit = (event) => {
		event.preventDefault();
		if (registerPassword !== registerConfirmPassword) {
			Swal.fire('Error de Registro', 'Contraseñas no coinciden.', 'error');
			return;
		}
		if (registerPassword.length < 8) {
			Swal.fire('Error de Registro', 'Contraseña debe tener minimo 8 caracteres.', 'error');
			return;
		}
		startRegister({ registerName, registerEmail, registerPassword });
	}


	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={onLoginSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name="loginEmail"
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="loginPassword"
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="form-group d-grid gap-2 mb-2">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={onRegisterSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name="registerName"
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name="registerEmail"
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name="registerPassword"
								value={registerPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name="registerConfirmPassword"
								value={registerConfirmPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2 d-grid gap-2">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}