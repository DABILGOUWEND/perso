export interface ecole {
    'id': string,
    'nom': string,
    'adresse': string,
    'telephone': string,
    'email': string,
    'site': string,
    'created_at': string
}
export interface classe {
    'id': string,
    'niveau': string,
    'eleves': liste_eleves[],
}
export interface eleve {    
    'id': string,
    'nom': string,
    'prenom': string,
    'sexe': string,
    'date_naissance': string,
    'lieu_naissance': string,
    'nom_perant': string,
    'prenom_parent': string,
    'profession_parent': string,
    'telephone_parent': string,
}
export interface enseignant {
    'id': string,
    'nom': string,
    'prenom': string,
    'sexe': string,
    'date_naissance': string,
    'lieu_naissance': string,
    'telephone': string,
    'email': string,
    'adresse': string,
    'matiere': string
}
export interface matiere {
    'id': string,
    'nom': string,
    'coef': number
}
export interface note {
    'id': string,
    'eleve': string,
    'matiere': string,
    'valeur': number
}
export interface paiement {
    'id': string,
    'eleve': string,
    'montant': number,
    'date': string
}
export interface user {
    'id': string,
    'nom': string,
    'prenom': string,
    'email': string,
    'role': string,

}

export interface annee {
    'id': string,
    'debut': string,
    'fin': string
}
export interface trimestre {
    'id': string,
    'debut': string,
    'fin': string
}

export interface evaluation {
    'id': string,
    'debut': string,
    'fin': string
}
export interface bulletin {
    'id': string,
    'eleve': string,
    'classe': string,
    'annee': string,
    'trimestre': string,
    'moyenne': number
}
export interface appreciation {
    'id': string,
    'bulletin': string,
    'matiere': string,
    'valeur': string
}
export interface emploi {
    'id': string,
    'classe': string,
    'jour': string,
    'heure': string,
    'matiere': string,
    'enseignant': string
}
export interface absence {
    'id': string,
    'eleve': string,
    'date': string
}
export interface liste_eleves{
    'eleves_ids': string[]
    'annnee_id': string
}

