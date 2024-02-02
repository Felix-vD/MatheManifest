import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase-config'; // Adjust this import path if needed

const useFirebaseImage = (documentPath) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const docRef = doc(db, ...documentPath);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists() && docSnap.data().URL) {
                    const storage = getStorage();
                    const imageRef = ref(storage, docSnap.data().URL);
                    const url = await getDownloadURL(imageRef);
                    setImageUrl(url);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching image URL', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [documentPath.join('/')]); // Depend on documentPath as a string to handle updates correctly

    return { imageUrl, loading };
};

export default useFirebaseImage;