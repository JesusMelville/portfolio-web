import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    deleteDoc,
    onSnapshot,
    getDocs,
    writeBatch
} from 'firebase/firestore';
import {
    getStorage,
    ref,
    uploadString,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCTbH7auBnfuIoD_6cIX6fpFDD6IE4_o3c",
    authDomain: "portafolio-6a7b4.firebaseapp.com",
    projectId: "portafolio-6a7b4",
    storageBucket: "portafolio-6a7b4.firebasestorage.app",
    messagingSenderId: "893854670917",
    appId: "1:893854670917:web:dec8dce7d0cc1b8145032c",
    measurementId: "G-DCB5HRWRCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

const COLLECTIONS = {
    PROJECTS: 'projects',
    CERTIFICATIONS: 'certifications'
};

/**
 * Upload a certificate file (base64 dataURL or File/Blob) to Firebase Storage
 */
export async function uploadCertificateFile(fileData, fileName) {
    if (!fileData) return null;
    try {
        const safeName = fileName || `cert-${Date.now()}`;
        const sanitized = safeName.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `certificates/${Date.now()}_${sanitized}`;
        const storageRef = ref(storage, storagePath);

        if (typeof fileData === 'string' && fileData.startsWith('data:')) {
            // Base64 Data URL upload
            const snapshot = await uploadString(storageRef, fileData, 'data_url');
            return await getDownloadURL(snapshot.ref);
        } else if (fileData instanceof Blob || fileData instanceof File) {
            // Binary File upload
            const snapshot = await uploadBytes(storageRef, fileData);
            return await getDownloadURL(snapshot.ref);
        }
        return fileData;
    } catch (err) {
        console.warn('Firebase Storage upload failed (falling back to inline data):', err);
        return fileData; // Fallback to storing as base64 string
    }
}

/**
 * Real-time listener for certifications
 */
export function subscribeToCertifications(onData, onError) {
    const certsCol = collection(db, COLLECTIONS.CERTIFICATIONS);
    return onSnapshot(certsCol, (snapshot) => {
        const certs = [];
        snapshot.forEach((docSnap) => {
            certs.push({ id: docSnap.id, ...docSnap.data() });
        });
        // Sort newest first by creation/date
        certs.sort((a, b) => (b.createdAt || b.date || 0) - (a.createdAt || a.date || 0));
        onData(certs);
    }, (err) => {
        console.warn('Firestore certifications sync error:', err);
        if (onError) onError(err);
    });
}

/**
 * Real-time listener for projects
 */
export function subscribeToProjects(onData, onError) {
    const projectsCol = collection(db, COLLECTIONS.PROJECTS);
    return onSnapshot(projectsCol, (snapshot) => {
        const projects = [];
        snapshot.forEach((docSnap) => {
            projects.push({ id: docSnap.id, ...docSnap.data() });
        });
        onData(projects);
    }, (err) => {
        console.warn('Firestore projects sync error:', err);
        if (onError) onError(err);
    });
}

/**
 * Helper to remove all undefined values (Firestore throws on undefined)
 */
function sanitizeForFirestore(obj) {
    const clean = {};
    Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && obj[key] !== null) {
            clean[key] = obj[key];
        } else if (obj[key] === null) {
            clean[key] = null;
        }
    });
    return clean;
}

/**
 * Save / Add Certification to Firestore
 */
export async function saveCertificationToCloud(cert) {
    const certId = cert.id || `cert-${Date.now()}`;
    const certRef = doc(db, COLLECTIONS.CERTIFICATIONS, certId);

    let finalFileUrl = cert.certificateFile || cert.certificateImage || null;

    // If file is raw base64, try to upload to Firebase Storage to keep Firestore docs small & fast
    if (finalFileUrl && typeof finalFileUrl === 'string' && finalFileUrl.startsWith('data:')) {
        try {
            const storageUrl = await uploadCertificateFile(finalFileUrl, cert.fileName);
            if (storageUrl && storageUrl.startsWith('http')) {
                finalFileUrl = storageUrl;
            }
        } catch (e) {
            console.warn('Storage upload fallback:', e);
        }

        // Safety check: if storage failed and base64 is still over 900KB, warn
        if (finalFileUrl && finalFileUrl.length > 950000) {
            console.warn('Certificate base64 payload is large for inline document:', finalFileUrl.length);
        }
    }

    const payload = sanitizeForFirestore({
        id: certId,
        title: cert.title || 'Certificación Profesional',
        issuer: cert.issuer || 'Institución Emisora',
        date: cert.date || new Date().getFullYear().toString(),
        credentialId: cert.credentialId || '',
        url: cert.url || '',
        category: cert.category || 'ai',
        badgeColor: cert.badgeColor || '#ec4899',
        skills: Array.isArray(cert.skills)
            ? cert.skills
            : (typeof cert.skills === 'string' ? cert.skills.split(',').map(s => s.trim()).filter(Boolean) : []),
        description: cert.description || '',
        certificateFile: finalFileUrl,
        certificateImage: finalFileUrl,
        fileName: cert.fileName || 'documento.pdf',
        fileType: cert.fileType || 'image',
        updatedAt: Date.now(),
        createdAt: cert.createdAt || Date.now()
    });

    await setDoc(certRef, payload, { merge: true });
    console.log('Successfully saved certification to Firestore:', certId);
    return payload;
}

/**
 * Delete Certification from Firestore
 */
export async function deleteCertificationFromCloud(id) {
    if (!id) return;
    const certRef = doc(db, COLLECTIONS.CERTIFICATIONS, id);
    await deleteDoc(certRef);
    console.log('Successfully deleted certification from Firestore:', id);
}

/**
 * Save / Add Project to Firestore
 */
export async function saveProjectToCloud(project) {
    const projectId = project.id || project.name || `proj-${Date.now()}`;
    const projectRef = doc(db, COLLECTIONS.PROJECTS, projectId);

    const payload = sanitizeForFirestore({
        id: projectId,
        title: project.title || project.name || 'Nuevo Proyecto',
        name: project.name || project.title || 'Proyecto',
        subtitle: project.subtitle || '',
        description: project.description || '',
        longDescription: project.longDescription || project.description || '',
        customDescription: project.customDescription || project.description || '',
        category: project.category || 'frontend',
        featured: project.featured === true,
        visible: project.visible !== false,
        github: project.github || project.html_url || '',
        demo: project.demo || project.homepage || '',
        color: project.color || '#8b5cf6',
        tags: Array.isArray(project.tags)
            ? project.tags
            : (typeof project.tags === 'string' ? project.tags.split(',').map(t => t.trim()).filter(Boolean) : []),
        metrics: Array.isArray(project.metrics) ? project.metrics : [],
        features: Array.isArray(project.features) ? project.features : [],
        isFromGitHub: project.isFromGitHub === true,
        updatedAt: Date.now(),
        createdAt: project.createdAt || Date.now()
    });

    await setDoc(projectRef, payload, { merge: true });
    console.log('Successfully saved project to Firestore:', projectId);
    return payload;
}

/**
 * Delete Project from Firestore
 */
export async function deleteProjectFromCloud(id) {
    if (!id) return;
    const projectRef = doc(db, COLLECTIONS.PROJECTS, id);
    await deleteDoc(projectRef);
    console.log('Successfully deleted project from Firestore:', id);
}

/**
 * Seed initial local data into Firestore only when explicitly requested
 */
export async function seedInitialCloudData(initialProjects = [], initialCertifications = []) {
    try {
        if (initialCertifications && initialCertifications.length > 0) {
            const certsSnapshot = await getDocs(collection(db, COLLECTIONS.CERTIFICATIONS));
            if (certsSnapshot.empty) {
                console.log('Seeding initial certifications to Firestore...');
                const batch = writeBatch(db);
                initialCertifications.forEach(cert => {
                    const certId = cert.id || `cert-${Date.now()}`;
                    const certRef = doc(db, COLLECTIONS.CERTIFICATIONS, certId);
                    batch.set(certRef, sanitizeForFirestore({
                        ...cert,
                        id: certId,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }));
                });
                await batch.commit();
                console.log('Seeded certifications to Firestore successfully.');
            }
        }

        if (initialProjects && initialProjects.length > 0) {
            const projectsSnapshot = await getDocs(collection(db, COLLECTIONS.PROJECTS));
            if (projectsSnapshot.empty) {
                console.log('Seeding initial projects to Firestore...');
                const batch = writeBatch(db);
                initialProjects.forEach(proj => {
                    const projId = proj.id || proj.name;
                    const projRef = doc(db, COLLECTIONS.PROJECTS, projId);
                    batch.set(projRef, sanitizeForFirestore({
                        ...proj,
                        id: projId,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    }));
                });
                await batch.commit();
                console.log('Seeded projects to Firestore successfully.');
            }
        }
    } catch (err) {
        console.warn('Initial cloud seeding note:', err);
    }
}

