import "reflect-metadata";
import express, { response } from 'express';
import { DataSource, LessThan } from "typeorm";
import { User } from "./entities/user";
import { Profile } from "./entities/profile";
import { Company } from "./entities/company";
import { Product } from "./entities/product";

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

/* ================================ Implementing one to one relation ================================ */

// app.get('/', async (req,res)=>{
//     const userRepo =  AppDataSource.getRepository(User);
//     const profileRepo =  AppDataSource.getRepository(Profile);
   
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
//});

/* ==========================>>>>>>>>>> IMPLEMENTING MANY TO ONE AND ONE TO MANY RELATION <<<<<<<<<<<============================*/


   //inserting the data

//app.get('/', async function (req, res){

    // const companyRepo = AppDataSource.getRepository(Company);

    // let products : Product[] = [];

    // let samsung = new Product();
    // samsung.name = "Galaxy Note";
    // samsung.description = "A smart Phone with Spen",
    // samsung.price = 120000;

    // let gear = new Product();
    // gear.name = "Galaxy Watch";
    // gear.description = "Smart Watch",
    // gear.price = 30000;

    // let SmartTV = new Product();
    // SmartTV.name = "Oled Crystal";
    // SmartTV.description = "Premium android smart Tv",
    // SmartTV.price = 90000;
    
    // products.push(samsung, gear, SmartTV);

    // let company: Company = new Company();
    // company.name= "Samsung",
    // company.description="Multipurpose product based company",
    // company.products = products;

    // const dataInserted = await companyRepo.save(company);
    // res.json(dataInserted);

//});

//=======================================>>>> getting the data & filtering as well<<<<<<=========================================//

app.get('/', async (req, res) => {
    
    const companyRepo = AppDataSource.getRepository(Company);
    const companyFound = await companyRepo.find({
        // relations:{
        //     products: true
        // },
        // where:{
        //     products:{
        //         price: LessThan(50000),
        //     }
        // }
    });

    res.json(companyFound);
});

//===========================================>>>> Updating the data <<<<<<=========================================//

// app.get('/', async function (req, res){

//      const companyRepo = AppDataSource.getRepository(Company);
//      const company = await companyRepo.findOne({where: {id: 1}});
//      if(company != undefined){
       
//         company.name = "Apple LTD"; 
       
//        const dataUpdated = await companyRepo.save(company);
//        res.json(dataUpdated);
//     }
//      else res.send('This company does not exist');
// });

//===========================================>>>> Deleting the data <<<<<<=========================================//

// app.get('/',async (req, res) => {
//   const companyRepo = AppDataSource.getRepository(Company);
//   await companyRepo.delete(1); 
//   res.send("Data Deleted"); 
// });