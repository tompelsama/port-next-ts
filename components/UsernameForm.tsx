'use client'

import { useCallback, useEffect, useState } from "react";
import { useUserContext } from "./Context";
import { firestore } from "@/lib/firebase";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import debounce from 'lodash.debounce';

// Username form
export default function UsernameForm() {
    const [formValue, setFormValue] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
  
    const { user, username } = useUserContext();
  
    const onSubmit = async (e) => {
        e.preventDefault();
    
        // Create refs for both documents
        const userDoc = doc(firestore, "users", user.uid);
        const usernameDoc = doc(firestore, "usernames", formValue);
    
        // Commit both docs together as a batch write.
        const batch = writeBatch(firestore);
        batch.set(
            userDoc, 
            { 
                username: formValue, 
                photoURL: user.photoURL, 
                displayName: user.displayName 
            }
        );
        batch.set(
            usernameDoc, 
            { uid: user.uid }
        );
    
        await batch.commit();
    };
  
    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
    
        if (re.test(val)) {
            console.log('pass')
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };
  
    //
  
    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);
  
    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
        debounce(async (value: string) => {
            if (value.length >= 3) {
                const ref = doc(firestore, "usernames", value);
                const docSnap = await getDoc(ref);

                console.log('Firestore read executed!');
                setIsValid(!docSnap.exists());
                setLoading(false);
            }
        }, 500),
        []
    );
  
    return (
        !username && (
            <section>
            <h3>Choose Username</h3>
            <form onSubmit={onSubmit}>
                <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
                <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                <button type="submit" className="btn-green" disabled={!isValid}>
                Choose
                </button>
    
                <h3>Debug State</h3>
                <div>
                Username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
                </div>
            </form>
            </section>
        )
    );
  }
  
  function UsernameMessage({ username, isValid, loading }: any) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        return <p></p>;
    }
  }