function OptionBar() {
	return (
		<div class="col-12 my-4 text-center">
			<div class="btn-group mx-auto" role="group">
				<button className="badge btn btn-sm btn-outline-primary"><i class="fa fa-cloud-download" aria-hidden="true"></i> Save as file</button>
				<button className="badge btn btn-sm  btn-outline-secondary"><i class="fa fa-clipboard" aria-hidden="true"></i> Copy to clipboard</button>
				<button className="badge btn btn-sm  btn-outline-danger"><i class="fa fa-undo" aria-hidden="true"></i> Reset colors</button>
			</div>
		</div>
	);
}

export default OptionBar;