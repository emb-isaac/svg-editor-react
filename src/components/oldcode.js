var colors =
		{
			"electricBlue": "#0097dc",
			"richBlue": "#0c2340",
			"purpleNavy": "#002f6c",
			"rubyRed": "#b21f59",
			"sapphireBlue": "#005eb8",
			"riverTeal": "#00a19d",
			"midnightGreen": "#0d5358",
			"carrotOrange": "#f4623a",
			"daisyYellow": "#fbaf34",
			"seaGreen": "#34b556",
			"skyBlue": "#50c0e8",
			"teaRose": "#f69785",
			"charcoalGrey": "#4a5363",
			"lightGrey": "#d0d3d4",
			"platinum": "#f4f5f6"
		}
		var schemes =
			[
				{
					"River Sky": {
						"primary": colors.riverTeal,
						"secondary": colors.skyBlue
					}
				},
				{
					"Daisy Carrot": {
						"primary": colors.daisyYellow,
						"secondary": colors.carrotOrange
					}
				}
				,
				{
					"Ruby Tea": {
						"primary": colors.rubyRed,
						"secondary": colors.teaRose
					}
				}
				,
				{
					"Sky Rich": {
						"primary": colors.skyBlue,
						"secondary": colors.richBlue
					}
				}
				,
				{
					"Carrot Sapphire": {
						"primary": colors.carrotOrange,
						"secondary": colors.sapphireBlue
					}
				}
				,
				{
					"Electric Sapphire": {
						"primary": colors.electricBlue,
						"secondary": colors.sapphireBlue
					}
				}
				,
				{
					"Daisy Sea": {
						"primary": colors.daisyYellow,
						"secondary": colors.seaGreen
					}
				}
				,
				{
					"River Midnight": {
						"primary": colors.riverTeal,
						"secondary": colors.midnightGreen
					}
				}
			]
		
			var elInputPrev = document.getElementById('inputPreview');
		var elOutputPrev = document.getElementById('outputPreview');

		addEventListener('DOMContentLoaded', (event) => {
			// setup toasts
			jQuery('.toast').toast({delay: 4000})
			// create schemes dropdown
			setupColorLists();
			
			// check for passed icon
			var params = new URLSearchParams(location.search);
			var iconPath = params.get('icon')
			
			if (iconPath != null){
				var elInputText = document.getElementById('svgInput');
				var decodedPath = decodeURIComponent(iconPath)
				fetch(iconPath)
			  .then(resp => resp.text())
				.then(iconData=>{
					console.log('loaded icon: ', iconData)
					elInputText.value = iconData
					drawInput(elInputText)
					var found = detectColors(elInputText)
					if (found != ''){
						updateDetecteds(found)
					}
					writeOutput(elInputText.value)
					jQuery('#toast-success').toast('show')
				})
				.catch((error) => {
   				console.error('Error loading icon:', error);
				 	jQuery('#toast-failure').toast('show')
  			})
			}
			
			// svg input listener
			var elInputText = document.getElementById('svgInput');
			elInputText.addEventListener('input', (event) => {
				drawInput(event.target)
				var found = detectColors(event.target)
				if (found != '')
					updateDetecteds(found)
				writeOutput(event.target.value)
			});
			
			// svg output copy listener
			document.getElementById('svgOutput').addEventListener("click", copyOutput);
			jQuery('#svgOutput').tooltip({
				'title': 'Copy text',
				'trigger': 'hover'
			})

		});


		function copyOutput() {
			var svgOutputEl = document.getElementById('svgOutput')
			svgOutputEl.select();
			document.execCommand("copy");
			jQuery('#svgOutput').attr('data-original-title', 'Copied!').tooltip('show');
			jQuery('#svgOutput').on('hidden.bs.tooltip', function(){
				svgOutputEl.dataset.originalTitle = 'Copy text'
			})
		}

		function drawOutput(value){
			let svgEl = document.getElementById('outputPreview')
			let svgCode = value
			svgEl.innerHTML = svgCode
			svgEl.style.border = '1px dotted #0097DC'
			svgEl.style.display = 'inline-flex'
		}
		function writeOutput(value){
			var elOutputText = document.getElementById('svgOutput');
			elOutputText.textContent = value;
			drawOutput(value);
		}
		function updateDetecteds(list) {
			var c1 = document.getElementById('color1')
			var c2 = document.getElementById('color2')
			var c3 = document.getElementById('color3')
			var r1 = document.getElementById('recolor1')
			var r2 = document.getElementById('recolor2')
			var r3 = document.getElementById('recolor3')
			var inputs = [c1, c2, c3]
			var recolors = [r1, r2, r3]
			
			// reset
			jQuery('input[type=text]').val('');
			jQuery('input[type=text]').attr('style','')
			jQuery('input[type=text]').attr('style','')
			jQuery('.recolor-list').prop('disabled',true).attr('style','').off('change')
			
			// update
			for (var i = 0; i < list.length && i < inputs.length; i++) {
				var detectedColor = list[i]
				inputs[i].value = detectedColor
				inputs[i].style.borderColor = detectedColor
				recolors[i].disabled = false
				recolors[i].dataset.current = detectedColor
				recolors[i].addEventListener('change', (e)=>{
					recolorOutput(e.target.dataset.current, e.target.value)
					e.target.dataset.current = e.target.value
					e.target.style.borderColor = e.target.value
				})
			}
		}
		function recolorOutput(oldHex, newHex){
			var elOutputText = document.getElementById('svgOutput');
			var oldVal = elOutputText.textContent;
			console.log('oldVal:', oldVal)
			var newVal = oldVal.replaceAll(oldHex, newHex);
			console.log('newVal:', newVal)
			elOutputText.textContent = newVal;
			drawOutput(newVal);
		}
		
		
		function detectColors(textarea) {
			var val = textarea.value;
			var foundColors = val.match(/#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}/g);
			// remove dupes
			if (foundColors != null){
				return foundColors.filter((m,i)=>{
	    			return foundColors.indexOf(m)==i;
				})
			} else {
				return '';
			}
		}

		function drawInput(textarea) {
			var val = textarea.value;

			// svg preview
			let svgEl = document.getElementById('inputPreview')
			let svgCode = val
			svgEl.innerHTML = svgCode
			svgEl.style.border = '1px dotted #0097DC'
			svgEl.style.display = 'inline-flex'
		}
		function setupColorLists() {
			var sl = document.getElementById('schemeList')
			
			for (var i = 0; i < schemes.length; i++) {
				var opt = schemes[i];
				var el = document.createElement("option");
				el.textContent = Object.keys(opt).toString();
				el.value = i;
				// disabled schemes for now
				el.disabled = true;
				//
				sl.appendChild(el);
			}
			
			var rec1 = document.getElementById('recolor1')
			var rec2 = document.getElementById('recolor2')
			var rec3 = document.getElementById('recolor3')
			
			for (var c in colors) {
				var el = document.createElement("option");
        
        // camelcase to plain text
        var textLabel = c;
				textLabel = textLabel.replace(/([A-Z])/g, ' $1')
       		.replace(/^./, function(str){ return str.toUpperCase(); });
				el.textContent = textLabel;
        
				el.value = colors[c];
				rec1.appendChild(el.cloneNode(true));
				rec2.appendChild(el.cloneNode(true));
				rec3.appendChild(el.cloneNode(true));
			}
		}