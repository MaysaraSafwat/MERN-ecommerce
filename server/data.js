import bcrypt from "bcryptjs"

const data = {
    users : [
        {
            name : "Maisara",
            email : "admin@example.com",
            password : bcrypt.hashSync("123456", 8),
            isAdmin : true
        },

        {
            name : "Mariam",
            email : "user@example.com",
            password : bcrypt.hashSync("123456", 8),
            isAdmin :false
        }
    ],
    products: [
        {
            
            name : "illustration Graphic Tshirt",
            category : "women",
            image:"/images/p1.jpg",
            price : 120,
            rating : 4.5,
            numReviews: 12,
            countInStock: 3 ,
            description : "illustration Graphic tee"
        },
        {
            
            name : "Sunshine graphic Tshirt",
            category : "women",
            image:"/images/p2.jpg",
            price : 150,
            rating : 5,
            numReviews: 2,
            countInStock : 13,
            description : "Another thing to do the thing"
        },
        {
            
            name : "Sublime graphic Tshirt",
            category : "women",
            image:"/images/p3.png",
            price : 130,
            rating :3.5,
            numReviews: 5,
            countInStock : 11,
            description : "Another thing to do the thing"
        },
        {
            
            name : "Asian graphic Tshirt",
            category : "men",
            image:"/images/p4.png",
            price : 140,
            rating :4,
            numReviews: 5,
            countInStock: 0, 
            description : "Another thing to do the thing"
        },
        {
            
            name : "Purple Rain graphic Tshirt",
            category : "women",
            image:"/images/p5.jpg",
            price : 90,
            rating :3.5,
            numReviews: 8,
            countInStock : 15,
            description : "Another thing to do the thing"
        },
        {
            
            name : "Art graphic Tshirt",
            category : "men",
            image:"/images/p6.jpg",
            price : 130,
            rating :5,
            numReviews: 2,
            countInStock: 4,
            description : "Another thing to do the thing"
        }
    ]
}
export default data;