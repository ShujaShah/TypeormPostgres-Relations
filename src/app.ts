import "reflect-metadata";
import express, { response } from 'express';
import { DataSource } from "typeorm";
import { User } from "./entities/user";
import { Profile } from "./entities/profile";

const app = express();
app.use(express.json());
const port = 3000;

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: true,
    entities: ["src/entities/*{.ts,.js}"]
});

AppDataSource.initialize()
.then(()=> console.log('Database connected successfully !'))

.catch((err)=>{console.log("Error Connecting to database", err)});


app.listen(port, ()=>{
    console.log(`This app is running on the port ${port}`);
});

app.get('/', async (req,res)=>{
    const userRepo =  AppDataSource.getRepository(User);
    const profileRepo =  AppDataSource.getRepository(Profile);
   
    //==================================get all the user records=======================================//

    // const allRecords = await userRepo.find();
    // return res.json(allRecords); 

    //==================================get the particular user record=================================//
   
    // const record = await userRepo.findOne({where:{firstName: "Shuja"}});
    // return res.json(record);

    //===================================insert the user records======================================//

    // let profile : Profile = new Profile(); // for one to one mapping
    // profile.gender = "female";//mapping gender of profile to user
    // profile.photo = "Anne Photo" //mapping photo of profile to user

    // let user: User = new User();
    // user.email = "anne@gmail.com",
    // user.firstName = "Anne",
    // user.lastName = "Sylvestor";
    // user.profile = profile; //inserting profile as fk

    // const userInserted = await userRepo.save(user); //to save the user in db..
    //  res.json(userInserted);


    //=====================================delete user records===============================================//
    // await userRepo.delete(2);
    // return res.send('Record Deleted');

    //======================================update user records including relations=========================================/

    //    const userFound = await userRepo.findOne({where: {id: 7}});
//    if (userFound){
//     userFound.email =" anne@gmail.com",
//     userFound.firstName="Anne",
//     userFound.lastName="Hathway",
//     userFound.profile.gender="female",
//     userFound.profile.photo="photo changed";

//     const updatedRecord = await userRepo.save(userFound);
//     res.json(updatedRecord);
//    }
//    else{
//     res.send("record does not exist")
//    }

   //=====================================update user records only===============================//
    // await userRepo.update(4, 
    //     {firstName:"Minhaj",
    //      lastName:"Iqbal",
    //      email:"minhaj.iqbal@gmail.com"});
         
    //      return res.send("User record updated");
});