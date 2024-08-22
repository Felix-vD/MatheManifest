type ExerciseArray = number[][];


export function createExerciseUI(exerciseArray: ExerciseArray) {
    const container = document.getElementById('exercise-container');

    exerciseArray.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.innerHTML = `<strong>Aufgabe ${rowIndex + 1}:</strong>`;
        container?.appendChild(rowDiv);

        row.forEach((solution, colIndex) => {
            const inputDiv = document.createElement('div');
            inputDiv.innerHTML = `
                <label>${String.fromCharCode(97 + colIndex)})</label>
                <input type="text" id="input-${rowIndex}-${colIndex}">
                <button onclick="checkSolution(${rowIndex}, ${colIndex}, ${solution})">Check Solution</button>
            `;
            container?.appendChild(inputDiv);
        });
    });
}

export function checkSolution(rowIndex: number, colIndex: number, correctSolution: number) {
    const inputElement = <HTMLInputElement>document.getElementById(`input-${rowIndex}-${colIndex}`);
    const userInput = parseInt(inputElement.value, 10);

    if (userInput === correctSolution) {
        alert(`Correct solution for Aufgabe ${rowIndex + 1}, part ${String.fromCharCode(97 + colIndex)}`);
    } else {
        alert(`Incorrect solution for Aufgabe ${rowIndex + 1}, part ${String.fromCharCode(97 + colIndex)}`);
    }
}

export function submitAll(exerciseArray: ExerciseArray) {
    let allCorrect = true;
    exerciseArray.forEach((row, rowIndex) => {
        row.forEach((solution, colIndex) => {
            const inputElement = <HTMLInputElement>document.getElementById(`input-${rowIndex}-${colIndex}`);
            const userInput = parseInt(inputElement.value, 10);

            if (userInput !== solution) {
                allCorrect = false;
                alert(`Incorrect solution for Aufgabe ${rowIndex + 1}, part ${String.fromCharCode(97 + colIndex)}`);
            }
        });
    });

    if (allCorrect) {
        alert("All solutions are correct! Final submission successful.");
    } else {
        alert("Some solutions are incorrect. Please check again.");
    }
}


