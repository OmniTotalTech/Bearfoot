export default function ChecklistFormatter(dailyChecklist){

    let formattedArray = []


    if(dailyChecklist?.length > 0){
        dailyChecklist.forEach((item,i) => {

            if(item.position == undefined | null){
                item.position = i
                formattedArray.push(item)
            } else {
                formattedArray.push(item)
            }

        })
        formattedArray.sort((a,b) => a.position - b.position)
        return formattedArray
    } else {
        return []
    }


}