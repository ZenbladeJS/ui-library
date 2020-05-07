window.GUI = function () {
	const gui = class {
		constructor(settings = {}) {
			let visible = settings.visible || false;
			let windowColor = settings.windowColor || "#444444";
			let tabColor = settings.tabColor || "#000000";
			let tabLabelColor = settings.tabLabelColor || "#ffffff";
			let textColor = settings.textColor || "#ffffff";
			let interactiveColor = settings.interactiveColor || "#000000";
			let interactiveSecondaryColor = settings.interactiveSecondaryColor || "#999999";
			
			let guiElement = document.createElement("DIV");
			document.body.appendChild(guiElement);
			guiElement.style.zIndex = "2147483647";
			guiElement.style.userSelect = "none";
			guiElement.style.position = "relative";
			guiElement.style.display = visible ? "block" : "none";
			let windowCount = 0;
			let toggleGuiReset = true;
			addEventListener("keydown", function (e) {
				if (e.code === "ShiftRight" && toggleGuiReset) {
					visible = !visible;
					
					if (visible) {
						guiElement.style.display = "block";
					} else {
						guiElement.style.display = "none";
					}
					
					toggleGuiReset = false;
				}
			});
			addEventListener("keyup", function (e) {
				if (e.code === "ShiftRight") {
					toggleGuiReset = true;
				}
			});
			let keybindActivateable = true;
			const getTextHeight = function (element) {
				guiElement.style.display = "block";
				let height = element.getBoundingClientRect().height;
				guiElement.style.display = visible ? "block" : "none";
				return height;
			};
			this.createWindow = function () {
				let windowEl = document.createElement("DIV");
				let height = 45;
				const Window = class {
					constructor(settings = {}) {
						let text = settings.text;
						
						guiElement.appendChild(windowEl);
						windowEl.style.display = "block";
						windowEl.style.position = "fixed";
						windowEl.style.left = 20 + (windowCount * 250) + "px";
						windowEl.style.top = "20px";
						windowEl.style.width = "230px";
						windowEl.style.height = "40px";
						windowEl.style.borderRadius = "5px";
						windowEl.style.backgroundColor = windowColor || "#444444";
						windowEl.style.overflow = "hidden";
						windowEl.addEventListener("mousedown", function (e) {
							e.stopPropagation();
						});
						let closed = false;
						setTimeout(function () {
							windowEl.style.transition = "height 0.20s linear";
							if (!closed) {
								//can scroll
							}
						});
		
						let tab = document.createElement("DIV");
						windowEl.appendChild(tab);
						tab.style.display = "block";
						tab.style.position = "absolute";
						tab.style.left = "0px";
						tab.style.top = "0px";
						tab.style.width = "230px";
						tab.style.height = "40px";
						tab.style.borderTopLeftRadius = "5px";
						tab.style.borderTopRightRadius = "5px";
						tab.style.backgroundColor = tabColor;
						let tabSelected = false;
						let tabClickedPos = {
							x: null,
							y: null
						};
						tab.addEventListener("mousedown", function (e) {
							if (e.button === 0) {
								let pos = windowEl.getBoundingClientRect();
								tabSelected = true;
								tabClickedPos.x = e.clientX - pos.left;
								tabClickedPos.y = e.clientY - pos.top;
							}
							if (e.button === 2) {
								closed = !closed;
								if (closed) {
									//cant scroll
									windowEl.style.height = "40px";
								} else {
									windowEl.style.height = (height === 45 ? 35 : height) + 5 + "px";
									setTimeout(function () {
										if (!closed) {
											//can scroll
										}
									}, 250);
								}
							}
						});
						tab.addEventListener('contextmenu', (e)=>e.preventDefault());
						addEventListener("mousemove", function (e) {
							let pos = windowEl.getBoundingClientRect();
							if (tabSelected) {
								let diffX = e.clientX - pos.x;
								let diffY = e.clientY - pos.y;
								windowEl.style.left = parseInt(windowEl.style.left) + diffX - tabClickedPos.x + "px";
								windowEl.style.top = parseInt(windowEl.style.top) + diffY - tabClickedPos.y + "px";
								
							}
						});
						addEventListener("mouseup", function (e) {
							tabSelected = false;
						});
		
						let label = document.createElement("p");
						tab.appendChild(label);
						label.style.display = "block";
						label.style.margin = "0px";
						label.style.position = "absolute";
						label.style.left = "50%";
						label.style.top = "50%";
						label.style.transform = "translate(-50%, -50%)";
						label.style.fontSize = "20px";
						label.style.fontFamily = "sans-serif";
						label.style.fontWeight = "bold";
						label.style.color = tabLabelColor;
						label.innerText = text || "";
		
		
						windowCount++;
					}
					createLabel(settings = {}) {
						let text = settings.text || "";
						let align = settings.align || "center";
						let bold = settings.bold || true;
						let underline = settings.underline || false;
		
						let label = document.createElement("P");
						windowEl.appendChild(label);
						label.innerText = text || "";
						label.style.display = "block";
						label.style.margin = "0px";
						label.style.position = "absolute";
						if (align === "left") {
							label.style.left = "10px";
						} else if (align === "center") {
							label.style.left = "50%";
							label.style.transform = "translate(-50%, 0%)";
						} else if (align === "right") {
							label.style.right = "10px";
						}
						label.style.fontSize = "12px";
						label.style.fontFamily = "sans-serif";
						label.style.fontWeight = bold ? "bold" : "normal";
						label.style.textDecoration = underline ? "underline" : "none";
						label.style.top = height + ((30 - getTextHeight(label)) / 2) + "px";
						label.style.color = textColor;
		
						height += 30;
						windowEl.style.height = height + 5 + "px";
						const Label = class {
							get text() {
								return label.innerText;
							}
							set text(text) {
								label.innerText = text;
							}
							get bold() {
								return label.style.fontWeight === "bold" ? true : false;
							}
							set bold(bool) {
								if (bool) {
									label.style.fontWeight = bool ? "bold" : "normal";
								}
							}
							get underline() {
								return label.style.textDecoration === "underline" ? true : false;
							}
							set underline(bool) {
								if (bool) {
									label.style.textDecoration = bool ? "underline" : "none";
								}
							}
							get align() {
								return align;
							}
							set align(align) {
								if (align === "left") {
									label.style.left = "10px";
								} else if (align === "center") {
									label.style.left = "50%";
									label.style.transform = "translate(-50%, 0%)";
								} else if (align === "right") {
									label.style.right = "10px";
								}
							}
						};
						return new Label();
					}
					createButton(settings = {}) {
						let text = settings.text || "";
						let onclick = settings.onclick || function() {};
		
		
						let button = document.createElement("BUTTON");
						windowEl.appendChild(button);
						button.innerText = text;
						let timeouts = [];
						let timePassed = false;
						let mouseLeft = true;
						let mouseUp = true;
						button.addEventListener("mousedown", function(e) {
							if (e.button === 0) {
								mouseLeft = false;
								mouseUp = false;
								onclick();
								button.style.backgroundColor = interactiveSecondaryColor;
								let i;
								for (i = 0; i < timeouts.length; i++) {
									clearTimeout(timeouts[i]);
									timeouts = [];
								}
								timePassed = false;
								timeouts.push(setTimeout(function () {
									timePassed = true;
								}, 100));
							}
						}); //done this way so onclick can be changed but not through the element
						button.addEventListener("mouseleave", function () {
							mouseLeft = true;
							if (!mouseUp) {
								let i;
								timeouts.push(setTimeout(function () {
									button.style.backgroundColor = interactiveColor;
								}, timePassed ? 0 : 100));
							}
						});
						addEventListener("mouseup", function() {
							mouseUp = true;
							if (!mouseLeft) {
								let i;
								timeouts.push(setTimeout(function () {
									button.style.backgroundColor = interactiveColor;
								}, timePassed ? 0 : 100));
							}
						});
						button.style.position = "absolute";
						button.style.left = "8px";
						button.style.top = height + 3 + "px";
						button.style.width = "214px";
						button.style.height = "24px";
						button.style.backgroundColor = interactiveColor;
						button.style.borderStyle = "none";
						button.style.borderRadius = "5px";
						button.style.borderColor = "#ffffff";
						button.style.textAlign = "center";
						button.style.fontFamily = "sans-serif";
						button.style.fontWeight = "bold";
						button.style.fontSize = "12px";
						button.style.outline = "none";
						button.style.color = textColor;
						button.style.cursor = "pointer";
						//button.style.transition = "background-color 0.2s ease-in-out";
		
						height += 30;
						windowEl.style.height = height + 5 + "px";
		
						const Button = class {
							get text() {
								return button.innerText;
							}
							set text(text) {
								button.innerText = text;
							}
							get onclick() {
								return onclick;
							}
							set onclick(event) {
								onclick = event;
							}
						};
						return new Button();
					}
					createInput(settings = {}) {
						let placeholder = settings.placeholder || "";
						let value = settings.value || "";
						let onchange = settings.onchange || function() {};
		
						let container = document.createElement("DIV");
						windowEl.appendChild(container);
						container.style.position = "absolute";
						container.style.left = "8px";
						container.style.top = height + 3 + "px";
						container.style.width = "214px";
						container.style.height = "24px";
						container.style.backgroundColor = interactiveColor;
						container.style.borderStyle = "none";
						container.style.borderRadius = "5px";
						container.style.overflow = "hidden";

						let input = document.createElement("INPUT");
						container.appendChild(input);
						input.value = value;
						input.placeholder = placeholder;
						input.addEventListener("keydown", function() {
							setTimeout(function() {
								if (value !== input.value) {
									onchange(input.value);
									value = input.value;
								}
							});
						});
						input.style.position = "absolute";
						input.style.left = "0px";//"8px";
						input.style.top = "0px";//height + 3 + "px";
						input.style.width = "214px";
						input.style.height = "24px";
						input.style.padding = "0px";
						input.style.backgroundColor = interactiveColor;
						input.style.borderStyle = "none";
						input.style.borderColor = "#ffffff";
						input.style.borderRadius = "5px";
						input.style.textAlign = "center";
						input.style.fontFamily = "sans-serif";
						input.style.fontSize = "12px";
						input.style.outline = "none";
						input.style.color = textColor;
		
		
						let line = document.createElement("div");
						container.appendChild(line);
						line.style.display = "block";
						line.style.position = "absolute";
						line.style.left = "0px";
						line.style.top = "22px";
						line.style.width = "0px";
						line.style.height = "2px";
						line.style.transition = "width 0.75s ease-in-out";
						line.style.backgroundColor = textColor;
						input.addEventListener("focus", function() {
							line.style.width = "214px";
							keybindActivateable = false;
						});
						input.addEventListener("focusout", function() {
							line.style.width = "0px";
							keybindActivateable = true;
						});
		
		
						height += 32;
						windowEl.style.height = height + 5 + "px";
		
						const Input = class {
							get placeholder() {
								return input.placeholder;
							}
							set placeholder(placeholder) {
								input.placeholder = placeholder;
							}
							get value() {
								return input.value;
							}
							set value(value) {
								input.value = value;
								onchange(value);
							}
							get onchange() {
								return onchange;
							}
							set onchange(event) {
								onchange = event;
							}
						};
						return new Input();
					}
					createToggle(settings = {}) {
						let toggled = settings.toggled || false;
						let text = settings.text || "";
						let onchange = settings.onchange;
		
						let label = document.createElement("P");
						windowEl.appendChild(label);
						label.innerText = text || "";
						label.style.display = "block";
						label.style.margin = "0px";
						label.style.position = "absolute";
						label.style.left = "10px";
						label.style.fontSize = "12px";
						label.style.fontFamily = "sans-serif";
						label.style.top = height + ((30 - getTextHeight(label)) / 2) + "px";
						label.style.color = textColor;
		
						let button = document.createElement("BUTTON");
						windowEl.appendChild(button);
						button.style.position = "absolute";
						button.style.right = "8px";
						button.style.top = height + 3 + "px";
						button.style.width = "24px";
						button.style.height = "24px";
						button.style.backgroundColor = interactiveColor;
						button.style.borderStyle = "none";
						button.style.borderRadius = "5px";
						button.style.textAlign = "center";
						button.style.fontSize = "12px";
						button.style.fontFamily = "sans-serif";
						button.style.outline = "none";
						button.style.color = textColor;
						button.style.fontWeight = "bold";
						button.innerText = "\u2713";
						button.style.cursor = "pointer";
		
						let cover = document.createElement("div");
						windowEl.appendChild(cover);
						cover.style.display = "block";
						cover.style.position = "absolute";
						cover.style.right = "8px";
						cover.style.top = height + 6 + "px";
						cover.style.width = toggled ? "0px" : "24px";
						cover.style.height = "18px";
						cover.style.transition = "width 0.75s ease-in-out";
						cover.style.borderRadius = "5px";
						cover.style.backgroundColor = interactiveColor;
		
						button.addEventListener("click", function() {
							toggled = !toggled;
							cover.style.width = toggled ? "0px" : "24px";
							onchange(toggled);
						});
						cover.addEventListener("click", function() {
							toggled = !toggled;
							cover.style.width = toggled ? "0px" : "24px";
							onchange(toggled);
						});
		
		
						height += 30;
						windowEl.style.height = height + 5 + "px";
		
						const Toggle = class {
							get text() {
								return label.innerText;
							}
							set text(value) {
								label.innerText = value;
							}
							get toggled() {
								return toggled;
							}
							set toggled(bool) {
								if (toggled !== bool) {
									onchange(toggled);
								}
								toggled = bool;
								cover.style.width = toggled ? "0px" : "24px";
							}
							get onchange() {
								return onchange;
							}
							set onchange(event) {
								onchange = event;
							}
						};
						return new Toggle();
					}
					createKeybind(settings = {}) {
						let text = settings.text || "";
						let keybind = settings.keybind || "none";
						let onchange = settings.onchange || function() {};
						let onactivate = settings.onactivate || function() {};
						const displayBind = function (keybind) {
							let displayKey = keybind.charAt(0).toUpperCase() + keybind.slice(1);
							if (displayKey === "Control") {
								displayKey = "Ctrl";
							} else if (displayKey === " ") {
								displayKey = "Space";
							} else if (displayKey === "Escape") {
								displayKey = "Esc";
							} else if (displayKey === "Backspace") {
								displayKey = "BKSP";
							} else if (displayKey.startsWith("Arrow")) {
								displayKey = displayKey.slice(5);
							}
							return displayKey;
						};
		
						let label = document.createElement("P");
						windowEl.appendChild(label);
						label.innerText = text || "";
						label.style.display = "block";
						label.style.margin = "0px";
						label.style.position = "absolute";
						label.style.left = "10px";
						label.style.fontSize = "12px";
						label.style.fontFamily = "sans-serif";
						label.style.top = height + ((30 - getTextHeight(label)) / 2) + "px";
						label.style.color = textColor;
		
						let button = document.createElement("BUTTON");
						windowEl.appendChild(button);
						button.style.position = "absolute";
						button.style.right = "8px";
						button.style.top = height + 3 + "px";
						button.style.width = "45px";
						button.style.height = "24px";
						button.style.backgroundColor = interactiveColor;
						button.style.borderStyle = "none";
						button.style.borderRadius = "5px";
						button.style.textAlign = "center";
						button.style.fontSize = "12px";
						button.style.fontFamily = "sans-serif";
						button.style.outline = "none";
						button.style.color = textColor;
						button.style.fontWeight = "bold";
						button.innerText = displayBind(keybind);
						button.style.cursor = "pointer";
		
						button.addEventListener("click", function() {
							keybindActivateable = false;
							if (keybind !== "none") {
								onchange("none");
							}
							keybind = "none";
						});
		
		
		
						button.addEventListener("keydown", function(e) {
							e.preventDefault();
							if (e.key !== keybind) {
								onchange(e.key);
							}
							button.innerText = displayBind(e.key);
							keybind = e.key;
							button.blur();
							setTimeout(function() {
								keybindActivateable = true;
							});
						});
						button.addEventListener("focus", function () {
							button.innerText = "...";
						});
						button.addEventListener("focusout", function () {
							button.innerText = displayBind(keybind);
						});
						let reset = true;
						addEventListener("keydown", function(e) {
							if (e.key === keybind && keybindActivateable && reset) {
								onactivate();
								reset = false;
							}
						});
						addEventListener("keyup", function(e) {
							if (e.key === keybind) {
								reset = true;
							}
						});
		
						height += 30;
						windowEl.style.height = height + 5 + "px";
		
						const Keybind = class {
							get text() {
								return label.innerText;
							}
							set text(value) {
								label.innerText = value;
							}
							get keybind() {
								return keybind;
							}
							set keybind(key) {
								let displayKey = key.charAt(0).toUpperCase() + key.slice(1);
								if (displayKey === "Control") {
									displayKey = "Ctrl";
								} else if (displayKey === " ") {
									displayKey = "Space";
								} else if (displayKey === "Escape") {
									displayKey = "Esc";
								} else if (displayKey === "Backspace") {
									displayKey = "BKSP";
								} else if (displayKey.startsWith("Arrow")) {
									displayKey = displayKey.slice(5);
								} else if (displayKey === "None") {
									displayKey = "...";
								}
								button.innerText = displayKey;
								keybind = key;
								onchange(key);
							}
							get onchange() {
								return onchange;
							}
							set onchange(event) {
								onchange = event;
							}
							get onactivate() {
								return onactivate;
							}
							set onactivate(event) {
								onactivate = event;
							}
						};
						return new Keybind();
					}
					createSlider(settings = {}) {
						let text = settings.text || "";
						let min = settings.min === undefined ? 0 : settings.min;
						let max = settings.min === undefined ? 100 : settings.max;
						let value = settings.value === undefined ? min : settings.value;
						if (value < min) {
							value = min;
						} else if (value > max) {
							value = max;
						} else {
							value = value;
						}
						let onchange = settings.onchange || function() {};
		
						var getTextWidth = function(text, exampleElement) {
							let p = document.createElement("p");
							document.body.append(p);
							p.innerText = text;
							p.style.position = "absolute";
							p.style.fontSize = getComputedStyle(exampleElement).fontSize;
							p.style.fontFamily = getComputedStyle(exampleElement).fontFamily;
							p.style.fontWeight = getComputedStyle(exampleElement).fontWeight;
							p.style.height = "auto";
							p.style.width = "auto";
							p.style.whiteSpace = "nowrap";
							p.style.visiblity = "none";
							const width = p.clientWidth;
							p.remove();
							return width;
						};
		
						let label = document.createElement("P");
						windowEl.appendChild(label);
						label.innerText = text || "";
						label.style.display = "block";
						label.style.margin = "0px";
						label.style.position = "absolute";
						label.style.left = "10px";
						label.style.fontSize = "12px";
						label.style.fontFamily = "sans-serif";
						label.style.top = height + ((30 - getTextHeight(label)) / 2) + "px";
						label.style.color = textColor;
						label.style.opacity = 1;
						label.style.transition = "opacity 0.25s ease-in-out";
		
						let heighestWidth = [
							getTextWidth(min + "", label),
							getTextWidth(max + "", label),
							getTextWidth(label.innerText, label)
						].sort(function(a, b) {
							return b - a;
						})[0];
		
						let bar = document.createElement("div");
						windowEl.appendChild(bar);
						bar.style.display = "block";
						bar.style.position = "absolute";
						bar.style.right = "5px";
						bar.style.top = height + 14 + "px";
						bar.style.width = 200 - heighestWidth + "px";
						bar.style.height = "5px";
						bar.style.borderRadius = "2.5px";
						bar.style.backgroundColor = interactiveColor;
						bar.style.cursor = "pointer";
						
						let coverbar = document.createElement("div");
						windowEl.appendChild(coverbar);
						coverbar.style.display = "block";
						coverbar.style.position = "absolute";
						coverbar.style.left = 230 - (205 - heighestWidth) + "px";
						coverbar.style.top = height + 14 + "px";
						coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
						coverbar.style.height = "5px";
						coverbar.style.borderTopLeftRadius = "2.5px";
						coverbar.style.borderBottomLeftRadius = "2.5px";
						coverbar.style.backgroundColor = interactiveSecondaryColor;
						coverbar.style.cursor = "pointer";
		
						let slide = document.createElement("div");
						windowEl.appendChild(slide);
						slide.style.display = "block";
						slide.style.position = "absolute";
						slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
						slide.style.top = height + 9 + "px";
						slide.style.width = "4px";
						slide.style.height = "15px";
						slide.style.backgroundColor = interactiveColor;
						slide.style.userSelect = "auto";
						slide.style.cursor = "pointer";
						
		
						let slidePos = slide.getBoundingClientRect();
						let slideSelected = false;
						let oldValue = value;
						const update = function (e) {
							slidePos = slide.getBoundingClientRect();
							if (slideSelected) {
								let diff = e.clientX - slidePos.left;
								if (parseInt(slide.style.right) - diff + 2 > 201 - heighestWidth) {
									slide.style.right = 201 - heighestWidth + "px";
								} else if (parseInt(slide.style.right) - diff + 2 < 5) {
									slide.style.right = "5px";
								} else {
									slide.style.right = parseInt(slide.style.right) - diff + 2 + "px";
								}
								
								if (value !== -(parseInt(slide.style.right) - 201 + heighestWidth) * (max - min) / (201 - heighestWidth - 5)) {
									value = -(parseInt(slide.style.right) - 201 + heighestWidth) * (max - min) / (201 - heighestWidth - 5) + min;
									if (label.innerText !== text) {
										label.innerText = Math.floor(value);
									}
								}
								coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
								
							}
						};
						slide.addEventListener("mousedown", function(e) {
							if (e.button === 0) {
								if (!slideSelected) {
									oldValue = value;
									setTimeout(function () {
										label.style.opacity = 1;
										if (slideSelected) {
											label.innerText = Math.floor(value);
										} else {
											label.innerText = text;
										} 
									}, 250);
								}
								slideSelected = true;
								update(e);
								label.style.opacity = 0;
							}
						});
						bar.addEventListener("mousedown", function(e) {
							if (e.button === 0) {
								if (!slideSelected) {
									oldValue = value;
									setTimeout(function () {
										label.style.opacity = 1;
										if (slideSelected) {
											label.innerText = Math.floor(value);
										} else {
											label.innerText = text;
										} 
									}, 250);
								}
								slideSelected = true;
								update(e);
								label.style.opacity = 0;
							}
						});
						coverbar.addEventListener("mousedown", function(e) {
							if (e.button === 0) {
								if (!slideSelected) {
									oldValue = value;
									setTimeout(function () {
										label.style.opacity = 1;
										if (slideSelected) {
											label.innerText = Math.floor(value);
										} else {
											label.innerText = text;
										} 
									}, 250);
								}
								slideSelected = true;
								update(e);
								label.style.opacity = 0;
							}
						});
						addEventListener("mousemove", function(e) {
							slidePos = slide.getBoundingClientRect();
							update(e);
						});
						addEventListener("mouseup", function(e) {
							if (slideSelected) {
								slideSelected = false;
								label.style.opacity = 0;
								setTimeout(function () {
									label.style.opacity = 1;
									if (!slideSelected) {
										label.innerText = text;
									} else {
										label.innerText = Math.floor(value);
									} 
								}, 250);
								if(value !== oldValue) {
									onchange(value);
									oldValue = value;
								}
							}
						});
		
		
						height += 30;
						windowEl.style.height = height + 5 + "px";
		
						const Slider = class {
							get text() {
								return label.innerText;
							}
							set text(x) {
								if (text === label.innerText) {
									label.innerText = x;
								}
								text = x;
								heighestWidth = [
									getTextWidth(min + "", label),
									getTextWidth(max + "", label),
									getTextWidth(x, label)
								].sort(function(a, b) {
									return b - a;
								})[0];
								bar.style.width = 200 - heighestWidth + "px";
								coverbar.style.width = (201 - heighestWidth) - (-(value * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
								coverbar.style.left = 230 - (205 - heighestWidth) + "px";
								slide.style.right = -(value * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
							}
							get min() {
								return min;
							}
							set min(x) {
								let oldValue = value;
								if (min > max) {
									min = max;
									max = x;
								} else {
									min = x;
								}
								if (value < min) {
									value = min;
								}
								heighestWidth = [
									getTextWidth(min + "", label),
									getTextWidth(max + "", label),
									getTextWidth(text, label)
								].sort(function(a, b) {
									return b - a;
								})[0];
								bar.style.width = 200 - heighestWidth + "px";
								coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
								coverbar.style.left = 230 - (205 - heighestWidth) + "px";
								slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
								if (oldValue !== value) {
									onchange(value);
								}
							}
							get max() {
								return max;
							}
							set max(x) {
								let oldValue = value;
								if (max < min) {
									max = min;
									min = x;
								} else {
									max = x;
								}
								if (value > max) {
									value = max;
								}
								heighestWidth = [
									getTextWidth(min + "", label),
									getTextWidth(max + "", label),
									getTextWidth(text, label)
								].sort(function(a, b) {
									return b - a;
								})[0];
								bar.style.width = 200 - heighestWidth + "px";
								coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
								coverbar.style.left = 230 - (205 - heighestWidth)  + "px";
								slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
								if (oldValue !== value) {
									onchange(value);
								}
							}
							get value() {
								return value;
							}
							set value(x) {
								let oldValue = value;
								if (x < min) {
									value = min;
									coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
									slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
								} else if (x > max) {
									value = max;
									coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
									slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
								} else {
									value = x;
									coverbar.style.width = (201 - heighestWidth) - (-((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth) + "px";
									slide.style.right = -((value - min) * (201 - heighestWidth - 5) / (max - min)) + 201 - heighestWidth + "px";
								}
								if (oldValue !== value) {
									onchange(value);
								}
								
							}
							get onchange() {
								return onchange;
							}
							set onchange(event) {
								onchange = event;
							}
						};
						return new Slider();
					}
					createDropdown(settings = {}) {
						let options = settings.options || [""];
						if (options.length === 0) {
							options[0] = [""];
						}
						let value = options.includes(settings.value) ? settings.value : options[0];
						let onchange = settings.onchange || function () {};
						let open = false;
						
						let button = document.createElement("BUTTON");
						windowEl.append(button);
						button.innerText = value;
						button.style.position = "absolute";
						button.style.left = "8px";
						button.style.top = height + 3 + "px";
						button.style.width = "214px";
						button.style.height = "24px";
						button.style.backgroundColor = interactiveColor;
						button.style.borderStyle = "none";
						button.style.borderColor = "#ffffff";
						button.style.textAlign = "left";
						button.style.fontFamily = "sans-serif";
						button.style.fontWeight = "bold";
						button.style.fontSize = "12px";
						button.style.outline = "none";
						button.style.color = textColor;
						button.style.cursor = "pointer";
						
						let which = document.createElement("P");
						windowEl.append(which);
						which.style.position = "absolute";
						which.style.right = "16px";
						which.style.textAlign = "right";
						which.style.fontFamily = "sans-serif";
						which.style.fontWeight = "bold";
						which.style.fontSize = "15px";
						which.style.top = height + ((30 - getTextHeight(which)) / 2) - 24 + "px";
						which.style.color = textColor;
						which.style.cursor = "pointer";
						which.style.transform = "rotate(-90deg)";
						which.style.transition = "transform 0.1s linear";
						which.innerText = "v";
						
						const eventmousedown = function (e) {
							if (e.button === 0) {
								open = !open;
								if (open) {
									which.style.transform = "rotate(0deg)";
								} else {
									which.style.transform = "rotate(-90deg)";
								}
							}
						};
						button.addEventListener("mousedown", eventmousedown);
						which.addEventListener("mousedown", eventmousedown);
						
						height += 30;
						windowEl.style.height = height + 5 + "px";
						const Dropdown = class {
							get options () {
								if (options + "" === [""] + "") {
									return [];
								} else {
									return options;
								}
							}
							set options (array) {
								
							}
							get onchange () {
								
							}
							set onchange (event) {
								
							}
						};
						return new Dropdown();
					}
					createBreak(settings = {}) {
						let breakDiv = document.createElement("div");
						windowEl.appendChild(breakDiv);
						breakDiv.style.display = "block";
						breakDiv.style.position = "absolute";
						breakDiv.style.left = "10px";
						breakDiv.style.top = height + 9 + "px";
						breakDiv.style.width = "210px";
						breakDiv.style.height = "4px";
						breakDiv.style.borderRadius = "2px";
						breakDiv.style.backgroundColor = textColor;
						
						height += 20;
						windowEl.style.height = height + 5 + "px";
					}
				};
				return new Window(...arguments, windowEl);
			};
		}
	};
	return new gui(...arguments);
};
/*
--API--
	
 - Creating GUI 
GUI({
	visible: true
	windowColor: "#444444";
	tabColor: "#000000";
	tabLabelColor: "#ffffff";
	textColor: "#ffffff";
	interactiveColor: "#000000";
	interactiveSecondaryColor: "#999999";
	
});
//returns GUI_VARIABLE

 - Create Window
GUI_VARIABLE.createWindow({
	text: "Tab Text"
});
//returns WINDOW_VARIABLE


 - Create Toggle
WINDOW_VARIABLE.createToggle({
	text: "Toggle",
	toggled: true,
	onchange: function(bool) {
		//on boolean change code here
	}
	
});
//returns toggle variable

- Create Slider
WINDOW_VARIABLE.createSlider({
	text: "Slider",
	min: -50,
	max: 50,
	value: 0,
	onchange: function (value) {
		//on value change code here
	}
});
//returns slider variable

WINDOW_VARIABLE.createInput({
	value: "",
	placeholder: "Input",
	onchange: function(text) {
		//on text change code here
	}
});
//returns input variable

WINDOW_VARIABLE.createButton({
	text: "Button",
	onclick: function() {
		//on click change code here
	}
});
//returns button variable

WINDOW_VARIABLE.createKeybind({
	text: "Keybind",
	keybind: "none",
	onactivate: function() {
		//on keybind activated code here
	},
	onchange: function(key) {
		//on keybind change code here
	}
});
//returns keybind variable

WINDOW_VARIABLE.createDropdown({
	default: "Option1"
	options: [
		"Option1",
		"Option2",
		   ...
	]
})

WINDOW_VARIABLE.createLabel({
	text: "Label",
	align: "center"//options include: "left", "center", and "right"
	bold: true,
	underline: false
});
//returns label variable

WINDOW_VARIABLE.createBreak({
	
});
//returns undefined

*/
