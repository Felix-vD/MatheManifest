import React from 'react';
import useFirebaseImage from '../../hooks/useFirebaseImage'; // Adjust the import path as needed
import DatabaseNavigator from '../DatabaseNavigator/DatabaseNavigator';
import styles from './HomePage.module.css';
import { collection} from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase-config'; 
import Register from '../Register/Register';
import ContentDisplay from './ContentDisplay';
const HomePage = () => {
    const query = collection(db, '/Themenbereiche/Stochastik/Kapitel')
    const [values, loading, error] = useCollectionData(query);
    //console.log(values);
    return (
        <div className={styles.pageContainer}>
            <main className={styles.mainContent}>
                
                <div className='DiagramDisplay'>
                    {/* Existing content */}
                </div>
                
                {/* <DatabaseNavigator />
                <Register /> */}
                <ContentDisplay />
                {/* Main content */}
            </main>
            <footer className={styles.footer}>
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default HomePage;