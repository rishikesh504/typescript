export function filteredresults (query: string,usersArray: any[]) {
    let result = []
    for(let i = 0 ; i < usersArray.length;i++) {
      let temp = Object.values(usersArray[i].personalDetails).join("").toLocaleLowerCase()
      if(temp.includes(query.toLocaleLowerCase())){
          result.push(usersArray[i])
      }
    }
    return result
  }
  