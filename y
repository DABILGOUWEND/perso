rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
   match /{document=**} {
    	allow read,write: if request.auth!=null &&
      get(/databases/$(database)/documents/myusers/$(request.auth.uid)).data.role=="admin";
    }
    match /myusers/{documents=**} {
    	allow read: if request.auth!=null;
      allow write: if request.auth!=null  && get(/databases/$(database)/documents/myusers/$(request.auth.uid)).data.role=="admin";
    }
    match /projet/{projet}{
    	allow write:if request.auth!=null  && 
      get(/databases/$(database)/documents/myusers/$(request.auth.uid)).data.role=="admin";
    	allow read:if request.auth!=null 
    }
      match /entreprises/{projet}{
    	allow write:if request.auth!=null  && 
      get(/databases/$(database)/documents/myusers/$(request.auth.uid)).data.role=="admin";
    	allow read:if request.auth!=null 
    }
    match /comptes/{compte_id}/{documents=**}{
    	allow read,write:if request.auth!=null  && compte_id in 
    	get(/databases/$(database)/documents/myusers/$(request.auth.uid)).data.projet_id ;
    }
  }
  
}