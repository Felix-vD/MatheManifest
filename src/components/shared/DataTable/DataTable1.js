import React from "react";
import { db } from "../../../firebase-config"
import { collection } from "@firebase/firestore"

export default function DataTable1 ({path, onNavigate}) {
    const query = collection(db, path);
    const [documents, loading, error] = userCollectionData(query, {idField: 'id'});
    const handleClick = (docname, subcollection) => {
        const newPath = `${path}/${docName}/${subcollection}`;
        onNavigate(newPath); 
    };

}