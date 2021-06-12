//create
const fs = require('fs')
const data = require("./data.json")

exports.show = function(req,res){


    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id
    })

    if (!foundInstructor) return res.send("instructor not found")

    function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0) 
    }

    const instructor = {
        ...foundInstructor,
        age: "",
        gender: "",
        services: foundInstructor.services.split(","),
        created_at: ""
    }

    return res.render("instructors/show",{instructor : instructor})
}

exports.post = function(req,res){

    const keys = Object.keys(req.body)

    for(key of keys){
        
        if(req.body[key] == ""){
            return res.send('please prencha os dados')
        }
           
    }

    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now()
    req.body.id = Number(data.instructors.length + 1)

    let {avatar_url,birth,id,name,services,gender,created_at} = req.body

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,

    })

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if(err) return res.send(err)

        return res.redirect("/")
        
    })  

    return res.send(req.body)
}