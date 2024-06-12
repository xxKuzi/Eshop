import React from 'react'


export default function Slider(props) {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div>
      <label className='switch'>
        <input checked = {JSON.parse(localStorage.getItem("darkMode"))} type="checkbox" onChange={props.onChange}/>        
        <span className="slider" />  
      </label>  
    </div>
  )
}
