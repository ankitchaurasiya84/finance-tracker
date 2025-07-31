
let ab={}

let arr=[
    {
        "name":"India",
        state:["UP","MP","Delhi"]
    },
{
        name:"China",
        state:["Chin","Pong","BUrMan"]
    },
     {
        name:"India",
        state:["HP","UK","SIMLA"]
    },
]
arr.map((i,j)=>{
    if(!ab[i.name]){
        ab[i.name]=[]
    }
    ab[i.name].push({...i.state})
    
    
})

console.log(ab)