import React from 'react';
import useFirebaseImage from '../../hooks/useFirebaseImage'; // Adjust the import path as needed
import DatabaseNavigator from '../DatabaseNavigator/DatabaseNavigator';
import styles from './HomePage.module.css';

const HomePage = () => {
    const documentPath = ['Themen', 'Analysis', 'Nullstellen', 'Aufgabe1'];
    const { imageUrl, loading } = useFirebaseImage(documentPath);

    if (loading) return <div>Loading...</div>;
    return (
        <div className={styles.pageContainer}>
            <main className={styles.mainContent}>
                
                <div className='DiagramDisplay'>
                    {/* Existing content */}
                </div>
                <div>
                    {imageUrl && <img src={imageUrl} alt="Exercise" className={styles.image} />}
                </div>
                <DatabaseNavigator />
            </main>
            <footer className={styles.footer}>
                {/* Footer content */}
            </footer>
        </div>
    );
};

export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { getStorage, ref, getDownloadURL } from 'firebase/storage';
// import { db } from '../../firebase-config'; // Adjust this import path if needed
// import styles from './HomePage.module.css';

// const HomePage = () => {
//     const [imageUrl, setImageUrl] = useState('');
//     const [loading, setLoading] = useState(false)
//     const fetchImage = async () => {
//         setLoading(true);
//         // Assuming 'Aufgabe1' document contains a field 'imageName' with the file name as the value
//         const docRef = doc(db, 'Themen', 'Analysis', 'Nullstellen', 'Aufgabe1');
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists() && docSnap.data().URL) {
//             const storage = getStorage();
//             const imageRef = ref(storage, `${docSnap.data().URL}`);
            

//             getDownloadURL(imageRef)
//                 .then((url) => {
//                     setImageUrl(url);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching image URL', error);
//                 })
//                 .finally(() => {
//                     setLoading(false);
//                 });
//         } else {
//             console.log('No such document!');
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchImage();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     return (
//         <div className={styles.pageContainer}>
//             <main className={styles.mainContent}>
//                 <div className='DiagramDisplay'>
//                     {/* Existing content */}
//                 </div>
//                 <div>
//                     <button onClick={fetchImage}>Load Exercise Image</button>
//                     {imageUrl && <img src={imageUrl} alt="Exercise" className={styles.image} />}
//                 </div>
//             </main>
//             <footer className={styles.footer}>
//                 {/* Footer content */}
//             </footer>
//         </div>
//     );
// };

// export default HomePage;
