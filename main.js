console.log("You look marvelous!");

//story
// It had been a hard, {adjective} day on the {silly word} trail. The cowboys drove a herd of {plural noun} across the dry plains, kicking up {noun} along the way as they looked for somewhere to bed down.

const mainElement = document.querySelector("main");

mainElement.addEventListener("click", event => {
	if(event.target.id.startsWith("tellStory")){
		const adjective = mainElement.querySelector(".adjective").value
		const sillyword = mainElement.querySelector(".sillyword").value
		const pluralnoun = mainElement.querySelector(".pluralnoun").value
		const noun = mainElement.querySelector(".noun").value
		const madlib = {
			adjective:adjective,
			sillyword:sillyword,
			pluralnoun:pluralnoun,
			noun:noun
		}
		//set/save to sessionStorage
		setDataToStorage(madlib)
		//invoke renderStory
		renderStory();
	}
})

const getDataFromStorage = (dataKey) => {
	//use JSON.parse()
	const madlib =sessionStorage.getItem(dataKey)
	return madlib;
}

const setDataToStorage = (dataObj) => {
		sessionStorage.setItem("madlib", JSON.stringify(dataObj));
};

const clearStorage = (dataKey) => {
	sessionStorage.removeItem(dataKey);
}

const renderInputs = () => {
	clearStorage('madlib')
	// show inputs fields
	mainElement.innerHTML = 
	`<div>
	<div>An Adjective</div>
	<input type="text" class="adjective" name="adjective"/>
	<div>A Silly Word</div>
	<input type="text" class="sillyword" />
	<div>A Plural Noun</div>
	<input type="text" class="pluralnoun" />
	<div>A Noun</div>
	<input type="text" class="noun" />
	<div>
	<button type="button" name="tellStory" id="tellStory">Tell Story</button>
	</div>
	</div>
	`
	//show 'Tell Story' button

}

const renderStory = () => {
	//get from sessionStorage
	const madlibStorage = getDataFromStorage('madlib')
	const madlib = JSON.parse(madlibStorage)
	//show the story
	mainElement.innerHTML = `<p>It had been a hard, ${madlib.adjective} day on the ${madlib.sillyword} trail. The cowboys drove a herd of ${madlib.pluralnoun} across the dry plains, kicking up ${madlib.noun} along the way as they looked for somewhere to bed down.</p>`
	//show startOver button
	mainElement.innerHTML += `<button type="button" id="startOver">Start Over</button>`
	//startOver will invoke renderInputs()
	mainElement.addEventListener("click", event => {
		if(event.target.id.startsWith("startOver")){
			clearStorage();
			renderInputs();
		}
})
}

renderInputs();
