const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        owner: {
            require: true,
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }, 
        category: {
            require: true, 
            type: String
        },
        subCategory: {
            require: true,
            type: String
        },
        Brand: {
            type: String, 
            require: true
        },
        Year: {
            type: String, 
            require: true
        },
        Fuel: {
            type: String, 
            require: true
        },
        Transmission: {
            type: String, 
            require: true
        }, 
        KMdriven: {
            type: String, 
            require: true
        },
        NoOfOwners: {
            type: String, 
            require: true
        },
        Title: {
            type: String, 
            require: true
        },
        Description: {
            type: String, 
            require: true
        },
        Price: {
            type: String,
            require: true
        },
        Type: {
            type: String,
            require: true
        },
        BHK: {
            type: String,
            require: true
        },
        Bathrooms: {
            type: String,
            require: true
        },
        Furnishing: {
            type: String,
            require: true
        },
        ProjectStatus: {
            type: String,
            require: true
        },
        ListedBy: {
            type: String,
            require: true
        },
        Area: {
            type: String,
            require: true
        },
        Maintenance: {
            type: String,
            require: true
        },
        Floors: {
            type: String,
            require: true
        },
        FloorNo: {
            type: String,
            require: true
        },
        CarParking: {
            type: String,
            require: true
        },
        Facing: {
            type: String,
            require: true
        },
        ProjectName: {
            type: String
        },
        BaclelorsAllowed: {
            type: String,
            require: true
        },
        Breadth: {
            type: String,
            require: true
        },
        Length: {
            type: String,
            require: true
        },
        Washrooms: {
            type: String,
            require: true
        },
        MealsIncluded: {
            type: String,
            require: true
        },
        PhysicalCondition: {
            type: String,
            require: true
        },
        RAM: {
            type: String,
            require: true
        },
        Storage: {
            type: String,
            require: true
        },
        Network: {
            type: String,
            require: true
        },
        Charger: {
            type: String,
            require: true
        },
        Receipt: {
            type: String,
            require: true
        },
        BoxWithIMEI: {
            type: String,
            require: true
        },
        SalaryPeriod: {
            type: String,
            require: true
        },
        Position: {
            type: String,
            require: true
        },
        SalaryFrom: {
            type: String,
            require: true
        },
        SalaryTo: {
            type: String,
            require: true
        },
        Images: [
            {
            type: String,
            require: true
            }
        ]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema);