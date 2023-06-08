const inquirer = require('inquirer');
const {Triangle, Square, Circle} = require('./lib/shapes.js')
const { writeFile } = require("fs/promises"); // Allows writeFile function to be a promise

// Questions required to create SVG
const questions = [
	{
		type: 'input',
		message: 'Enter up to 3 characters',
		validate: (text) =>
		text.length <= 3 || 'Must be 3 or less characters',
		name: 'text',
	},
	{
		type: 'input',
		message: 'What color do you want your text to be?',
		name: 'textColor',
	},
	{
		type: 'list',
		message: 'What shape would you like to use?',
		name: 'shape',
		choices: ['Circle','Triangle','Square']
	},
	{
		type: 'input',
		message: 'What color would you like you shape to be?',
		name: 'shapeColor',
	},
]


function init() {
// prompt begins the question and answer cycle for inquirer using the questions defined above
inquirer.prompt(questions)
// Takes in the answers from the prompts and uses them to set params for the SVG
.then(({ text, textColor, shape, shapeColor }) => {

	let svg;

	if (shape == 'Circle') {
		svg = new Circle;
		svg.setSVG(text, textColor, shapeColor);
	}
	else if (shape == 'Triangle') {
		svg = new Triangle;
		svg.setSVG(text, textColor, shapeColor);
	}
	else {
		svg = new Square;
		svg.setSVG(text, textColor, shapeColor);
	}
	// write SVG to file and return promise
	return writeFile('generatedLogo.svg', svg.render());
})
// Confirms the file was written in the console
.then(() => {
	console.log('Logo generated.')
})
};

init();