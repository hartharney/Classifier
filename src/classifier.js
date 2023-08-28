

function classifier(input) {

    const newInput = [...input];
    input = Object.freeze(input);

    if(!Array.isArray(input) || typeof input === 'undefined'){
        throw new Error('...enter correct input');
    }

  //=============== get actual year

    for(const memberItem of newInput){
        let fullYear = new Date(memberItem.dob).getFullYear();
        memberItem['age'] = 2019 - fullYear; 
    }

//============ group objects by year / sort

    let sortedInput = newInput.sort((a,b) => {
        if(a.age > b.age) return 1;
        if(a.age === b.age) return 0;
        if(a.age < b.age) return -1;
    })

//============= logic to group objects by age range

let ageGroup = [];
let holdingArray = [];


    for(let i = 0; i < sortedInput.length; i++){
        if(holdingArray.length === 0){
            holdingArray.push(sortedInput[i]);
        }
        else if( sortedInput[i].age - holdingArray[holdingArray.length -1].age <= 5 && holdingArray.length < 3){
            holdingArray.push(sortedInput[i]);
        }else{
            ageGroup.push([...holdingArray]);
            holdingArray = [sortedInput[i]];
        }
    }

    if(holdingArray.length > 0){
        ageGroup.push([...holdingArray])
    }

    //======================== final Object

    const finalData = {};

    for (let i = 0; i < ageGroup.length; i++){
        const groupedArray = ageGroup[i];

        let oldestAge;

        if(groupedArray.length < 2){
            oldestAge = groupedArray[0].age;
        }else{
            oldestAge = Math.max(...groupedArray.map(obj => obj.age));
        }

        let sumAges = groupedArray.reduce(((acc, obj) => acc + obj.age), 0);

        let regNos = groupedArray.map(obj => obj.regNo).sort((a,b) => a - b);
        regNos = regNos.map(regNo => parseFloat(regNo, 10));
        
        let groupKey = `group${i + 1}`;

         finalData[groupKey] = {
            members : groupedArray,
            oldest : oldestAge,
            sum : sumAges,
            regNos: regNos
        };

    }

    finalData.noOfGroups = Object.keys(finalData).length;
 
    const finalObject = {
        noOfGroups : finalData.noOfGroups,
        ...finalData
    };

    console.log(finalObject);
    return finalObject;
  }
  


export default classifier;
