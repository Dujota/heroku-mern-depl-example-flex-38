import {useState} from 'react';

import './App.css';

function App() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)

async function registerUser(){
  try{
    const res = await fetch('/api/users/signup',  {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({email, password})
    })
    const data = await res.json()
    setEmail('')
    setPassword('')
    setUser(data.user)
  }catch(e){
    console.error(e)
  }
  // debugger;
}

  return (
    <div className="App">
      <form onSubmit={(e)=> {
        e.preventDefault();
        registerUser()
      }}>
        <label for="email">Email<input type="text" name="email" value={email} onChange={e=> setEmail(e.target.value)}/></label>
        <label for="password">Password<input type="text" name="password" value={password} onChange={e=> setPassword(e.target.value)}/></label>
        <button type="submit">Post</button>
      </form>

      {user &&
        <>
        <h1>New User Created</h1>
        <h2>{user._id}</h2>
        <h2>{user.email}</h2>
        </>
      }
    </div>
  );
}

export default App;
