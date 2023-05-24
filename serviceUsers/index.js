const { ApolloServer, gql } = require('apollo-server');

const users=[
     {id:1,nom:'ahmed',prenom:'mohamed',occupation:'etudiant'},
     {id:2,nom:'chaima',prenom:'ahmed',occupation:'etudiante'},
     {id:3,nom:'ayoub',prenom:'ahmed',occupation:'medecin'},
     {id:4,nom:'karim',prenom:'karim',occupation:'ingenieur'},
];

const typeDefs= gql`
type User{
    id: ID
    nom: String
    prenom: String
    occupation: String
}

type Query {
    users(filtreNom: String, filtrePrenom : String): [User]
}

`;

const resolvers  = {
    Query : {
        users:(children,{filtreNom,filtrePrenom}) =>{
            let resultats = users;
            if(filtreNom){
                resultats=resultats.filter(user => 
                        user.nom.toLocaleLowerCase().includes(filtreNom.toLocaleLowerCase())
                    );
            }
            if(filtrePrenom){
                resultats=resultats.filter(user =>
                    user.prenom.toLocaleLowerCase().includes(filtrePrenom.toLocaleLowerCase())
                    );
            }
            return resultats;
        },
    },
};

const server = new ApolloServer({typeDefs,resolvers});
server.listen().then(({url})=>{
    console.log("Users's server is running");
});