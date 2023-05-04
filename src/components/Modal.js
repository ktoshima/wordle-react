import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
	let modalText;
	switch (turn) {
		case 1:
			modalText = 'Genius';
			break;
		case 2:
			modalText = 'Magnificent';
			break;
		case 3:
			modalText = 'Impressive';
			break;
		case 4:
			modalText = 'Splendid';
			break;
		case 5:
			modalText = 'Great';
			break;
		case 6:
			modalText = 'Phew';
			break;
		default:
			break;
	}
	return (
		<div className='modal'>
			{isCorrect && (
				<div>
					<p>{ modalText }</p>
				</div>
			)}
			{!isCorrect && (
				<div>
					<p>{ solution }</p>
				</div>
			)}
		</div>

	)
}
