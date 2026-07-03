"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/core/config/firebase";
import { COLLECTIONS } from "@/core/config/constants";
import type { AppUser } from "@/core/types/domain";
import type { Permission } from "@/core/types/rbac";
import { can as canCheck } from "@/core/types/rbac";

interface AuthContextValue {
  firebaseUser: FirebaseUser | null;
  appUser: AppUser | null;
  loading: boolean;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Step 1: listen for Firebase Auth state.
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (!user) {
        setAppUser(null);
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  // Step 2: once authenticated, subscribe in real time to the user's profile
  // doc (role, branch, isActive) so an admin revoking access takes effect
  // immediately without requiring re-login.
  useEffect(() => {
    if (!firebaseUser) return;
    const ref = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setAppUser({ id: snap.id, ...(snap.data() as Omit<AppUser, "id">) });
        } else {
          setAppUser(null);
        }
        setLoading(false);
      },
      () => setLoading(false)
    );
    return unsub;
  }, [firebaseUser]);

  const value: AuthContextValue = {
    firebaseUser,
    appUser,
    loading,
    can: (permission) => canCheck(appUser?.role, permission)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
