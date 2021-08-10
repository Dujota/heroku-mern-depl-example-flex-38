import {useState} from 'react';

import './App.css';

function App() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

async function registerUser(){
  const res = await fetch('/api/users/signup',  {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({email, password})
  })
  const user = await res.json()
  console.log(user);
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
    </div>
  );
}

export default App;
