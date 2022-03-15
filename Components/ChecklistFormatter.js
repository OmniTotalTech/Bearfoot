export default function ChecklistFormatter(dailyChecklist){

    let formattedArray = []

    console.log(dailyChecklist)

    if(dailyChecklist.length > 0){
        dailyChecklist.forEach((item,i) => {

            if(item.position == undefined | null){
                item.position = i
                formattedArray.push(item)
            } else {
                formattedArray.push(item)
            }

        })
        console.log(formattedArray);
        formattedArray.sort((a,b) => a.position - b.position)
        return formattedArray
    } else {
        return []
    }


}