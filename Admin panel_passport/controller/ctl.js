const AdminSchema = require("../module/firstschema");
const fs = require("fs")

module.exports.Login = (req,res) => {
    res.render("Login");
}

module.exports.userLogin = async (req, res) =>{
    // console.log(req.body);
    
    let admin = await AdminSchema.findOne({email: req.body.email});
    console.log(admin);
    
    // if(admin){
    //    if(admin.password == req.body.password){
    //     res.cookie("adminData",admin);
        res.redirect("/dashboard");
    //    }else{
    //     console.log("password is wrong");
    //    }
    // }else{
    //     console.log("email not existed");
    // }
};

module.exports.Logout = (req,res)=>{
    res.clearCookie("local");
    res.redirect("/");
}

module.exports.HomePage = async(req,res) =>{
    // let data = await AdminSchema.find({});
    res.render("Dashboard");

}

module.exports.Addadmin =async(req,res) => {
    res.render("addadmin");
    // if (req.cookies.adminData) {
    //     let data = await AdminSchema.find({})
    // data && res.render("addadmin")
    // }else{
    //     res.redirect("/");
    // }
}

// module.exports.Viewadmin =async(req,res) => {
//     let data = await AdminSchema.find({})
//     data && res.render("viewadmin");
// }
module.exports.Viewadmin = async (req, res) => {
    let data = await AdminSchema.find({});
    res.render("viewadmin", { data });
};

module.exports.AddAdminData = async(req,res)=>{
    req.body.image = req.file.path;
    let data = await AdminSchema.create(req.body)
    data && res.redirect("addadmin")
}
module.exports.DeleteData = async(req,res)=>{
    let SingleData = await AdminSchema.findById(req.query.id)
    fs.unlinkSync(SingleData.image);
    let data = await AdminSchema.findByIdAndDelete(req.query.id)
    data && res.redirect("/viewAdmin");
}
module.exports.EditData = async(req,res)=>{
    let data = await AdminSchema.findById(req.query.id)
    data && res.render("enditform",{data})
}
module.exports.UpdateData = async(req,res)=>{
    let img = "";
    let SingleData = await AdminSchema.findById(req.body.id)
    req.file ? img = req.file.path : img = SingleData.image
    req.file && fs.unlinkSync(SingleData.image)
    req.body.image = img
    let data = await AdminSchema.findByIdAndUpdate(req.body.id,req.body)
    data && res.redirect("/viewAdmin");
}
