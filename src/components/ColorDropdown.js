import React, { useState, useEffect } from 'react';

function ColorDropdown(props) {
	const handleRecolor = e => {
		let newHex = e.target.value;
		props.recolor(newHex, recolor || props.color)
		setRecolor(newHex)
	}
	
	const [recolor, setRecolor] = useState(null);
	
	return (
		<>
			<div key={props.color} class="form-group">
				<label className="small form-text">Original</label>
				<input type="text" className="form-control-sm" name={props.color} value={props.color} style={{ borderColor: props.color }} disabled />
				
				<label className="small form-text">Recolor</label>
				<select className="form-control-sm recolor-list mt-0" name="recolor1" id="recolor1" onChange={handleRecolor} style={{ borderColor: recolor??'', color: recolor??'' }} >
					<option>- Recolor -</option>
					{props.colorList.map(c=>(
						<option key={c.name}  style={{ color: c.hex}} class="recolor-option" value={c.hex}>&#x275A; {c.friendlyName}</option>
					))}
				</select>
			</div>
		</>
	);
}

export default ColorDropdown;