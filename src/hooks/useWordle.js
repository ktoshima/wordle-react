import { useState } from "react";

const useWordle = (solution) => {
	const [turn, setTurn] = useState(0);
	const [currentGuess, setCurrentGuess] = useState('');
	const [guesses, setGuesses] = useState([...Array(6)]); // each guess is an array
	const [history, setHistory] = useState([]); // each history is a string
	const [isCorrect, setIsCorrect] = useState(false);
	const [usedKeys, setUsedKeys] = useState({});


	const formatGuess = () => {
		let solutionArray = [...solution];
		let formattedGuess = [...currentGuess].map((letter) => {
			return {'key': letter, 'color': 'gray'}
		});
		formattedGuess.forEach((l, i) => {
			if (solutionArray[i] === l.key) {
				formattedGuess[i].color = 'green';
				solutionArray[i] = null;
			}
		})
		formattedGuess.forEach((l, i) => {
			if (solutionArray.includes(l.key) && l.color !== 'green') {
				formattedGuess[i].color = 'yellow';
				solutionArray[solutionArray.indexOf(l.key)] = null;
			}
		})
		return formattedGuess;
	};

	const addNewGuess = (formattedGuess) => {
		if (currentGuess === solution) {
			setIsCorrect(true);
		}
		setGuesses((prevGuesses) => {
			let newGuesses = [...prevGuesses];
			newGuesses[turn] = formattedGuess;
			return newGuesses;
		})
		setHistory((prevHistory) => {
			return [...prevHistory, currentGuess];
		})
		setTurn(prevTurn => prevTurn+1)
		setUsedKeys((prevUsedKeys) => {
			let newKeys = {...prevUsedKeys};
			formattedGuess.forEach((l) => {
				const currentColor = newKeys[l.key];
				if (l.color === 'green') {
					newKeys[l.key] = 'green';
				} else if (l.color === 'yellow' && currentColor !== 'green') {
					newKeys[l.key] = 'yellow';
				} else if (l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
					newKeys[l.key] = 'gray';
				}
				return;
			})
			return newKeys;
		})
		setCurrentGuess('');

	};

	const handleKeyup = ({key}) => {
		if (key === 'Enter') {
			if (turn > 5) {
				console.log('turn limit exceeded');
				return;
			}
			else if (currentGuess.length !== 5) {
				console.log('guess must be 5 letter long');
				return;
			}
			else {
				addNewGuess(formatGuess());
				return;
			}
		}
		if (key === 'Backspace') {
			setCurrentGuess((prev) => {
				return prev.slice(0, -1);
			});
			return;
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5)
				setCurrentGuess((prev) => {
					return prev + key;
				})
		}
		return;
	};

	return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup};

};

export default useWordle;
