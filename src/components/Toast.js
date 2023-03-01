
import { h } from 'preact';

export default function Toast() {
	return (
		<>
		<div class="toast fade hide" id="toast-success" role="alert" aria-live="assertive" aria-atomic="true">
			<div class="toast-header">
				<img src="/assets/images/svg-recolor-favicon-3.png" class="rounded mr-2" />
					<strong class="mr-auto">SVG Recolor</strong>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
			</div>
			<div class="toast-body">
				Icon successfully retrieved
			</div>
		</div>
		</>
	);
}



