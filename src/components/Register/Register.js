import React from 'react';
import styles from './Register.module.css'; // Adjust the path as necessary
import { db } from '../../firebase-config'; // Adjust the path to your Firebase config
import { collection, addDoc } from "firebase/firestore";


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
        const URL = event.target.url.value;
        
        


        try {
            // Add a new document with the provided values to the "users" collection
            await addDoc(collection(db, "Aufgaben"), {
                name,
                topicId,
                chapterId,
                subchapterId,
                exerciseId,
                solution,
                points,
                difficulty,
                URL
               
            });
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
                    
                    <div>
                        <label htmlFor="name" className={styles.label}>Name:</label>
                        <input type="text" id="name" name="name" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="topicId" className={styles.label}>Topic ID:</label>
                        <input type="text" id="topicId" name="topicId" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="chapterId" className={styles.label}>Chapter ID:</label>
                        <input type="text" id="chapterId" name="chapterId" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="subchapterId" className={styles.label}>Subchapter ID:</label>
                        <input type="text" id="subchapterId" name="subchapterId" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="exerciseId" className={styles.label}>Exercise ID:</label>
                        <input type="text" id="exerciseId" name="exerciseId" className={styles.inputField} />
                    </div><div>
                        <label htmlFor="solution" className={styles.label}>Solution:</label>
                        <input type="text" id="solution" name="solution" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="points" className={styles.label}>Points:</label>
                        <input type="number" id="points" name="points" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="difficulty" className={styles.label}>Difficulty:</label>
                        <input type="text" id="difficulty" name="difficulty" className={styles.inputField} />
                    </div>
                    <div>
                        <label htmlFor="url" className={styles.label}>URL:</label>
                        <input type="text" id="url" name="url" className={styles.inputField} />
                    </div>
                    <button type="submit" className={styles.button}>Register</button>
                </form>


            </div>
        </div>
    );
};

export default Register;