
import { useState } from 'react'
import './App.css'

function App() {
  
  const [name, setName] = useState<string | undefined> ( undefined );

  const handleHello = (name: string| undefined) => {
    window.alert('Hello' + name)
    
    return 'Hello' + name
  }
  
 
  const onChange = (event:any ) => {
    setName(event.target.value);
  }

  return (
    <>
    <form action="" onSubmit={() => handleHello(name)}>
      <input type="text" onChange={onChange} />
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default App
