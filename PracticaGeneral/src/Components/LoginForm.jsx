const LoginForm = ({handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password}) => {

    return(
        <div>
        <h3>Login</h3>
        <form id='form-login' onSubmit={handleSubmit}>
          <label>Usuario:</label>
          <input type='text' value={username} name='Username' onChange={handleUsernameChange} placeholder='username'/> 
    
          <label>Contraseña:</label>
          <input type='password' value={password} name='Password' onChange={handlePasswordChange} placeholder='password'/>
    
          <button type="submit">login</button>
        </form> 
        </div>
    )
}

export default LoginForm