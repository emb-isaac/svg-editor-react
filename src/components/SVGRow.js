function SVGRow(props) {
	
	function createMarkup() {
		return {__html: `${props.value}`}
	}
	return (
		<>
			<div class="col-10">
				<h3>{props.label}</h3>
				<textarea class="w-100" name="svgInput" rows="10" spellcheck="false" value={props.value} onInput={props.setValue} data-toggle={props.toggle} title={props.tooltip} />
			</div>
			<div class="col-2">
				<h3>Preview</h3>
				<div class="preview-box" dangerouslySetInnerHTML={createMarkup()} />
			</div>
		</>
	);
}

export default SVGRow;