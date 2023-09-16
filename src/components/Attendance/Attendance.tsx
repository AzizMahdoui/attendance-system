import { QrReader } from "react-qr-reader"
import { useState } from "react";
 
const AttendanceModal=({date,dailyStatusId,status,currentEmployeeId,shiftId})=>{
    const [confirmation,setConfiramtion] = useState(false);
    const [error,setError] = useState("")
    const [confiramtionData,setConfiramtionData] = useState(null)
    const [employeeId,setEmployeedId] = useState("")


    const handleResultFile = async(result) => {
            // console.log(result!=undefined)
        if (result) {
          const payload  = result.text.split("_")
           const employeeIdPayload = payload[0]
          //  console.log(id)
           if(currentEmployeeId!=employeeIdPayload){
            setError("Wrong Qr Code")
           }
           else
            {setEmployeedId(employeeIdPayload)
            setConfiramtion(true)}

        }
    };
    const handleCheckIn= async()=>{
        const id = dailyStatusId
        console.log({date,id,status})
            const response = await fetch("http://localhost:3000/shift/checkin",{
                method:"POST",
                headers: {
                  "Content-Type": "application/json", 
                },
                body:JSON.stringify({date,id,status})
            })
            console.log(response)
            const fetchedData = await response.json()
            console.log(fetchedData)
            setConfiramtionData(fetchedData)
            console.log(confiramtionData)
            setConfiramtion(false)
    }
    const handleCheckOut= async()=>{
      const id = dailyStatusId
      const shift_id = shiftId
      console.log({date,shiftId,id,status})
          const response = await fetch("http://localhost:3000/shift/checkout",{
              method:"POST",
              headers: {
                "Content-Type": "application/json", // Set the content type to JSON
              },
              body:JSON.stringify({date,shift_id,id,status})
          })
          console.log(response)
          const fetchedData = await response.json()
          console.log(fetchedData)
          setConfiramtionData(fetchedData)
          console.log(confiramtionData)
          setConfiramtion(false)
  }
    return (
        <div className="dialog">
          <div>
            <h3>Scan Your Code: yatik asba</h3>
            <QrReader
                style={{ width: "100%" }}
                legacyMode
                onResult={handleResultFile}
                scanDelay={300}
            />
        </div>
      {(confirmation && status==="checked-in" )&&(
        <div>
            <button onClick={()=>handleCheckIn()}>Confirm the check in</button>
        </div>
      )}
        {(confirmation && status==="checked-out" )&&(
        
            <button onClick={()=>handleCheckOut()}>Confirm the check Out</button>
       
      )}
      {(confiramtionData&&confiramtionData?.data.employeeDailyStatus.status==="checked-in") && (
        // <div>Good</div>
        <div>{confiramtionData.data.employeeDailyStatus.employeeId.firstName} Have Been Successfully checked in </div>
      )}
      
      {(confiramtionData&&confiramtionData?.data.employeeDailyStatus.status==="checked-out")&&(
        <div>{confiramtionData?.data.employeeDailyStatus.employeeId.firstName} Have Been Successfully checked out </div>

      )}
      {error && (
        <h3>{error}</h3>
      )}
          </div>
    )
}
export default AttendanceModal