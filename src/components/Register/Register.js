import React from 'react';
import styles from './Register.module.css'; // Adjust the path as necessary
import { db } from '../../firebase-config'; // Adjust the path to your Firebase config
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Capture the value from each input field
        const name = event.target.name.value;
        const topicId = event.target.topicId.value;
        const chapterId = event.target.chapterId.value;
        const subchapterId = event.target.subchapterId.value;
        const exerciseId = event.target.exerciseId.value;
        const solution = event.target.solution.value;
        const points = parseInt(event.target.points.value, 10); // Assuming points is an integer
        const difficulty = event.target.difficulty.value;

        try {
            // Add a new document with the provided values to the "users" collection
            const docRef = await addDoc(collection(db, "Aufgaben"), {
                name,
                topicId,
                chapterId,
                subchapterId,
                exerciseId,
                solution,
                points,
                difficulty
            });
            console.log("Document written with ID: ", docRef.id);
            event.target.reset();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" className={styles.inputField} /><br /><br />
                    <label htmlFor="topicId">Topic ID:</label>
                    <input type="text" id="topicId" name="topicId" className={styles.inputField} /><br /><br />
                    <label htmlFor="chapterId">Chapter ID:</label>
                    <input type="text" id="chapterId" name="chapterId" className={styles.inputField} /><br /><br />
                    <label htmlFor="subchapterId">Subchapter ID:</label>
                    <input type="text" id="subchapterId" name="subchapterId" className={styles.inputField} /><br /><br />
                    <label htmlFor="exerciseId">Exercise ID:</label>
                    <input type="text" id="exerciseId" name="exerciseId" className={styles.inputField} /><br /><br />
                    <label htmlFor="solution">Solution:</label>
                    <input type="number" id="solution" name="solution" className={styles.inputField} /><br /><br />
                    <label htmlFor="points">Points:</label>
                    <input type="number" id="points" name="points" className={styles.inputField} /><br /><br />
                    <label htmlFor="difficulty">Difficulty:</label>
                    <input type="text" id="difficulty" name="difficulty" className={styles.inputField} /><br /><br />
                    {/* <select id="difficulty" name="difficulty" className={styles.inputField}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select><br /><br /> */}
                    <button type="submit" className={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
